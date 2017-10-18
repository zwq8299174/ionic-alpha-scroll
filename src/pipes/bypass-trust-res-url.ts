import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'trustResourceUrl',
  pure: true
})
@Injectable()
export class TrustResourceUrl implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value: any, ..._args: any[]): any {
    if (!value) {
      return null;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
