<template>
	
	<view
	  :style="style"
	  :class="[customClass,image]"
	  :tap="onClick"
	>
	  <image
	    v-if="!error"
	    :src="src"
	    :mode="mode"
	    :lazy-load="lazyLoad"
	    :class="[imageClass, 'you-image__img']"
	    :show-menu-by-longpress="showMenuByLongpress"
	    @load="onLoa"
	    @error="onErr"
	  />
	
	  <view
	    v-if="loading && showLoading"
	    :class="[loadingClass, 'you-image__loading']"
	  >
	    <slot v-if="useLoadingSlot" name="loading" />
	    <you-icon v-else name="photo-o" size="22" />
	  </view>
	  <view
	    v-if="error && showError"
	    :class="[errorClass, 'you-image__error']"
	  >
	    <slot v-if="useErrorSlot" name="error" />
	    <you-icon v-else name="warning-o" size="22" />
	  </view>
	</view>
	
</template>

<script>
	import utils from '../wxs/utils.js';
	import { addUnit, isDef } from '../common/utils';
	import { button } from '../mixins/button';
	import { openType } from '../mixins/open-type';
	import { basic } from '../mixins/basic.js';
	import youIcon from '@/components/icon/index.vue';
	
	const FIT_MODE_MAP = {
	    none: 'center',
	    fill: 'scaleToFill',
	    cover: 'aspectFill',
	    contain: 'aspectFit'
	};
	
	export default {
		name: 'youImage',
		mixins: [button(), openType(),basic()],
		components: {youIcon},
		props: {
			customClass: String,
			loadingClass: String,
			errorClass: String,
			imageClass: String,
		    src: String,
		    round: Boolean,
		    width: null,
		    height: null,
		    radius: null,
		    lazyLoad: Boolean,
		    useErrorSlot: Boolean,
		    useLoadingSlot: Boolean,
		    showMenuByLongpress: Boolean,
		    fit: {
		        type: String,
		        default: 'fill'
		    },
		    showError: {
		        type: Boolean,
		        default: true
		    },
		    showLoading: {
		        type: Boolean,
		        default: true
		    }
		},
		data() {
			return {
				error: false,
				loading: true,
				style: '',
				mode: '',
			}
		},
		computed: {
			image:function(){
				let {round} = this;
				return utils.bem('image', { round })
			}
		},
		watch: {
		    src(val) {
		        this.setData({
		            error: false,
		            loading: true
		        });
		    },
			width(val){
				this.setStyle()
			},
			height(val){
				this.setStyle()
			},
			fit(val){
				this.setMode()
			}
		},
		mounted() {
		    this.setMode();
		    this.setStyle();
		},
		methods: {
		    setMode() {
		        this.setData({
		            mode: FIT_MODE_MAP[this.fit],
		        });
		    },
		    setStyle() {
		        const { width, height, radius } = this;
		        let style = '';
		        if (isDef(width)) {
		            style += `width: ${addUnit(width)};`;
		        }
		        if (isDef(height)) {
		            style += `height: ${addUnit(height)};`;
		        }
		        if (isDef(radius)) {
		            style += 'overflow: hidden;';
		            style += `border-radius: ${addUnit(radius)};`;
		        }
		        this.setData({ style });
		    },
		    onLoa(event) {
		        this.setData({
		            loading: false
		        });
		        this.$emit('load', event.detail);
		    },
		    onErr(event) {
		        this.setData({
		            loading: false,
		            error: true
		        });
		        this.$emit('error', event.detail);
		    },
		    onClick(event) {
		        this.$emit('click', event.detail);
		    }
		}
	}
</script>

<style>
	@import './index.css';
</style>
