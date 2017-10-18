import { ModuleWithProviders, NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PipesModule } from '../pipes/pipes.module';
import { AlphaScroll } from './alpha-scroll';

@NgModule({
  imports: [
    IonicModule,
    PipesModule
  ],
  exports: [
    AlphaScroll
  ],
  declarations: [
    AlphaScroll
  ]
})
export class ScrollModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ScrollModule, providers: []
    };
  }
}
