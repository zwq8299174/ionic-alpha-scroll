import { PipeTransform } from '@angular/core';
export declare class OrderBy implements PipeTransform {
    transform(input: any, orderConfigs?: string | Array<string>): any;
    private isSingle(orderConfigs);
    private parseProperty(config);
    private parseProperties(configs);
}
