import { Injectable, Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'orderBy',
  pure: true
})
@Injectable()
export class OrderBy implements PipeTransform {
  transform(input: any, orderConfigs: string | Array<string> = '+'): any {
    if (!Array.isArray(input)) {
      return input;
    }

    if (this.isSingle(orderConfigs)) {
      let orderConfig: string = !Array.isArray(orderConfigs) ? orderConfigs : orderConfigs[0];
      let config = this.parseProperty(orderConfig);

      // Basic array
      if (config.property === '') {
        return _.orderBy(input, [], config.order);
      }

      return _.orderBy(input, [config.property], [config.order]);
    }

    let configs = this.parseProperties(<string[]>orderConfigs);
    return _.orderBy(input, configs.properties, configs.orders);
  }

  private isSingle(orderConfigs: any): boolean {
    return !Array.isArray(orderConfigs) || (Array.isArray(orderConfigs) && orderConfigs.length === 1);
  }

  private parseProperty(config: string): { order: string, property: string } {
    let orderChar = config.substr(0, 1);
    let isDesc = orderChar === '-';
    let hasOrder = orderChar || orderChar === '+';
    return { order: isDesc ? 'desc' : 'asc', property: hasOrder ? config.substr(1) : config };
  }

  private parseProperties(configs: Array<string>): { orders: Array<string>, properties: Array<string> } {
    let result = { orders: [], properties: [] };
    configs.forEach(configStr => {
      let config = this.parseProperty(configStr);
      result.orders.push(config.order);
      result.properties.push(config.property);
    });
    return result;
  }
}