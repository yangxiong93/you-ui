<template>
	<view class="you-checkbox custom-class">
	  <view class="you-checkbox__icon-wrap" @tap.stop="toggle">
	    <slot v-if="useIconSlot" name="icon" />
	    <you-icon
	      v-else
	      name="success"
	      size="0.8em"
	      :class="checkbox__icon"
	      :style="iconStyle"
	      custom-class="icon-class"
	      custom-style="line-height: 1.25em;"
	    />
	  </view>
	  <view class="label-class" :class="checkbox__label" @tap.stop="onClickLabel">
	    <slot />
	  </view>
	</view>
</template>

<script>
	import { basic } from '../mixins/basic.js';
	import utils from '../wxs/utils.js';
	import computed from './index.js';
	import youIcon from '@/components/icon/index.vue';
	
	function emit(target, value) {
	    target.$emit('input', value);
	    target.$emit('change', value);
	}
	export default {
		name: 'youCheckbox',
		components: {
			youIcon
		},
		mixins: [basic()],
		props: {
			value: {
				type: Boolean,
				default: false
			},
			disabled: Boolean,
			useIconSlot: Boolean,
			checkedColor: String,
			labelPosition: String,
			labelDisabled: Boolean,
			name: String, 
			shape: {
				type: String,
				default: 'round'
			},
			iconSize: {
				type: null,
				default: 20
			}
		},
		inject: ['parent'],
		data(){
			return {
				parentDisabled: false,
				values: this.value, // 避免子组件直接修改props数据引起警告
			}
		},
		computed: {
			checkbox__icon: function(){
				let shape = this.shape;
				let disabled = this.disabled;
				let parentDisabled = this.parentDisabled;
				let value = this.values;
				return utils.bem('checkbox__icon', [shape, { disabled: disabled || parentDisabled, checked: value }]);
			},
			iconStyle: function(){
				return computed.iconStyle(this.checkedColor, this.values, this.disabled, this.parentDisabled, this.iconSize);
			},
			checkbox__label: function(){
				let labelPosition = this.labelPosition;
				let disabled = this.disabled;
				let parentDisabled = this.parentDisabled;
				return utils.bem('checkbox__label', [labelPosition, { disabled: disabled || parentDisabled }]);
			}
		},
		methods: {
			onClickLabel() {
				const { labelDisabled, parentDisabled, disabled, values } = this;
				if (!disabled && !labelDisabled && !parentDisabled) {
					this.emitChange(!values);
				}
			},
			emitChange(value) {
				if (this.parent) {
					this.setParentValue(this.parent, value);
				}else {
					emit(this, value);
				}
			},
			toggle() {
				const { parentDisabled, disabled, values } = this;
				if (!disabled && !parentDisabled) {
					this.emitChange(!values);
				}
			},
			
			setParentValue(parent, value) {
				const parentValue = parent.value.slice();
				const { name } = this;
				const { max } = parent;
				if (value) {
					if (max && parentValue.length >= max) {
						return;
					}
					if (parentValue.indexOf(name) === -1) {
						parentValue.push(name);
						emit(parent, parentValue);
					}
				}else {
					const index = parentValue.indexOf(name);
					if (index !== -1) {
						parentValue.splice(index, 1);
						emit(parent, parentValue);
					}
				}
			}
		}
	}
</script>

<style>
	@import './index.css'
</style>
