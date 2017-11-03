import * as _ from 'lodash';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { OrderBy } from '../pipes/order-by';
import * as AlloyTouch from 'alloytouch';
import * as Transform from 'alloytouch-transformjs';
// import { Vibration } from '@ionic-native/vibration';
var AlphaScroll = (function () {
    function AlphaScroll(elementRef, orderBy) {
        this.elementRef = elementRef;
        this.orderBy = orderBy;
        this.sortedItems = [];
        this.alphabet = [];
        this.letterIndicatorEle = document.createElement('div');
        this.letterIndicatorEle.className = 'ion-alpha-letter-indicator';
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(this.letterIndicatorEle);
    }
    AlphaScroll.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this.elementRef.nativeElement.offsetHeight);
        console.log(this.list.nativeElement.offsetHeight);
        setTimeout(function () {
            _this.indicatorWidth = _this.letterIndicatorEle.offsetWidth;
            _this.indicatorHeight = _this.letterIndicatorEle.offsetHeight;
            _this.setTouchHandlers();
        });
    };
    AlphaScroll.prototype.ngOnChanges = function () {
        var _this = this;
        var sortedListData = this.orderBy.transform(this.listData, [this.key]);
        var groupItems = _.groupBy(sortedListData, function (item) {
            var letter = _.get(item, _this.key);
            return letter.toUpperCase().charAt(0);
        });
        //根据头部模板是否为null 添加字符
        if (this.headerTemplate != null || this.headerTemplate != undefined) {
            groupItems['↑'] = [];
        }
        this.sortedItems = this.unwindGroup(groupItems);
        this.alphabet = this.iterateAlphabet(groupItems);
    };
    AlphaScroll.prototype.ngOnDestroy = function () {
        if (this.letterIndicatorEle) {
            this.letterIndicatorEle.remove();
        }
    };
    AlphaScroll.prototype.setAlphaClass = function (alpha) {
        return alpha.isActive ? 'ion-alpha-active' : 'ion-alpha-invalid';
    };
    AlphaScroll.prototype.calculateDimensionsForSidebar = function () {
        return {
            height: this.mainWrapper.nativeElement.clientHeight + 'px'
        };
    };
    AlphaScroll.prototype.setTouchHandlers = function () {
        var _this = this;
        var sidebarEle = this.elementRef.nativeElement.querySelector('.ion-alpha-sidebar');
        if (!sidebarEle)
            return;
        this.elementRef.nativeElement.addEventListener('touchmove', function (evt) {
            evt.preventDefault();
        }, false);
        setTimeout(function () {
            var min = _this.elementRef.nativeElement.offsetHeight - _this.list.nativeElement.offsetHeight;
            _this.alloyTouch = new AlloyTouch({
                touch: _this.mainWrapper.nativeElement,
                vertical: true,
                target: _this.list.nativeElement,
                property: "translateY",
                min: min,
                max: 0,
                sensitivity: 1,
                factor: 1,
                step: 45,
                bindSelf: false,
                maxSpeed: 2,
                initialValue: 0
            });
            var chooseEle = function (evt) {
                var closestEle = evt.type == 'touchend' ? document.elementFromPoint(evt.changedTouches[0].pageX, evt.changedTouches[0].pageY) : document.elementFromPoint(evt.targetTouches[0].pageX, evt.targetTouches[0].pageY);
                // // console.log(closestEle);
                if (closestEle && ['LI', 'A'].indexOf(closestEle.tagName) > -1) {
                    var letter = closestEle.innerText;
                    _this.letterIndicatorEle.innerText = letter;
                    _this.letterIndicatorEle.style.visibility = 'visible';
                    var letterDivider = _this.elementRef.nativeElement.querySelector("#scroll-letter-" + letter);
                    var letterTop = letterDivider.offsetTop;
                    if (letterDivider) {
                        _this.alloyTouch.to(-letterTop < min ? min : -letterTop, 0);
                    }
                }
            };
            _this.sidebarTouch = new AlloyTouch({
                touch: _this.sidebar.nativeElement,
                vertical: true,
                target: _this.sidebar.nativeElement,
                property: "translateY",
                min: 0,
                max: 0,
                sensitivity: 1,
                factor: 1,
                step: 45,
                bindSelf: false,
                maxSpeed: 2,
                initialValue: 0,
                touchStart: function () {
                    _this.alloyTouch.stop();
                    _this.letterIndicatorEle.style.top = ((window.innerHeight - _this.indicatorHeight) / 2) + 'px';
                    _this.letterIndicatorEle.style.left = ((window.innerWidth - _this.indicatorWidth) / 2) + 'px';
                },
                touchMove: function (evt) {
                    chooseEle(evt);
                },
                touchEnd: function () {
                    _this.letterIndicatorEle.style.visibility = 'hidden';
                },
                tap: function (evt) {
                    chooseEle(evt);
                }
            });
            Transform(_this.list.nativeElement, true);
        });
    };
    AlphaScroll.prototype.unwindGroup = function (groupItems) {
        var result = [];
        for (var letter in groupItems) {
            result = result.concat([{ isDivider: true, letter: letter }].concat(groupItems[letter]));
        }
        return result;
    };
    AlphaScroll.prototype.iterateAlphabet = function (alphabet) {
        var str;
        if (this.headerTemplate != null || this.headerTemplate != undefined) {
            str = '↑ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        else {
            str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        var result = [];
        for (var i = 0; i < str.length; i++) {
            var letter = str.charAt(i);
            var isActive = alphabet[letter] ? true : false;
            result.push({ letter: letter, isActive: isActive });
        }
        return result;
    };
    return AlphaScroll;
}());
export { AlphaScroll };
AlphaScroll.decorators = [
    { type: Component, args: [{
                selector: 'ion-alpha-scroll',
                template: "\n  <section class=\"alpha-list-wrapper\" #wrapper>\n\t  <ion-list class=\"ion-alpha-list\" #list>\n\t\t<ion-item-divider id=\"scroll-letter-\u2191\" style=\"display:none\" *ngIf=\"headerTemplate!=null\">\u2191</ion-item-divider>\n\t\t<ng-template [ngTemplateOutlet]=\"headerTemplate\" ></ng-template>\n\t      <div *ngFor=\"let item of sortedItems\">\n\t        <ion-item-divider id=\"scroll-letter-{{item.letter}}\" *ngIf=\"item.isDivider\">{{item.letter}}</ion-item-divider>\n\t        <ng-template [ngTemplateOutlet]=\"itemTemplate\" [ngOutletContext]=\"{'item': item, 'currentPageClass': currentPageClass}\" *ngIf=\"!item.isDivider\">\n\t        </ng-template>\n\t      </div>\n\t    </ion-list>\n    </section>\n    <ul class=\"ion-alpha-sidebar\" [ngStyle]=\"calculateDimensionsForSidebar()\" #sidebar>\n      <li *ngFor=\"let alpha of alphabet\" [hidden]=\"!alpha.isActive\" [class]=\"setAlphaClass(alpha)\">\n        <a>{{alpha.letter}}</a>\n      </li>\n    </ul>"
            },] },
];
/** @nocollapse */
AlphaScroll.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: OrderBy, },
]; };
AlphaScroll.propDecorators = {
    'mainWrapper': [{ type: ViewChild, args: ['wrapper',] },],
    'list': [{ type: ViewChild, args: ['list',] },],
    'sidebar': [{ type: ViewChild, args: ['sidebar',] },],
    'listData': [{ type: Input },],
    'key': [{ type: Input },],
    'itemTemplate': [{ type: Input },],
    'currentPageClass': [{ type: Input },],
    'headerTemplate': [{ type: Input },],
};
//# sourceMappingURL=alpha-scroll.js.map