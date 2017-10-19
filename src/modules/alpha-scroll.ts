import * as _ from 'lodash';
import {
	Component,
	ElementRef,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	TemplateRef,
	ViewChild
} from '@angular/core';

import { OrderBy } from '../pipes/order-by';

import * as AlloyTouch from 'alloytouch';
import * as Transform from 'alloytouch-transformjs';
// import { Vibration } from '@ionic-native/vibration';

@Component({
	selector: 'ion-alpha-scroll',
	template: `
  <section class="alpha-list-wrapper" #wrapper>
	    <ion-list class="ion-alpha-list" #list>
	      <div *ngFor="let item of sortedItems">
	        <ion-item-divider id="scroll-letter-{{item.letter}}" *ngIf="item.isDivider">{{item.letter}}</ion-item-divider>
	        <ng-template [ngTemplateOutlet]="itemTemplate" [ngOutletContext]="{'item': item, 'currentPageClass': currentPageClass}" *ngIf="!item.isDivider">
	        </ng-template>
	      </div>
	    </ion-list>
    </section>
    <ul class="ion-alpha-sidebar" [ngStyle]="calculateDimensionsForSidebar()" #sidebar>
      <li *ngFor="let alpha of alphabet" [hidden]="!alpha.isActive" [class]="setAlphaClass(alpha)">
        <a>{{alpha.letter}}</a>
      </li>
    </ul>`
})
export class AlphaScroll implements OnInit, OnChanges, OnDestroy {
	@ViewChild('wrapper') mainWrapper: ElementRef;
	@ViewChild('list') list: ElementRef;
	@ViewChild('sidebar') sidebar: ElementRef;
	@Input() listData: any;
	@Input() key: string;
	@Input() itemTemplate: TemplateRef<Object>;
	@Input() currentPageClass: any;
	private letterIndicatorEle: HTMLElement;
	private indicatorHeight: number;
	private indicatorWidth: number;
	private alloyTouch: any;
	private sidebarTouch: any;
	sortedItems: any = [];
	alphabet: any = [];
	constructor(
		private elementRef: ElementRef,
		private orderBy: OrderBy
	) {
		this.letterIndicatorEle = document.createElement('div');
		this.letterIndicatorEle.className = 'ion-alpha-letter-indicator';
		let body = document.getElementsByTagName('body')[0];
		body.appendChild(this.letterIndicatorEle);
	}
	ngOnInit() {
		console.log(this.elementRef.nativeElement.offsetHeight);
		console.log(this.list.nativeElement.offsetHeight);
		setTimeout(() => {
			this.indicatorWidth = this.letterIndicatorEle.offsetWidth;
			this.indicatorHeight = this.letterIndicatorEle.offsetHeight;
			this.setTouchHandlers();
		});
	}
	ngOnChanges() {
		let sortedListData: Array<any> = this.orderBy.transform(this.listData, [this.key]);
		let groupItems: any = _.groupBy(sortedListData, item => {
			let letter: any = _.get(item, this.key);
			return letter.toUpperCase().charAt(0);
		});
		this.sortedItems = this.unwindGroup(groupItems);
		this.alphabet = this.iterateAlphabet(groupItems);
	}

	ngOnDestroy() {
		if (this.letterIndicatorEle) {
			this.letterIndicatorEle.remove();
		}
	}

	setAlphaClass(alpha: any): string {
		return alpha.isActive ? 'ion-alpha-active' : 'ion-alpha-invalid';
	}

	calculateDimensionsForSidebar() {
		return {
			height: this.mainWrapper.nativeElement.clientHeight + 'px'
		};
	}
	private setTouchHandlers() {
		let sidebarEle: HTMLElement = this.elementRef.nativeElement.querySelector('.ion-alpha-sidebar');
		if (!sidebarEle) return;
		this.elementRef.nativeElement.addEventListener('touchmove', function(evt) {
			evt.preventDefault();
		}, false);
		setTimeout(() => {
			let min = this.elementRef.nativeElement.offsetHeight - this.list.nativeElement.offsetHeight;
			this.alloyTouch = new AlloyTouch({
				touch: this.mainWrapper.nativeElement,//反馈触摸的dom
				vertical: true,//不必需，默认是true代表监听竖直方向touch
				target: this.list.nativeElement, //运动的对象
				property: "translateY",  //被运动的属性
				min: min,
				max: 0, //不必需,滚动属性的最大值
				sensitivity: 1,//不必需,触摸区域的灵敏度，默认值为1，可以为负数
				factor: 1,//不必需,表示触摸位移与被运动属性映射关系，默认值是1
				step: 45,//用于校正到step的整数倍
				bindSelf: false,
				maxSpeed: 2, //不必需，触摸反馈的最大速度限制
				initialValue: 0
			});
			let chooseEle = (evt) => {
				let closestEle: any = evt.type == 'touchend' ? document.elementFromPoint(evt.changedTouches[0].pageX, evt.changedTouches[0].pageY) : document.elementFromPoint(evt.targetTouches[0].pageX, evt.targetTouches[0].pageY);
				// // console.log(closestEle);
				if (closestEle && ['LI', 'A'].indexOf(closestEle.tagName) > -1) {
					let letter = closestEle.innerText;
					this.letterIndicatorEle.innerText = letter;
					this.letterIndicatorEle.style.visibility = 'visible';
					let letterDivider: any = this.elementRef.nativeElement.querySelector(`#scroll-letter-${letter}`);
					let letterTop: number = letterDivider.offsetTop;
					if (letterDivider) {
						this.alloyTouch.to(-letterTop < min ? min : -letterTop, 0);
					}
				}
			}
			this.sidebarTouch = new AlloyTouch({
				touch: this.sidebar.nativeElement,//反馈触摸的dom
				vertical: true,//不必需，默认是true代表监听竖直方向touch
				target: this.sidebar.nativeElement, //运动的对象
				property: "translateY",  //被运动的属性
				min: 0,
				max: 0, //不必需,滚动属性的最大值
				sensitivity: 1,//不必需,触摸区域的灵敏度，默认值为1，可以为负数
				factor: 1,//不必需,表示触摸位移与被运动属性映射关系，默认值是1
				step: 45,//用于校正到step的整数倍
				bindSelf: false,
				maxSpeed: 2, //不必需，触摸反馈的最大速度限制
				initialValue: 0,
				touchStart: () => {
					this.alloyTouch.stop();
					this.letterIndicatorEle.style.top = ((window.innerHeight - this.indicatorHeight) / 2) + 'px';
					this.letterIndicatorEle.style.left = ((window.innerWidth - this.indicatorWidth) / 2) + 'px';
				},
				touchMove: (evt) => {
					chooseEle(evt);
				},
				touchEnd: () => {
					this.letterIndicatorEle.style.visibility = 'hidden';
				},
				tap: (evt) => {
					chooseEle(evt);
				}
			});
			Transform(this.list.nativeElement, true);
		});
	}
	private unwindGroup(groupItems: any): Array<any> {
		let result: Array<any> = [];
		for (let letter in groupItems) {
			result = result.concat([{ isDivider: true, letter: letter }].concat(groupItems[letter]));
		}
		return result;
	}
	private iterateAlphabet(alphabet: any): Array<any> {
		let str: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		let result: Array<any> = [];
		for (let i = 0; i < str.length; i++) {
			let letter = str.charAt(i);
			let isActive = alphabet[letter] ? true : false;
			result.push({ letter: letter, isActive: isActive });
		}
		return result;
	}
}
