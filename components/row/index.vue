<template>
	<view class="custom-class you-row" :style="viewStyle">
	  <slot />
	</view>
</template>

<script>
	import { basic } from '../mixins/basic.js';
	export default {
		data() {
			return {
				viewStyle: ''
			}
		},
		mixins:[basic()],
		props:{
			gutter: [Number,String],
		},
		watch:{
			gutter(val){ 
				this.setGutter()
			}
		},
		mounted() {
			if (this.gutter) {
				this.setGutter();
			}	
		},
		methods: {
			setGutter() {
				const { gutter } = this;
				const margin = `-${Number(gutter) / 2}px`;
				const viewStyle = gutter
					? `margin-right: ${margin}; margin-left: ${margin};`
					: '';
				this.setData({ viewStyle });
				// #ifdef MP
				this.$children.forEach(col => {
					col.setGutter(this.gutter);
				});
				// #endif
				// #ifndef MP
				this.$children[0].$children.forEach(col => {
					col.setGutter(this.gutter);
				});
				// #endif
			}
		}
	}
</script>

<style>
	@import '../common/index.css';
	.you-row:after{display:table;clear:both;content:""}
</style>
