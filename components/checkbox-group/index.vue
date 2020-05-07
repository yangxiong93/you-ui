<template>
	<view><slot /></view>
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
	watch: {
		value(v) {
			this.updateChildren();
		},
		disabled(v) {
			this.updateChildren();
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.updateChildren();
		});
	},
	methods: {
		updateChildren() {
			// #ifndef H5
			if(this.$children[0].value!==undefined){
				(this.$children || []).forEach(child => this.finChildNode(child));
			}else{
				(this.$children[0].$children || []).forEach(child => this.finChildNode(child));
			}
			// #endif
			// #ifdef H5
			if(this.$children[0].$children[0].value!==undefined){
				(this.$children[0].$children || []).forEach(child => this.finChildNode(child));
			}else{
				(this.$children[0].$children[0].$children[0].$children[0].$children || []).forEach(child => this.finChildNode(child));
			}
			// #endif
		},
		updateChild(child) {
			const { value, disabled } = this;
			child.setData({
				values: value.indexOf(child.name) !== -1,
				parentDisabled: disabled
			});
		},
		finChildNode(children) {
			const { value, disabled } = this;
			if (children.name) {
				this.updateChild(children);
			} else{
				// #ifndef H5
				this.updateChild(children.$children[0]);
				// #endif
				// #ifdef H5
				this.updateChild(children.$children[0].$children[2]);
				// #endif
			}
		}
	}
};
</script>

<style>
@import '../common/index.css';
</style>
