<template>
	<you-cell
		:size="size"
		:icon="leftIcon"
		:title="label"
		:center="center"
		:border="border"
		:is-link="isLink"
		:required="required"
		:clickable="clickable"
		:title-width="titleWidth"
		:custom-style="customStyle"
		:arrow-direction="arrowDirection"
		custom-class="you-field"
	>
		<slot name="left-icon" slot="icon" />
		<slot name="label" slot="title" />
		<view :class="[field__body]">
			<textarea
				v-if="type === 'textarea'"
				class="input-class"
				:class="[field__input]"
				:fixed="fixed"
				:focus="focus"
				:value="value"
				:disabled="disabled || readonly"
				:maxlength="maxlength"
				:placeholder="placeholder"
				:placeholder-style="placeholderStyle"
				:placeholder-class="field__placeholder"
				:auto-height="autosize"
				:cursor-spacing="cursorSpacing"
				:adjust-position="adjustPosition"
				:show-confirm-bar="showConfirmBar"
				:hold-keyboard="holdKeyboard"
				:selection-end="selectionEnd"
				:selection-start="selectionStart"
				@input="onInput"
				@blur="onBlur"
				@focus="onFocus"
				@confirm="onConfirm"
			></textarea>
			<input
				v-else
				class="input-class"
				:class="[field__input]"
				:type="type"
				:focus="focus"
				:value="value"
				:disabled="disabled || readonly"
				:maxlength="maxlength"
				:placeholder="placeholder"
				:placeholder-style="placeholderStyle"
				:placeholder-class="field__placeholder"
				:confirm-type="confirmType"
				:confirm-hold="confirmHold"
				:hold-keyboard="holdKeyboard"
				:cursor-spacing="cursorSpacing"
				:adjust-position="adjustPosition"
				:selection-end="selectionEnd"
				:selection-start="selectionStart"
				:password="password || type === 'password'"
				@input="onInput"
				@blur="onBlur"
				@focus="onFocus"
				@confirm="onConfirm"
			/>
			<you-icon
				v-if="clearable && focused && value && !readonly"
				size="16px"
				name="clear"
				class="you-field__clear-root you-field__icon-root"
				@touchstart="onClear"
			/>
			<view class="you-field__icon-container" bind:tap="onClickIcon">
				<you-icon v-if="rightIcon || icon" size="16px" :name="rightIcon || icon" class="you-field__icon-root" :class="iconClass" custom-class="right-icon-class" />
				<slot name="right-icon" />
				<slot name="icon" />
			</view>
			<view class="you-field__button"><slot name="button" /></view>
		</view>
		<view v-if="errorMessage" class="you-field__error-message" :class="[field__error]">{{ errorMessage }}</view>
	</you-cell>
</template>

<script>
import utils from '../wxs/utils.js';
import youCell from '@/components/cell/index.vue';
import youIcon from '@/components/icon/index.vue';
export default {
	name: 'youField',
	components: {
		youCell,
		youIcon
	},
	props: {
		leftIcon: {
			// 左侧图标名称或图片链接，可选值见 Icon 组件
			type: String,
			default: null
		},
		label: {
			// 列表标题
			type: String,
			default: ''
		},
		titleWidth: {
			//标题宽度，须包含单位
			type: String,
			default: null
		},
		arrowDirection: {
			//箭头方向，可选值为 left up down
			type: String,
			default: 'right'
		},
		center: {
			//是否使内容垂直居中
			type: Boolean,
			default: true
		},
		border: {
			//是否显示下边框
			type: Boolean,
			default: true
		},
		size: {
			//单元格大小，可选值为 large
			type: String,
			default: ''
		},
		clickable: {
			//是否开启点击反馈
			type: Boolean,
			default: false
		},
		clearable: {
			//是否启用清除控件
			type: Boolean,
			default: false
		},
		required: {
			//是否显示表单必填星号
			type: Boolean,
			default: false
		},
		customStyle: {
			//根结点样式
			type: String,
			default: ''
		},
		type: {
			//可设置为任意原生类型, 如 number idcard textarea digit
			type: String,
			default: 'text'
		},
		inputAlign: {
			//输入框内容对齐方式，可选值为 center right
			type: String,
			default: 'left'
		},
		disabled: {
			//是否禁用输入框
			type: Boolean,
			default: false
		},
		error: {
			//是否将输入内容标红
			type: Boolean,
			default: false
		},
		fixed: {
			//如果 type 为 textarea 且在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true
			type: Boolean,
			default: false
		},
		focus: {
			//获取焦点
			type: Boolean,
			default: false
		},
		value: {
			// 当前输入的值
			type: [String, Number],
			default: null
		},
		readonly: {
			//是否只读
			type: Boolean,
			default: false
		},
		maxlength: {
			//最大输入长度，设置为 -1 的时候不限制最大长度
			type: Number,
			default: -1
		},
		placeholder: {
			//输入框为空时占位符
			type: String,
			default: ''
		},
		placeholderStyle: {
			//指定 placeholder 的样式
			type: String,
			default: ''
		},
		autosize: {
			//自适应内容高度，只对 textarea 有效
			type: Boolean,
			default: false
		},
		cursorSpacing: {
			//输入框聚焦时底部与键盘的距离
			type: Number,
			default: 50
		},
		adjustPosition: {
			//键盘弹起时，是否自动上推页面
			type: Boolean,
			default: true
		},
		showConfirmBar: {
			//是否显示键盘上方带有”完成“按钮那一栏
			type: Boolean,
			default: true
		},
		holdKeyboard: {
			//focus 时，点击页面的时候不收起键盘
			type: Boolean,
			default: false
		},
		selectionEnd: {
			//光标结束位置，自动聚焦时有效，需与selection-start搭配使用
			type: Number,
			default: -1
		},
		selectionStart: {
			//光标起始位置，自动聚焦时有效，需与selection-end搭配使用
			type: Number,
			default: -1
		},
		confirmType: {
			//设置键盘右下角按钮的文字，仅在 type='text' 时生效
			type: String,
			default: 'down'
		},
		confirmHold: {
			//点击键盘右下角按钮时是否保持键盘不收起，在 type='textarea' 时无效
			type: Boolean,
			default: false
		},
		password: {
			//是否是密码类型
			type: Boolean,
			default: false
		},
		errorMessage: {
			//底部错误提示文案，为空时不展示
			type: String,
			default: ''
		},
		errorMessageAlign: {
			//底部错误提示文案对齐方式，可选值为 center right
			type: String,
			default: ''
		},
		rightIcon: {
			//右侧图标名称或图片链接，可选值见 Icon 组件
			type: String,
			default: null
		}
	},
	data() {
		return {
			focused: false,
			system: uni
				.getSystemInfoSync()
				.system.split(' ')
				.shift()
				.toLowerCase()
		};
	},
	computed: {
		field__body: function() {
			let type = this.type;
			let system = this.system;
			let field__body = utils.bem('field__body', [type, system]);
			return field__body;
		},
		field__input: function() {
			let inputAlign = this.inputAlign;
			let type = this.type;
			let disabled = this.disabled;
			let error = this.error;
			let field__input = utils.bem('field__input', [inputAlign, type, { disabled, error }]);
			return field__input;
		},
		field__placeholder: function() {
			let error = this.error;
			let field__placeholder = utils.bem('field__placeholder', { error });
			return field__placeholder;
		},
		field__error: function() {
			let errorMessageAlign = this.errorMessageAlign;
			let disabled = this.disabled;
			let error = this.error;
			let field__error = utils.bem('field__error', [errorMessageAlign, { disabled, error }]);
			return field__error;
		}
	},
	methods: {
		onInput(event) {
			this.emitChange(event.detail);
		},
		onFocus(event) {
			this.focused = true;
			this.$emit('focus', event.detail);
		},
		onBlur(event) {
			this.focused = false;
			this.$emit('blur', event.detail);
		},
		onClickIcon() {
			this.$emit('click-icon');
		},
		onClear() {
			this.emitChange('');
			this.$emit('clear', '');
		},
		onConfirm() {
			this.$emit('confirm', this.value);
		},
		emitChange(value) {
			this.$emit('input', value);
			this.$emit('change', value);
		},
		noop() {}
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
