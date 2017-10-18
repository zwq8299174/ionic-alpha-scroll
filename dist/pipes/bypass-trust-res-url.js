import { Injectable, Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
var TrustResourceUrl = (function () {
    function TrustResourceUrl(sanitizer) {
        this.sanitizer = sanitizer;
    }
    TrustResourceUrl.prototype.transform = function (value) {
        var _args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            _args[_i - 1] = arguments[_i];
        }
        if (!value) {
            return null;
        }
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
    };
    return TrustResourceUrl;
}());
export { TrustResourceUrl };
TrustResourceUrl.decorators = [
    { type: Pipe, args: [{
                name: 'trustResourceUrl',
                pure: true
            },] },
    { type: Injectable },
];
/** @nocollapse */
TrustResourceUrl.ctorParameters = function () { return [
    { type: DomSanitizer, },
]; };
//# sourceMappingURL=bypass-trust-res-url.js.map