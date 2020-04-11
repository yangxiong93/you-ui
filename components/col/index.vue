<template>
	<view
	  class="custom-class"
	  :class="[col,offset ? 'van-col--offset-' + offset : '']"
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
			span: Number,
			offset: Number
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

<style lang="scss" scoped>
	@import './index.scss';
</style>
