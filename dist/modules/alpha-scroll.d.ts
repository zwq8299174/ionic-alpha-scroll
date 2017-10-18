import { ElementRef, OnChanges, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Content } from 'ionic-angular';
import { OrderBy } from '../pipes/order-by';
export declare class AlphaScroll implements OnInit, OnChanges, OnDestroy {
    private elementRef;
    private orderBy;
    private content;
    mainWrapper: ElementRef;
    list: ElementRef;
    sidebar: ElementRef;
    listData: any;
    key: string;
    itemTemplate: TemplateRef<Object>;
    currentPageClass: any;
    private letterIndicatorEle;
    private indicatorHeight;
    private indicatorWidth;
    private alloyTouch;
    private sidebarTouch;
    sortedItems: any;
    alphabet: any;
    constructor(elementRef: ElementRef, orderBy: OrderBy, content: Content);
    ngOnInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    setAlphaClass(alpha: any): string;
    calculateDimensionsForSidebar(): {
        height: string;
    };
    alphaScrollGoToList(letter: any): void;
    private setTouchHandlers();
    private unwindGroup(groupItems);
    private iterateAlphabet(alphabet);
}
