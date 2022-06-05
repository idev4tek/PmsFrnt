import { Directive, HostListener } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
    selector: "[formControlName][appCurrencyMask]"
})
export class CurrencyMaskDirective {
    constructor(public ngControl: NgControl) { }

    // https://stackblitz.com/edit/angular11-currency-mask

    @HostListener("ngModelChange", ["$event"])
    onModelChange(event:any) {
        this.onInputChange(event, false);
    }

    @HostListener("keydown.backspace", ["$event"])
    keydownBackspace(event:any) {
        this.onInputChange(event.target.value, true);
    }

    onInputChange(event:any, backspace:any) {
        let newVal = event.replace(/\D/g, "");

        if (newVal.length === 0) {
            newVal = "";
        } else if (newVal.length <= 3) {
            newVal = newVal.replace(/^(\d{0,3})/, "$1");
        } else if (newVal.length <= 4) {
            newVal = newVal.replace(/^(\d{0,1})(\d{0,3})/, "$1,$2");
        } else if (newVal.length <= 5) {
            newVal = newVal.replace(/^(\d{0,2})(\d{0,3})/, "$1,$2");
        } else if (newVal.length <= 6) {
            newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, "$1,$2");
        } else if (newVal.length <= 7) {
            newVal = newVal.replace(/^(\d{0,1})(\d{0,3})(\d{0,4})/, "$1,$2,$3");
        } else if (newVal.length <= 8) {
            newVal = newVal.replace(/^(\d{0,2})(\d{0,3})(\d{0,4})/, "$1,$2,$3");
        } else if (newVal.length <= 9) {
            newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, "$1,$2,$3");
        } else {
            newVal = newVal.substring(0, 10);
            newVal = newVal.replace(
                /^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/,
                "$1,$2,$3,$4"
            );
        }

        this.ngControl.valueAccessor?.writeValue(newVal);
    }

    toNumber(val:any) {
        let valArr = val.split("");
        let valFiltered = valArr.filter((x:any) => !isNaN(x));
        let valProcessed = valFiltered.join("");
        return valProcessed;
    }
}
