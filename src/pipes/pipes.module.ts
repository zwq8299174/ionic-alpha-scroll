import { ModuleWithProviders, NgModule } from '@angular/core';
import { MapToIterable } from './map-to-iterable';
import { OrderBy } from './order-by';
import { TrustResourceUrl } from './bypass-trust-res-url';

export { MapToIterable } from './map-to-iterable';
export { OrderBy } from './order-by';
export { TrustResourceUrl } from './bypass-trust-res-url';

@NgModule({
	exports: [
		MapToIterable,
		OrderBy,
		TrustResourceUrl
	],
	declarations: [
		MapToIterable,
		OrderBy,
		TrustResourceUrl
	]
})
export class PipesModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: PipesModule,
			providers: [
				MapToIterable,
				OrderBy,
				TrustResourceUrl
			]
		};
	}
}
