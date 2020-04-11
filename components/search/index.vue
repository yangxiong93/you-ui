<template>
	<view class="custom-class" :class="[search]" :style="'background:' + background">
		<view :class="[search__content]">
			<view class="you-search__label" v-if="label">{{ label }}</view>
			<slot v-else name="label" />
			<you-field
				type="search"
				:left-icon="!useLeftIconSlot ? leftIcon : ''"
				:right-icon="!useRightIconSlot ? rightIcon : ''"
				:focus="focus"
				:error="error"
				:border="false"
				confirm-type="search"
				class="you-search__field field-class"
				:value="value"
				:disabled="disabled"
				:readonly="readonly"
				:clearable="clearable"
				:maxlength="maxlength"
				:input-align="inputAlign"
				input-class="input-class"
				:placeholder="placeholder"
				:placeholder-style="placeholderStyle"
				custom-style="padding: 3px 10px 3px 0; background-color: transparent;"
				@blur="onBlur"
				@focus="onFocus"
				@change="onChange"
				@confirm="onSearch"
				@clear="onClear"
			>
				<slot v-if="useLeftIconSlot" name="left-icon" slot="left-icon" />
				<slot v-if="useRightIconSlot" name="right-icon" slot="right-icon" />
			</you-field>
		</view>

		<view v-if="showAction || useActionSlot" class="you-search__action" hover-class="you-search__action--hover" hover-stay-time="70">
			<slot v-if="useActionSlot" name="action" />
			<view v-else @tap="onCancel" class="cancel-class">{{ actionText }}</view>
		</view>
	</view>
</template>

<script>
import utils from '../wxs/utils.js';
import youField from '@/components/field/index.vue';
export default {
	name: 'youSearch',
	components: {youField},
	props: {
		label: String,
		focus: Boolean,
		error: Boolean,
		disabled: Boolean,
		readonly: Boolean,
		inputAlign: String,
		showAction: Boolean,
		useActionSlot: Boolean,
		useLeftIconSlot: Boolean,
		useRightIconSlot: Boolean,
		leftIcon: {
			type: String,
			default: 'search'
		},
		rightIcon: String,
		placeholder: String,
		placeholderStyle: String,
		actionText: {
			type: String,
			default: '取消'
		},
		background: {
			type: String,
			default: '#ffffff'
		},
		maxlength: {
			type: Number,
			default: -1
		},
		shape: {
			type: String,
			default: 'square'
		},
		clearable: {
			type: Boolean,
			default: true
		},
		value: {
			// 当前输入的值
			type: [String, Number],
			default: null
		}
	},
	computed:{
		search:function(){
			let showAction = this.showAction;
			let useActionSlot = this.useActionSlot;
			return utils.bem('search', { withaction: showAction || useActionSlot });
		},
		search__content:function(){
			let shape = this.shape;
			return utils.bem('search__content', [shape]);
		}
	},
	methods: {
		onChange(event) {
			// this.value = event.value;
			this.$emit('change', event.value);
		},
		onCancel() {
			/**
			 * 修复修改输入框值时，输入框失焦和赋值同时触发，赋值失效
			 * https://github.com/youzan/@you/weapp/issues/1768
			 */
			setTimeout(() => {
				this.value = '';
				this.$emit('cancel');
				this.$emit('change', '');
			}, 200);
		},
		onSearch() {
			this.$emit('search', this.value);
		},
		onFocus() {
			this.$emit('focus');
		},
		onBlur() {
			this.$emit('blur');
		},
		onClear() {
			this.$emit('clear');
		},
	}
}
</script>

<style lang="scss">
@import '../common/index.scss';
.you-search {
	-webkit-align-items: center;
	align-items: center;
	box-sizing: border-box;
	padding: 10px 12px;
	padding: var(--search-padding, 10px 12px);
}
.you-search,
.you-search__content {
	display: -webkit-flex;
	display: flex;
}
.you-search__content {
	-webkit-flex: 1;
	flex: 1;
	padding-left: 8px;
	padding-left: var(--padding-xs, 8px);
	border-radius: 2px;
	border-radius: var(--border-radius-sm, 2px);
	background-color: #f7f8fa;
	background-color: var(--search-background-color, #f7f8fa);
}
.you-search__content--round {
	border-radius: 17px;
	border-radius: calc(var(--search-input-height, 34px) / 2);
}
.you-search__label {
	padding: 0 5px;
	padding: var(--search-label-padding, 0 5px);
	font-size: 14px;
	font-size: var(--search-label-font-size, 14px);
	line-height: 34px;
	line-height: var(--search-input-height, 34px);
	color: #323233;
	color: var(--search-label-color, #323233);
}
.you-search__field {
	-webkit-flex: 1;
	flex: 1;
}
.you-search__field__left-icon {
	color: #969799;
	color: var(--search-left-icon-color, #969799);
}
.you-search--withaction {
	padding-right: 0;
}
.you-search__action {
	padding: 0 8px;
	padding: var(--search-action-padding, 0 8px);
	font-size: 14px;
	font-size: var(--search-action-font-size, 14px);
	line-height: 34px;
	line-height: var(--search-input-height, 34px);
	color: #323233;
	color: var(--search-action-text-color, #323233);
}
.you-search__action--hover {
	background-color: #f2f3f5;
	background-color: var(--active-color, #f2f3f5);
}
</style>
