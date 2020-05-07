<template>
	<view
	  :class="[col,customClass,offset ? 'you-col--offset-' + offset : '']"
	  :style="viewStyle"
	>
	  <slot />
	</view>
</template>

<script>
	import utils from '../wxs/utils.js';
	import { basic } from '../mixins/basic.js';
	export default {
		data() {
			return {
				viewStyle: ''
			}
		},
		mixins:[basic()],
		props:{
			customClass:String,
			span: [Number,String],
			offset: [Number,String]
		},
		computed:{
			col:function(){
				let span = this.span;
				return utils.bem('col', [span]);
			}
		},
		methods: {
			setGutter(gutter) {
				const padding = `${gutter / 2}px`;
				const viewStyle = gutter ? `padding-left: ${padding}; padding-right: ${padding};` : '';
				if (viewStyle !== this.viewStyle) {
					this.setData({ viewStyle });
				}
			}
		}
	}
</script>

<style>
	@import './index.css';
</style>
