<template>
	<view class="you-cell" :class="[customClass,cellStyle]" :hover-class="'you-cell--hover ' + hoverClass" :style="customStyle" hover-stay-time="70" @click="onClick">
		<you-icon
		    v-if="icon"
		    :name="icon"
		    class="you-cell__left-icon-wrap"
		    custom-class="you-cell__left-icon"
		  />
		<slot v-else name="icon"></slot>
		
		<view class="you-cell__title" :class="titleClass" :style="titleWidth ? 'max-width:' + titleWidth + ';min-width:' + titleWidth : ''">
			<template v-if="title">
				{{ title }}
			</template>
			<slot v-else name="title" />

			<view v-if="label || useLabelSlot" class="you-cell__label" :class="labelClass">
				<slot v-if="useLabelSlot" name="label" />
				<template v-elif="label">{{ label }}</template>
			</view>
		</view>

		<view class="you-cell__value" :class="valueClass">
			<template v-if="value || value === 0">{{ value }}</template>
			<slot v-else name="value"/>
		</view>

		<you-icon
			v-if="isLink"
			:name="arrowDirection ? 'arrow' + '-' + arrowDirection : 'arrow'"
			class="you-cell__right-icon-wrap"
			:custom-class="rightIconClass"
		 />
		<slot v-else name="right-icon" />

		<slot/>
	</view>
</template>

<script>
import youIcon from '../icon/index.vue';
import utils from '../wxs/utils.js'

export default {
	name: 'youCell',
	components: {
		youIcon
	},
	props: {
		icon: {
			// 缩略图
			type: String,
			default: null
		},
		title: {
			// 列表标题
			type: String,
			default: ''
		}, 
		titleWidth: {
			//标题宽度，须包含单位
			type: String,
			default: null
		},
		value: {
			// 列表右侧内容
			type: String,
			default: ''
		},
		isLink: {
			// 是否链接
			type: Boolean,
			default: false
		},
		linkType: {
			//链接跳转类型
			type: String,
			default: 'navigateTo'
		},
		arrowDirection: {
			//箭头方向，可选值为 left up down
			type: String,
			default: ''
		},
		url: {
			//链接跳转地址
			type: String,
			default: ''
		},
		label: {
			//标题下方的描述信息
			type: String,
			default: ''
		},
		useLabelSlot: {
			//是否使用 label slot
			type: Boolean,
			default: false
		},
		center: {
			//是否使内容垂直居中
			type: Boolean,
			default: false
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
		customClass: {
			//根结点样式名
			type: String,
			default: ''
		},
		dataName: [String,Number],
		dataIndex: Number,
		titleClass: String,
		labelClass: String,
		valueClass: String,
		hoverClass: String,
		rightIconClass: String,
	},
	computed: {
		cellStyle: function() {
			let center = this.center;
			let required = this.required;
			let border = this.border;
			let isLink = this.isLink;
			let clickable = this.clickable;
			let size = this.size;
			let cellStyle = utils.bem('cell', [size, { center, required, borderless: !border, clickable: isLink || clickable }]);
			return cellStyle
		}
	},
	methods: {
		onClick(e) {
			if(this.isLink && this.url){
				switch (this.linkType){
					case 'redirectTo': uni.redirectTo({
						url: this.url
					})
						break;
					case 'switchTab': uni.switchTab({
						url: this.url
					})
						break;
					case 'reLaunch': uni.reLaunch({
						url: this.url
					})
						break;
					default: uni.navigateTo({
						url: this.url
					})
						break;
				}
			}
			this.$emit('click',this.dataIndex!==undefined?this.dataIndex:this.dataName); 
		},
		onSwitchChange(e) {
			this.$emit('switchChange', e.detail);
		}
	}
};
</script>

<style>
@import './index.css';
</style>

