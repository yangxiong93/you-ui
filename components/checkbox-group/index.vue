<template>
	<view>
		<slot/>
	</view>
</template>

<script>
	export default {
		name: 'youCheckboxGroup',
		props: {
			max: Number,
			value: {
				type: Array,
				value: []
			},
			disabled: {
				type: Boolean,
				value: false
			}
		},
		provide(){
			return {
				parent: this,
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
					values: value.indexOf(child.name) !== -1,
					parentDisabled: disabled
				})
			},
			finChildNode(children){
				const { value, disabled } = this;
				if(children.$options.name === 'youCheckbox'){
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
