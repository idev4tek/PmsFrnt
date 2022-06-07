import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

let server = 'http://144.217.155.167:8085'

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')as string));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        let grant_type = "password";
        let client_id = "domsClnt";
        let client_seret = "a9e0dea4-3d59-424e-b93e-59c191cfcd65";

        let body = `grant_type=${grant_type}&client_id=${client_id}&client_seret=${client_seret}&username=${username}&password=${password}`;
        
        return this.http.post<any>(`http://144.217.155.167:8085/auth/realms/Doms/protocol/openid-connect/token`, 
         body, options)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                
                if (user && user.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}