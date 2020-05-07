<template>
	<view :class="[customClass, classTabs]">
		<you-sticky :disabled="!sticky" :z-index="zIndex" :offset-top="offsetTop" :container="container" @scroll="onTouchScroll">
			<view :class="[tabs__wrap, type === 'line' && border ? 'you-hairline--top-bottom' : '']">
				<slot name="nav-left" />
				<scroll-view :scroll-x="scrollable" scroll-with-animation :scroll-left="scrollLeft" :class="tabs__scroll" :style="color ? 'border-color: ' + color : ''">
					<view :class="[tabs__nav, navClass]">
						<view v-if="type === 'line'" class="you-tabs__line" :style="lineStyle"></view>
						<view
							v-for="(item, index) in tabs"
							:key="index"
							:data-index="index"
							class="you-tab"
							:class="[
								index === currentIndex ? getTabClassTrue : getTabClassFalse,
								index === currentIndex ? 'you-tab--active' : '',
								item.disabled ? 'you-tab--disabled' : '',
								!ellipsis ? 'you-tab--complete' : ''
							]"
							:style="
								index === currentIndex && item.disabled
									? allStyle
									: index === currentIndex && !item.disabled
									? currentStyle
									: index !== currentIndex && item.disabled
									? disabledStyle
									: noStyle
							"
							@tap="onTap"
						>
							<view :class="ellipsis ? 'you-ellipsis' : ''" :style="item.titleStyle">
								{{ item.title }}
								<you-info v-if="item.info || item.dot" :info="item.info" :dot="item.dot" custom-class="you-tab__title__info" />
							</view>
						</view>
					</view>
				</scroll-view>
				<slot name="nav-right" />
			</view>
		</you-sticky>

		<view class="you-tabs__content" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
			<view :class="['you-tabs__track', tabs__track]" :style="trackStyle"><slot /></view>
		</view>
	</view>
</template>

<script>
import { touch } from '../mixins/touch.js';
import { basic } from '../mixins/basic.js';
import { isDef, addUnit } from '../common/utils';
import utils from '../wxs/utils.js';
import getters from './index.js';
import youSticky from '@/components/sticky/index.vue';
import youInfo from '@/components/info/index.vue';

function shiftArr(arr) {
	let newArr = arr.filter((item, index) => {
		return index !== 0;
	});
	return newArr;
}

export default {
	components: { youSticky, youInfo },
	mixins: [touch(), basic()],
	provide() {
		return {
			tabs_parent: this
		};
	},
	data() {
		return {
			tabs: [],
			lineStyle: '',
			scrollLeft: 0,
			scrollable: false,
			trackStyle: '',
			currentIndex: null,
			container: null
		};
	},
	props: {
		dot: false,
		customClass: String,
		navClass: String,
		tabClass: String,
		tabActiveClass: String,
		lineClass: String,
		color: String,
		sticky: Boolean,
		animated: Boolean,
		swipeable: Boolean,
		lineWidth: {
			type: [String, Number],
			default: -1
		},
		lineHeight: {
			type: [String, Number],
			default: -1
		},
		titleActiveColor: String,
		titleInactiveColor: String,
		active: {
			type: [String, Number],
			default: 0
		},
		type: {
			type: String,
			default: 'line'
		},
		border: {
			type: Boolean,
			default: true
		},
		ellipsis: {
			type: Boolean,
			default: true
		},
		duration: {
			type: Number,
			default: 0.3
		},
		zIndex: {
			type: Number,
			default: 1
		},
		swipeThreshold: {
			type: Number,
			default: 4
		},
		offsetTop: {
			type: Number,
			default: 0
		},
		lazyRender: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		classTabs: function() {
			let { type } = this;
			return utils.bem('tabs', [type]);
		},
		tabs__wrap: function() {
			let { scrollable } = this;
			return utils.bem('tabs__wrap', { scrollable });
		},
		tabs__scroll: function() {
			let { type } = this;
			return utils.bem('tabs__scroll', [type]);
		},
		tabs__nav: function() {
			let { type } = this;
			return utils.bem('tabs__nav', [type]);
		},
		tabs__track: function() {
			let { animated } = this;
			return utils.bem('tabs__track', [{ animated }]);
		},
		getTabClassTrue: function() {
			let { ellipsis } = this;
			return getters.tabClass(true, ellipsis);
		},
		getTabClassFalse: function() {
			let { ellipsis } = this;
			return getters.tabClass(false, ellipsis);
		},
		allStyle: function() {
			let { ellipsis, color, type, titleActiveColor, titleInactiveColor, swipeThreshold, scrollable } = this;
			return getters.tabStyle(true, ellipsis, color, type, true, titleActiveColor, titleInactiveColor, swipeThreshold, scrollable);
		},
		currentStyle: function() {
			let { ellipsis, color, type, titleActiveColor, titleInactiveColor, swipeThreshold, scrollable } = this;
			return getters.tabStyle(true, ellipsis, color, type, false, titleActiveColor, titleInactiveColor, swipeThreshold, scrollable);
		},
		disabledStyle: function() {
			let { ellipsis, color, type, titleActiveColor, titleInactiveColor, swipeThreshold, scrollable } = this;
			return getters.tabStyle(false, ellipsis, color, type, true, titleActiveColor, titleInactiveColor, swipeThreshold, scrollable);
		},
		noStyle: function() {
			let { ellipsis, color, type, titleActiveColor, titleInactiveColor, swipeThreshold, scrollable } = this;
			return getters.tabStyle(false, ellipsis, color, type, false, titleActiveColor, titleInactiveColor, swipeThreshold, scrollable);
		},
	},
	watch: {
		color(val) {
			this.setLine();
		},
		animated(val) {
			this.setTrack();
			this.children().forEach(child => child.updateRender());
		},
		lineWidth(val) {
			this.setLine();
		},
		lineHeight(val) {
			this.setLine();
		},
		active(val) {
			if (val !== this.getCurrentName()) {
				this.setCurrentIndexByName(val);
			}
		},
		swipeThreshold(val) {
			this.setData({
				scrollable: this.children().length > val || !this.ellipsis
			});
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.updateTabs();
		});
		this.setData({
			container: () => this.createSelectorQuery().select('.you-tabs')
		});
		this.setTrack();
		this.scrollIntoView();
	},
	methods: {
		children() {
			let newArr
			// #ifdef MP || APP-PLUS
			newArr = this.$children.filter((item, index) => {
				return item.title !== undefined;
			});
			// #endif
			// #ifndef MP || APP-PLUS
			newArr = this.$children[0].$children[1].$children[0].$children;
			// #endif
			return newArr;
		},
		updateTabs(e) {
			this.tabs = this.children().map(child => {
					let newChild = (({ dot, info, disabled, titleStyle, name, title }) => ({ dot, info, disabled, titleStyle, name, title }))(child);
					return newChild;
			});
			this.scrollable = this.children().length > this.swipeThreshold || !this.ellipsis;
			this.setCurrentIndexByName(this.getCurrentName() || this.active);
		},
		trigger(eventName) {
			const { currentIndex } = this;
			const child = this.children()[currentIndex];
			if (!isDef(child)) {
				return;
			}
			this.$emit(eventName, {
				index: Number(currentIndex),
				name: child.getComputedName(),
				title: child.title
			});
		},
		onTap(event) {
			const { index } = event.currentTarget.dataset;
			const child = this.children()[index];
			if (child.disabled) {
				this.trigger('disabled');
			} else {
				this.setCurrentIndex(index);
				this.$nextTick(() => {
					this.trigger('click');
				});
			}
		},
		// correct the index of active tab
		setCurrentIndexByName(name) {
			const matched = this.children().filter(child => child.getComputedName() == name);
			if (matched.length) {
				this.setCurrentIndex(matched[0].index);
			}
		},
		setCurrentIndex(currentIndex) {
			if (!isDef(currentIndex) || currentIndex >= this.children().length || currentIndex < 0) {
				return;
			}
			
			this.children().forEach((item, index) => {
				const active = index == currentIndex;
				if (active !== item.active || !item.inited) {
					item.updateRender(active, this);
				}
			});
			
			if (currentIndex === this.currentIndex) {
				return;
			}
			
			const shouldEmitChange = this.currentIndex !== null;
			this.setData({ currentIndex });
			this.$nextTick(() => {
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
			const activeTab = this.children()[this.currentIndex];
			if (activeTab) {
				return activeTab.getComputedName();
			}
		},
		setLine(skipTransition) {
			if (this.type !== 'line') {
				return;
			} 
			
			const { color, duration, currentIndex, lineWidth, lineHeight } = this;
			this.getRect('.you-tab', true).then((rects = []) => {
				const rect = rects[currentIndex];
				if (rect == null) {
					return;
				}
				const width = lineWidth !== -1 ? lineWidth : rect.width / 2;
				const height = lineHeight !== -1 ? `height: ${addUnit(lineHeight)}; border-radius: ${addUnit(lineHeight)};` : '';
				let left = rects.slice(0, currentIndex).reduce((prev, curr) => prev + curr.width, 0);
				left += (rect.width - width) / 2;
				const transition = skipTransition ? '' : `transition-duration: ${duration}s; -webkit-transition-duration: ${duration}s;`;
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
			const { animated, duration, currentIndex } = this;
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
			const { currentIndex, scrollable } = this;
			if (!scrollable) {
				return;
			}
			Promise.all([this.getRect('.you-tab', true), this.getRect('.you-tabs__nav')]).then(([tabRects, navRect]) => {
				const tabRect = tabRects[currentIndex];
				const offsetLeft = tabRects.slice(0, currentIndex).reduce((prev, curr) => prev + curr.width, 0);
				this.setData({
					scrollLeft: offsetLeft - (navRect.width - tabRect.width) / 2
				});
			});
		},
		onTouchScroll(event) {
			this.$emit('scroll', event.detail);
		},
		onTouchStart(event) {
			if (!this.swipeable) return;
			this.touchStart(event);
		},
		onTouchMove(event) {
			if (!this.swipeable) return;
			this.touchMove(event);
		},
		// watch swipe touch end
		onTouchEnd() {
			if (!this.swipeable) return;
			const { tabs, currentIndex } = this;
			const { direction, deltaX, offsetX } = this;
			const minSwipeDistance = 50;
			if (direction === 'horizontal' && offsetX >= minSwipeDistance) {
				if (deltaX > 0 && currentIndex !== 0) {
					this.setCurrentIndex(currentIndex - 1);
				} else if (deltaX < 0 && currentIndex !== tabs.length - 1) {
					this.setCurrentIndex(currentIndex + 1);
				}
			}
		}
	}
};
</script>

<style>
@import './index.css';
</style>
