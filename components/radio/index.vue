<template>
	<view class="you-radio custom-class">
	  <view
	    v-if="labelPosition === 'left'"
	    class="label-class"
		:class="[radio__label]"
	    @tap="onClickLabel"
	  >
	    <slot />
	  </view>
	  <view class="you-radio__icon-wrap" :style="'font-size:' + cIconSize + 'px'" @tap="onChange">
	    <slot v-if="useIconSlot" name="icon" />
	    <you-icon
	      v-else
	      name="success"
	      :class="[radio__icon]"
	      :custom-style="'line-height:' + cIconSize +'px;font-size:' + cIconSize + 'px;' + checkedColor && !Cdisabled && values === name ? 'border-color:' + checkedColor + '; background-color:' + checkedColor + ';' : ''"
	      custom-class="icon-class"
	    />
	  </view>
	  <view
	    v-if="labelPosition === 'right'"
		class="label-class"
	    :class="[radio__label]"
	    @tap="onClickLabel"
	  >
	    <slot />
	  </view>
	</view>
</template>

<script>
	import utils from '../wxs/utils.js';
	import { basic } from '../mixins/basic.js';
	import youIcon from '@/components/icon/index.vue';
	export default {
		name: 'youRadio',
		mixins: [basic()],
		components: {
			youIcon
		},
		props: {
			name: null,
			value: null,
			disabled: Boolean,
			useIconSlot: Boolean,
			checkedColor: String,
			labelPosition: {
				type: String,
				default: 'right'
			},
			labelDisabled: Boolean,
			shape: {
				type: String,
				default: 'round'
			},
			iconSize: {
				type: null,
				default: 20
			}
		},
		data(){
			return {
				// 避免子组件直接修改props数据引起警告
				values: this.value, 
				Cdisabled: this.disabled
			}
		},
		inject: ['radio_parent'],
		computed: {
			radio__label:function(){
				let labelPosition = this.labelPosition;
				let disabled = this.Cdisabled;
				return utils.bem('radio__label', [labelPosition, { disabled }]);
			},
			cIconSize:function(){
				let iconSize = this.iconSize;
				return utils.addUnit(iconSize)
			},
			radio__icon:function(){
				let shape = this.shape;
				let disabled = this.Cdisabled;
				let value = this.values;
				let name = this.name;
				return utils.bem('radio__icon', [shape, { disabled, checked: value === name }])
			}
		},
		methods: {
			emitChange(value) {
				const instance = this.radio_parent || this;
				instance.$emit('input', value);
				instance.$emit('change', value);
			},
			onChange() {
				if (!this.Cdisabled) {
					this.emitChange(this.name);
				}
			},
			onClickLabel() {
				const { Cdisabled, labelDisabled, name } = this;
				if (!Cdisabled && !labelDisabled) {
					this.emitChange(name);
				}
			}
		}
	}
</script>

<style>
	@import './index.css';
</style>
