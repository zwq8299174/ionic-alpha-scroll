import { Injectable, Pipe } from '@angular/core';
var MapToIterable = (function () {
    function MapToIterable() {
    }
    MapToIterable.prototype.transform = function (value) {
        var _args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            _args[_i - 1] = arguments[_i];
        }
        var result = [];
        if (value.entries) {
            for (var _a = 0, _b = value.entries(); _a < _b.length; _a++) {
                var _c = _b[_a], key = _c[0], value = _c[1];
                result.push({ key: key, value: value });
            }
        }
        else {
            for (var key_1 in value) {
                result.push({ key: key_1, value: value[key_1] });
            }
        }
        return result;
    };
    return MapToIterable;
}());
export { MapToIterable };
MapToIterable.decorators = [
    { type: Pipe, args: [{
                name: 'mapToIterable',
                pure: true
            },] },
    { type: Injectable },
];
/** @nocollapse */
MapToIterable.ctorParameters = function () { return []; };
//# sourceMappingURL=map-to-iterable.js.map