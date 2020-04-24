<template>
	<view class="you-sticky" :class="[customClass]" :style="containerStyle">
		<view :class="[sticky_wrap]" :style="wrapStyle"><slot /></view>
	</view>
</template>

<script>
import utils from '../wxs/utils.js';
import { basic } from '../mixins/basic.js';
const ROOT_ELEMENT = '.you-sticky';

export default {
	props: {
		customClass: String,
		zIndex: {
			type: Number,
			default: 99
		},
		offsetTop: {
			type: Number,
			default: 0,
		},
		disabled: Boolean,
		container: false,
	},
	mixins: [basic()],
	data() {
		return {
			wrapStyle: '',
			containerStyle: '',
			fixed: '',
			height: '',
			mounted: '',
			nodeContainer: ''
		}
	},
	computed: {
		sticky_wrap: function(){
			let {fixed} = this;
			return utils.bem('sticky-wrap', { fixed });
		}
	},
	watch: {
		offsetTop(val){
			this.observeContent();
		},
		disabled(val){
			if (!this.mounted) {
				return;
			}
			value ? this.disconnectObserver() : this.initObserver();
		},
		nodeContainer(val){
			if (typeof target !== 'function' || !this.height) {
				return;
			}
			this.observeContainer();
		}
	},
	mounted() {
		this.mounted = true;
		if(this.container){
			this.nodeContainer = ()=>uni.createSelectorQuery().select('#container');
		}
		if (!this.disabled) {
			this.initObserver();
		}
	},
	destroyed() {
		this.disconnectObserver();
	},
	methods: {
		setStyle() {
			const { offsetTop, height, fixed, zIndex } = this;
			if (fixed) {
				this.setData({
					wrapStyle: `top: ${offsetTop}px;`,
					containerStyle: `height: ${height}px; z-index: ${zIndex};`
				});
			} else {
				this.setData({
					wrapStyle: '',
					containerStyle: ''
				});
			}
		},
		getContainerRect() {
			const nodesRef = this.nodeContainer();
			return new Promise(resolve => nodesRef.boundingClientRect(resolve).exec());
		},
		initObserver() {
			this.disconnectObserver();
			this.getRect(ROOT_ELEMENT).then(rect => {
				this.setData({ height: rect.height });
				this.$nextTick(() => {
					this.observeContent();
					this.observeContainer();
				});
			});
		},
		disconnectObserver(observerName) {
			if (observerName) {
				const observer = this[observerName];
				observer && observer.disconnect();
			} else {
				this.contentObserver && this.contentObserver.disconnect();
				this.containerObserver && this.containerObserver.disconnect();
			}
		},
		observeContent() {
			const { offsetTop } = this;
			this.disconnectObserver('contentObserver');
			// #ifdef MP
			const contentObserver = uni.createIntersectionObserver(this,{
				thresholds: [0, 1]
			});
			// #endif
			// #ifndef MP
			const contentObserver = uni.createIntersectionObserver({
				thresholds: [0, 1]
			});
			// #endif
			this.contentObserver = contentObserver;
			contentObserver.relativeToViewport({ top: -offsetTop });
			contentObserver.observe(ROOT_ELEMENT, res => {
				if (this.disabled) {
					return;
				}
				this.setFixed(res.boundingClientRect.top);
			});
		},
		observeContainer() {
			if (typeof this.nodeContainer !== 'function') {
				return;
			}
			const { height } = this;
			this.getContainerRect().then(rect => {
				this.containerHeight = rect.height;
				this.disconnectObserver('containerObserver');
				// #ifdef MP
				const containerObserver = uni.createIntersectionObserver(this,{
					thresholds: [0, 1]
				});
				// #endif
				// #ifndef MP
				const containerObserver = uni.createIntersectionObserver({
					thresholds: [0, 1]
				});
				// #endif
				this.containerObserver = containerObserver;
				containerObserver.relativeToViewport({
					top: this.containerHeight - height
				});
				containerObserver.observe(ROOT_ELEMENT, res => {
					if (this.disabled) {
						return;
					}
					this.setFixed(res.boundingClientRect.top);
				});
			});
		},
		setFixed(top) {
			const { offsetTop, height } = this;
			const { containerHeight } = this;
			const fixed = containerHeight && height ? top > height - containerHeight && top < offsetTop : top < offsetTop;
			this.$emit('scroll', {
				scrollTop: top,
				isFixed: fixed
			});
			this.setData({ fixed });
			this.$nextTick(() => {
				this.setStyle();
			});
		}
	}
};
</script>

<style>
@import '../common/index.css';
.you-sticky {
	position: relative;
}
.you-sticky-wrap--fixed {
	position: fixed;
	right: 0;
	left: 0;
}
</style>
