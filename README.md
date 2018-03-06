# ionic-alpha-scroll
	一款基于ionic的索引列表插件，类似于原生APP的通讯录页面、微信的联系人页面、汽车之家的汽车品牌页面等等，首字母进行索引然后滑动。

	一个耿直的程序猿因为业务需要，需要做一个类似原生应用联系人页面的索引列表功能。在网上找了许久许久，包括github和其他网站，虽然有类似的，但是不是闪屏就是卡顿还有抖动，都无法满足程序猿的需要，所以他决定自己写一个插件，然后就是`ionic-alpha-scroll`这个插件了。

	丝般顺滑的滑动，不卡顿、不闪屏、不抖动，接近原生的滚动体验。

#更新：

### 20180306
1、修复列表项不满一屏时报错的问题

### 20171103
1、新增自定义头部模板功能。感谢[@Yan Xiaodi](https://github.com/yanxiaodi)

# DEMO
[DEMO](http://zwq8299174.github.io/ionic-alpha-scroll/)
源码地址：[https://github.com/zwq8299174/ionic-alpha-scroll-demo](https://github.com/zwq8299174/ionic-alpha-scroll-demo)

![Animated demo](https://github.com/zwq8299174/ionic-alpha-scroll/blob/master/Screenshot.gif)


# 安装
### 1、使用`npm`安装
> npm install ionic-alpha-scroll --save
### 2、在`app.module.ts`中引入
```typescript
import { AlphaScrollModule } from 'ionic-alpha-scroll';
 @NgModule({
	 ...
	 imports: [
		...
		AlphaScrollModule.forRoot(),
		...
	]
})
```
# 使用
### 1、在页面中引入
```html
<ion-alpha-scroll *ngIf="contacts.length>0"
	[listData]="contacts"
	key="name"
	[itemTemplate]="alphaScrollItemTemplate"
	[currentPageClass]="currentPageClass">
</ion-alpha-scroll>
<ng-template
	#alphaScrollItemTemplate
	let-item="item"
	let-currentPageClass="currentPageClass">
	<ion-item (click)="currentPageClass.onItemClick(item)">
		<h2>{{item?.name}}</h2>
	</ion-item>
</ng-template>
```

### 2、数据格式
数据格式要求为数组类型，元素为对象或数组都可以，最好是对象格式。需要包含当前元素的首字母，本插件没有提取首字母功能。比如汽车品牌列表，单个品牌对象如下
```javascript
{
	id:"1",
	initial:"A",
	logo:"http://api.jisuapi.com/car/static/images/logo/300/1.png",
	name:"奥迪",
	parentid:"0"
}
```
其中`initial`为首字母的字段。

# Api
### listData
列表数据，格式为Array，数组元素为对象。
### key
列表元素首字母字段的名字
### itemTemplate
列表元素所使用的模板，需结合页面上`ng-template`所使用。
### currentPageClass
当前使用索引列表的页面主体`class`类


# License
This content is released under the [MIT](https://opensource.org/licenses/MIT) License.
