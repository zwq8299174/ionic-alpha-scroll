import { Injectable, Pipe } from '@angular/core';
import * as _ from 'lodash';
var OrderBy = (function () {
    function OrderBy() {
    }
    OrderBy.prototype.transform = function (input, orderConfigs) {
        if (orderConfigs === void 0) { orderConfigs = '+'; }
        if (!Array.isArray(input)) {
            return input;
        }
        if (this.isSingle(orderConfigs)) {
            var orderConfig = !Array.isArray(orderConfigs) ? orderConfigs : orderConfigs[0];
            var config = this.parseProperty(orderConfig);
            // Basic array
            if (config.property === '') {
                return _.orderBy(input, [], config.order);
            }
            return _.orderBy(input, [config.property], [config.order]);
        }
        var configs = this.parseProperties(orderConfigs);
        return _.orderBy(input, configs.properties, configs.orders);
    };
    OrderBy.prototype.isSingle = function (orderConfigs) {
        return !Array.isArray(orderConfigs) || (Array.isArray(orderConfigs) && orderConfigs.length === 1);
    };
    OrderBy.prototype.parseProperty = function (config) {
        var orderChar = config.substr(0, 1);
        var isDesc = orderChar === '-';
        var hasOrder = orderChar || orderChar === '+';
        return { order: isDesc ? 'desc' : 'asc', property: hasOrder ? config.substr(1) : config };
    };
    OrderBy.prototype.parseProperties = function (configs) {
        var _this = this;
        var result = { orders: [], properties: [] };
        configs.forEach(function (configStr) {
            var config = _this.parseProperty(configStr);
            result.orders.push(config.order);
            result.properties.push(config.property);
        });
        return result;
    };
    return OrderBy;
}());
export { OrderBy };
OrderBy.decorators = [
    { type: Pipe, args: [{
                name: 'orderBy',
                pure: true
            },] },
    { type: Injectable },
];
/** @nocollapse */
OrderBy.ctorParameters = function () { return []; };
//# sourceMappingURL=order-by.js.map