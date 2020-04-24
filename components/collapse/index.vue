<template>
	<view class="you-collapse" :class="[customClass,border ? 'you-hairline--top-bottom' : '']">
	  <slot />
	</view>
</template>

<script>
	import { basic } from '../mixins/basic.js';
	export default {
		name: 'youCollapse',
		mixins: [basic()],
		props: {
			value: null,
			accordion: Boolean,
			border: {
				type: Boolean,
				default: true
			},
			customClass: String
		},
		provide(){
			return {
				collapse_parent: this,
			}
		},
		watch: {
			value(newVal,oldVal){
				if(newVal!==oldVal){
					
					this.updateExpanded();
				}
			},
			accordion(newVal,oldVal){
				if(newVal!==oldVal){
					this.updateExpanded();
				}
			}
		},
		mounted() {
			this.$nextTick(()=>{
				this.updateExpanded()
			})
		},
		methods: {
			updateExpanded() {
				let children = this.$children;
				// #ifdef H5
				children = children[0].$children;
				// #endif
				children.forEach((child) => {
					child.updateExpanded();
				});
			},
			switch(name, expanded) {
				const { accordion, value } = this;
				if (!accordion) {
					name = expanded
						? (value || []).concat(name)
						: (value || []).filter((activeName) => activeName !== name);
				}
				else {
					name = expanded ? name : '';
				}
				this.$emit('change', name);
				this.$emit('input', name);
			}
		}
	}
		
</script>

<style>
	@import '../common/index.css';
</style>
