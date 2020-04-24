<template>
	<view class="">
		<slot />
	</view>
</template>

<script>
	export default {
		name: 'youRadioGroup',
		props: {
			value: null,
			disabled: Boolean
		},
		provide(){
			return {
				radio_parent: this,
			}
		},
		watch:{
			value(v,o){
				if(v && v!==o){
					this.updateChildren()
				}
			},
			disabled(v,o){
				if(v && v!==o){
					
					this.updateChildren()
				}
			},
		},
		mounted() {
			this.$nextTick(()=>{
				this.updateChildren()
			})
		},
		methods: {
			updateChildren() {
				(this.$children || []).forEach((child) => this.finChildNode(child));
			},
			updateChild(child) {
				const { value, disabled } = this; 
				child.setData({
					values: value,
					Cdisabled: disabled || child.Cdisabled
				});
			},
			finChildNode(children){
				if(children.$options.name === 'youRadio'){
					this.updateChild(children)
				}else if(children.$options.name === 'youCellGroup'){
					(children.$children || []).forEach((child) => {
						this.updateChild(child.$children[0])
					});
				}
			}
		}
	}
</script>

<style>
	@import '../common/index.css';
</style>
