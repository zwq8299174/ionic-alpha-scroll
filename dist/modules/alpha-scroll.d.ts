import { ElementRef, OnChanges, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { OrderBy } from '../pipes/order-by';
export declare class AlphaScroll implements OnInit, OnChanges, OnDestroy {
    private elementRef;
    private orderBy;
    mainWrapper: ElementRef;
    list: ElementRef;
    sidebar: ElementRef;
    listData: any;
    key: string;
    itemTemplate: TemplateRef<Object>;
    currentPageClass: any;
    /**
     * 头部区域模板
     *
     * @type {TemplateRef<Object>}
     * @memberof AlphaScroll
     */
    headerTemplate: TemplateRef<Object>;
    private letterIndicatorEle;
    private indicatorHeight;
    private indicatorWidth;
    private alloyTouch;
    private sidebarTouch;
    sortedItems: any;
    alphabet: any;
    constructor(elementRef: ElementRef, orderBy: OrderBy);
    ngOnInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    setAlphaClass(alpha: any): string;
    calculateDimensionsForSidebar(): {
        height: string;
    };
    private setTouchHandlers();
    private unwindGroup(groupItems);
    private iterateAlphabet(alphabet);
}
