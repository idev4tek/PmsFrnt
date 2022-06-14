import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
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
        
        return this.http.post<any>(`/_auth/realms/Doms/protocol/openid-connect/token`, 
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
    fakeLogin(username: string, password: string) {
        console.log('in fake');

        let user = {"access_token":"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJRdnNZdnNEazA0bV9Qc3kyajdvNnNlSlhlYTJrTFhvNm9fWE1uT253cWhvIn0.eyJleHAiOjE2NTM4Mjc0MTMsImlhdCI6MTY1MzgyNjgxMywianRpIjoiMWE3Yzc4MzQtN2MxOS00ZWRiLWIwMzMtN2YyMjAyMmQwNmY2IiwiaXNzIjoiaHR0cDovLzE0NC4yMTcuMTU1LjE2Nzo4MDg1L2F1dGgvcmVhbG1zL2RvbXMiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMmQwYmFlOTMtODIwOC00ZDExLWExNWItMGM1MDk1NjM4ODA4IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZG9tc0NsbnQiLCJzZXNzaW9uX3N0YXRlIjoiZmQ0MWRkYzQtYjdiMy00MjcwLWIyZTMtNDA2OWFmZTE1NTYyIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJhcHBVc2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0c3R1c3IifQ.Ci9GnzjgeQHfYYrMCfzvGRvnPlcfrxUPuPGEiwbEcIiAymllg4fPahWLxc0e4mU14WziY9JBFryx74D5k4fUeOH9CJhQDhnalMgEyxhian5sFz3SrZKRVUIMeJyg2HQFWHh8_Jr4X_cSj6mvF4JcgZSS8nl_7n3HOuuuQvrn0dlQD9TyHi1uHF32dfAAhMevwdx_kTQ__zXSr3WITGwHt-8tOQus7hemCf_fUd661WS6QcUMcdctdt0wp_JL7tPzVlimT3hMFc8Oq1adwKxDxCVDKbzDFbEk1_02pfPJZpZEx6u5xwotVT5k8JUUNkxYSBHyN1hx_ihfXJptnct2wg","expires_in":600,"refresh_expires_in":1800,"refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlNThjZWU5Ny01ZGVmLTRjYTUtOWMxYi1jNDMwYzMyODFlNmUifQ.eyJleHAiOjE2NTM4Mjg2MTMsImlhdCI6MTY1MzgyNjgxMywianRpIjoiZDc3N2MzMDktMTJmYS00YTNmLTg5NjYtOGFjMDIzYWY4MDRlIiwiaXNzIjoiaHR0cDovLzE0NC4yMTcuMTU1LjE2Nzo4MDg1L2F1dGgvcmVhbG1zL2RvbXMiLCJhdWQiOiJodHRwOi8vMTQ0LjIxNy4xNTUuMTY3OjgwODUvYXV0aC9yZWFsbXMvZG9tcyIsInN1YiI6IjJkMGJhZTkzLTgyMDgtNGQxMS1hMTViLTBjNTA5NTYzODgwOCIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJkb21zQ2xudCIsInNlc3Npb25fc3RhdGUiOiJmZDQxZGRjNC1iN2IzLTQyNzAtYjJlMy00MDY5YWZlMTU1NjIiLCJzY29wZSI6ImVtYWlsIHByb2ZpbGUifQ.fnclnAY6zkwvEnbsepGyTmdGUjgGmwvf_B0qmLgVR1k","token_type":"bearer","not-before-policy":0,"session_state":"fd41ddc4-b7b3-4270-b2e3-4069afe15562","scope":"email profile"}
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        
        return user
    
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}