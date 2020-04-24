<template>
	<view :class="[customClass, tabs]">
	  <you-sticky
	    :disabled="!sticky"
	    :z-index="zIndex"
	    :offset-top="offsetTop"
	    :container="container"
	    @scroll="onTouchScroll"
	  >
	    <view :class="[tabs__wrap, type === 'line' && border ? 'you-hairline--top-bottom' : '']">
	      <slot name="nav-left" />
	      <scroll-view
	        :scroll-x="scrollable"
	        scroll-with-animation
	        :scroll-left="scrollLeft"
	        :class="tabs__scroll"
	        :style="color ? 'border-color: ' + color : ''"
	      >
	        <view :class="[tabs__nav, navClass]">
	          <view v-if="type === 'line'" class="you-tabs__line" :style="lineStyle" />
	          <view
	            v-for="(item,index) in tabs"
	            :key="index"
	            :data-index="index"
	            :class="[getters.tabClass(index === currentIndex, ellipsis), utils.bem('tab', { active: index === currentIndex, disabled: item.disabled, complete: !ellipsis })]"
	            :style="getters.tabStyle(index === currentIndex, ellipsis, color, type, item.disabled, titleActiveColor, titleInactiveColor, swipeThreshold, scrollable)"
	            @tap="onTap"
	          >
	            <view :class="ellipsis ? 'you-ellipsis' : ''" :style="item.titleStyle">
	              {{ item.title }}
	              <you-info
	                v-if="item.info !== null || item.dot"
	                :info="item.info"
	                :dot="item.dot"
	                customClass="you-tab__title__info"
	              />
	            </view>
	          </view>
	        </view>
	      </scroll-view>
	      <slot name="nav-right" />
	    </view>
	  </you-sticky>
	
	  <view
	    class="you-tabs__content"
	    @touchstart="onTouchStart"
	    @touchmove="onTouchMove"
	    @touchend="onTouchEnd"
	    @touchcancel="onTouchEnd"
	  >
	    <view :class="[utils.bem('tabs__track', [{ animated }]), you-tabs__track]" :style="trackStyle">
	      <slot />
	    </view>
	  </view>
	</view>
	
</template>

<script module="getters" lang="wxs" src="./index.wxs"></script>
<script>
	import { touch } from '../mixins/touch';
	import { isDef, addUnit } from '../common/utils';
	
	export default {
		components: {},
		mixins: [touch],
		classes: ['nav-class', 'tab-class', 'tab-active-class', 'line-class'],
		relation: {
		    name: 'tab',
		    type: 'descendant',
		    linked(target) {
		        target.index = this.children.length;
		        this.children.push(target);
		        this.updateTabs();
		    },
		    unlinked(target) {
		        this.children = this.children
		            .filter((child) => child !== target)
		            .map((child, index) => {
		            child.index = index;
		            return child;
		        });
		        this.updateTabs();
		    }
		},
		props: {
		    color: {
		        type: String,
		        observer: 'setLine'
		    },
		    sticky: Boolean,
		    animated: {
		        type: Boolean,
		        observer() {
		            this.setTrack();
		            this.children.forEach((child) => child.updateRender());
		        }
		    },
		    swipeable: Boolean,
		    lineWidth: {
		        type: [String, Number],
		        value: -1,
		        observer: 'setLine'
		    },
		    lineHeight: {
		        type: [String, Number],
		        value: -1,
		        observer: 'setLine'
		    },
		    titleActiveColor: String,
		    titleInactiveColor: String,
		    active: {
		        type: [String, Number],
		        value: 0,
		        observer(name) {
		            if (name !== this.getCurrentName()) {
		                this.setCurrentIndexByName(name);
		            }
		        }
		    },
		    type: {
		        type: String,
		        value: 'line'
		    },
		    border: {
		        type: Boolean,
		        value: true
		    },
		    ellipsis: {
		        type: Boolean,
		        value: true
		    },
		    duration: {
		        type: Number,
		        value: 0.3
		    },
		    zIndex: {
		        type: Number,
		        value: 1
		    },
		    swipeThreshold: {
		        type: Number,
		        value: 4,
		        observer(value) {
		            this.setData({
		                scrollable: this.children.length > value || !this.data.ellipsis
		            });
		        }
		    },
		    offsetTop: {
		        type: Number,
		        value: 0
		    },
		    lazyRender: {
		        type: Boolean,
		        value: true
		    },
		},
		data: {
		    tabs: [],
		    lineStyle: '',
		    scrollLeft: 0,
		    scrollable: false,
		    trackStyle: '',
		    currentIndex: null,
		    container: null
		},
		computed: {
			tabs: function(){
				let {type} = this;
				return utils.bem('tabs', [type]);
			},
			tabs__wrap: function(){
				let {scrollable} = this; 
				return utils.bem('tabs__wrap', { scrollable });
			},
			tabs__scroll: function(){
				let {type} = this;
				return utils.bem('tabs__scroll', [type]);
			},
			tabs__nav: function(){
				let {type}  =this;
				return utils.bem('tabs__nav', [type]);
			}
		},
		beforeCreate() {
		    this.children = [];
		},
		mounted() {
		    this.setData({
		        container: () => this.createSelectorQuery().select('.you-tabs')
		    });
		    this.setLine(true);
		    this.setTrack();
		    this.scrollIntoView();
		},
		methods: {
		    updateTabs() {
		        const { children = [], data } = this;
		        this.setData({
		            tabs: children.map((child) => child.data),
		            scrollable: this.children.length > data.swipeThreshold || !data.ellipsis
		        });
		        this.setCurrentIndexByName(this.getCurrentName() || data.active);
		    },
		    trigger(eventName) {
		        const { currentIndex } = this.data;
		        const child = this.children[currentIndex];
		        if (!isDef(child)) {
		            return;
		        }
		        this.$emit(eventName, {
		            index: currentIndex,
		            name: child.getComputedName(),
		            title: child.data.title
		        });
		    },
		    onTap(event) {
		        const { index } = event.currentTarget.dataset;
		        const child = this.children[index];
		        if (child.data.disabled) {
		            this.trigger('disabled');
		        }
		        else {
		            this.setCurrentIndex(index);
		            wx.nextTick(() => {
		                this.trigger('click');
		            });
		        }
		    },
		    // correct the index of active tab
		    setCurrentIndexByName(name) {
		        const { children = [] } = this;
		        const matched = children.filter((child) => child.getComputedName() === name);
		        if (matched.length) {
		            this.setCurrentIndex(matched[0].index);
		        }
		    },
		    setCurrentIndex(currentIndex) {
		        const { data, children = [] } = this;
		        if (!isDef(currentIndex) ||
		            currentIndex >= children.length ||
		            currentIndex < 0) {
		            return;
		        }
		        children.forEach((item, index) => {
		            const active = index === currentIndex;
		            if (active !== item.data.active || !item.inited) {
		                item.updateRender(active, this);
		            }
		        });
		        if (currentIndex === data.currentIndex) {
		            return;
		        }
		        const shouldEmitChange = data.currentIndex !== null;
		        this.setData({ currentIndex });
		        wx.nextTick(() => {
		            this.setLine();
		            this.setTrack();
		            this.scrollIntoView();
		            this.trigger('input');
		            if (shouldEmitChange) {
		                this.trigger('change');
		            }
		        });
		    },
		    getCurrentName() {
		        const activeTab = this.children[this.data.currentIndex];
		        if (activeTab) {
		            return activeTab.getComputedName();
		        }
		    },
		    setLine(skipTransition) {
		        if (this.data.type !== 'line') {
		            return;
		        }
		        const { color, duration, currentIndex, lineWidth, lineHeight } = this.data;
		        this.getRect('.you-tab', true).then((rects = []) => {
		            const rect = rects[currentIndex];
		            if (rect == null) {
		                return;
		            }
		            const width = lineWidth !== -1 ? lineWidth : rect.width / 2;
		            const height = lineHeight !== -1
		                ? `height: ${addUnit(lineHeight)}; border-radius: ${addUnit(lineHeight)};`
		                : '';
		            let left = rects
		                .slice(0, currentIndex)
		                .reduce((prev, curr) => prev + curr.width, 0);
		            left += (rect.width - width) / 2;
		            const transition = skipTransition
		                ? ''
		                : `transition-duration: ${duration}s; -webkit-transition-duration: ${duration}s;`;
		            this.setData({
		                lineStyle: `
		        ${height}
		        width: ${addUnit(width)};
		        background-color: ${color};
		        -webkit-transform: translateX(${left}px);
		        transform: translateX(${left}px);
		        ${transition}
		      `
		            });
		        });
		    },
		    setTrack() {
		        const { animated, duration, currentIndex } = this.data;
		        if (!animated) {
		            return;
		        }
		        this.setData({
		            trackStyle: `
		      transform: translate3d(${-100 * currentIndex}%, 0, 0);
		      -webkit-transition-duration: ${duration}s;
		      transition-duration: ${duration}s;
		    `
		        });
		    },
		    // scroll active tab into view
		    scrollIntoView() {
		        const { currentIndex, scrollable } = this.data;
		        if (!scrollable) {
		            return;
		        }
		        Promise.all([
		            this.getRect('.you-tab', true),
		            this.getRect('.you-tabs__nav')
		        ]).then(([tabRects, navRect]) => {
		            const tabRect = tabRects[currentIndex];
		            const offsetLeft = tabRects
		                .slice(0, currentIndex)
		                .reduce((prev, curr) => prev + curr.width, 0);
		            this.setData({
		                scrollLeft: offsetLeft - (navRect.width - tabRect.width) / 2
		            });
		        });
		    },
		    onTouchScroll(event) {
		        this.$emit('scroll', event.detail);
		    },
		    onTouchStart(event) {
		        if (!this.data.swipeable)
		            return;
		        this.touchStart(event);
		    },
		    onTouchMove(event) {
		        if (!this.data.swipeable)
		            return;
		        this.touchMove(event);
		    },
		    // watch swipe touch end
		    onTouchEnd() {
		        if (!this.data.swipeable)
		            return;
		        const { tabs, currentIndex } = this.data;
		        const { direction, deltaX, offsetX } = this;
		        const minSwipeDistance = 50;
		        if (direction === 'horizontal' && offsetX >= minSwipeDistance) {
		            if (deltaX > 0 && currentIndex !== 0) {
		                this.setCurrentIndex(currentIndex - 1);
		            }
		            else if (deltaX < 0 && currentIndex !== tabs.length - 1) {
		                this.setCurrentIndex(currentIndex + 1);
		            }
		        }
		    }
		}
	}
</script>

<style>
</style>
