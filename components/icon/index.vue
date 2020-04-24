<template>
	<view
		:class="[customClass,classPrefix, isImageName ? 'you-icon--image' : classPrefix + '-' + name]"
		:style="'color:' + color + ';font-size:' + compSize + ';' + customStyle"
		@tap="onClick"
		@touchstart="onTouchstart"
	>
		<you-info v-if="info !== null || dot" :dot="dot" :info="info" custom-class="you-icon__info" />
		<image v-if="isImageName" :src="name" mode="aspectFit" class="you-icon__image" />
	</view>
</template>

<script>
import utils from '../wxs/utils.js';
import youInfo from '../info/index.vue';
export default {
	name: 'youIcon',
	comments: {
		youInfo
	},
	props: {
		classPrefix: {
			//类名前缀
			type: String,
			default: 'you-icon'
		},
		name: {
			//图标名称或图片链接
			type: String,
			default: ''
		},
		color: {
			//图标颜色
			type: String,
			default: '',
		},
		info: {
			//图标右上角文字提示
			type: [String,Number],
			default: null
		},
		dot: {
			//是否显示图标右上角小红点
			type: Boolean,
			default: false
		},
		customStyle: {
			//自定义样式
			type: String,
			default: ''
		},
		size: {
			//图标大小，如 20px，2em，默认单位为px
			type: [String,Number],
			default: ''
		},
		customClass: {
			//自定义样式名
			type: String,
			default: ''
		}
	},
	computed: {
		isImageName: function(){
			return this.name.search('/') + 1 ? true : false;
		},
		compSize: function() {
			let compSize = utils.addUnit(this.size);
			return compSize;
		}
	},
	methods:{
		onClick(){
			this.$emit('click')
		},
		onTouchstart(){
			this.$emit('touchstart')
		}
	}
};
</script>

<style>
@import './index.css';
</style>
