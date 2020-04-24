<template>
	<view
		class="you-picker-column custom-class"
		:style="{ height: itemHeight * visibleItemCount + 'px' }"
		@touchstart="onTouchStart"
		@touchmove.stop="onTouchMove"
		@touchend="onTouchEnd"
		@touchcancel="onTouchEnd"
	>
		<view
			:style="{transition: 'transform ' + duration + 'ms', lineHeight: itemHeight + 'px', transform: 'translate3d(0,' + ((itemHeight * (visibleItemCount - 1)) / 2 + offset) + 'px,0)'}"
		>
			<view
				v-for="(option, index) in options"
				:key="index"
				:data-index="index"
				:style="{height: itemHeight + 'px'}"
				class="you-ellipsis you-picker-column__item"
				:class="[option && option.disabled ? 'you-picker-column__item--disabled' : '', index === currentIndex ? 'you-picker-column__item--selected active-class' : '']"
				@click="onClickItem"
			>
				{{ filter.getOptionText(option, valueKey) }}
			</view>
		</view>
	</view>
</template>

<script module="filter" lang="wxs" src="./index.wxs"></script>
<script>
import { isObj, range } from '../common/utils';
import {basic} from '../mixins/basic.js';
const DEFAULT_DURATION = 200;
export default {
	name: 'youPickerColumn',
	props: {
		valueKey: {
			type: String,
			default: 'text'
		},
		className: {
			type: String,
			default: ''
		},
		itemHeight: {
			type: Number,
			default: null
		},
		visibleItemCount: {
			type: Number,
			default: null
		},
		initialOptions: {
			type: Array,
			default: []
		},
		defaultIndex: {
			type: Number,
			default: 0
		},
		customClass: {
			type: String,
			default: ''
		},
		dataIndex: {
			type: Number,
			default: 0
		}
	},
	mixins: [basic()],
	watch: {
		defaultIndex(value, old) {
			this.setIndex(value);
		}
	},
	data() {
		return {
			startY: 0,
			offset: 0,
			duration: 0,
			startOffset: 0,
			options: [],
			currentIndex: 0
		};
	},
	created() {
		const { defaultIndex, initialOptions } = this;
		this.options = initialOptions;
		this.setIndex(defaultIndex);
	},
	methods: {
		getCount() {
			return this.options.length;
		},
		onTouchStart(event) {
			this.startY = event.touches[0].clientY;
			this.startOffset = this.offset;
			this.duration = 0;
		},
		onTouchMove(event) {
			let that = this;
			const deltaY = event.touches[0].clientY - this.startY;
			this.offset = range(that.startOffset + deltaY, -(this.getCount() * that.itemHeight), that.itemHeight);
		},
		onTouchEnd() {
			const that = this;
			if (that.offset !== that.startOffset) {
				this.duration = DEFAULT_DURATION;
				const index = range(Math.round(-that.offset / that.itemHeight), 0, this.getCount() - 1);
				this.setIndex(index, true);
			}
		},
		onClickItem(event) {
			const { index } = event.currentTarget.dataset;
			this.setIndex(index, true);
		},
		adjustIndex(index) {
			const that = this;
			const count = this.getCount();
			index = range(index, 0, count);
			for (let i = index; i < count; i++) {
				if (!this.isDisabled(that.options[i])) return i;
			}
			for (let i = index - 1; i >= 0; i--) {
				if (!this.isDisabled(that.options[i])) return i;
			}
		},
		isDisabled(option) {
			return isObj(option) && option.disabled;
		},
		getOptionText(option) {
			const that = this;
			return isObj(option) && that.valueKey in option ? option[that.valueKey] : option;
		},
		setIndex(index, userAction) {
			const that = this;
			index = this.adjustIndex(index) || 0;
			const offset = -index * that.itemHeight;
			if (index !== that.currentIndex) {
				this.offset = offset;
				this.currentIndex = index;
				userAction && this.$emit('change', {'index':index,'dataIndex':this.dataIndex});
			}
		},
		setValue(value) {
			const { options } = this.options;
			for (let i = 0; i < options.length; i++) {
				if (this.getOptionText(options[i]) === value) {
					this.setIndex(i);
				}
			}
			return Promise.resolve();
		},
		getValue() {
			const that = this;
			return that.options[that.currentIndex];
		}
	}
};
</script>

<style>
@import '../common/index.css';
.you-picker-column {
	overflow: hidden;
	text-align: center;
	color: #000;
	color: var(--picker-option-text-color, #000);
	font-size: 16px;
	font-size: var(--picker-option-font-size, 16px);
}
.you-picker-column__item {
	padding: 0 5px;
}
.you-picker-column__item--selected {
	font-weight: 500;
	font-weight: var(--font-weight-bold, 500);
	color: #323233;
	color: var(--picker-option-selected-text-color, #323233);
}
.you-picker-column__item--disabled {
	opacity: 0.3;
	opacity: var(--picker-option-disabled-opacity, 0.3);
}
</style>
