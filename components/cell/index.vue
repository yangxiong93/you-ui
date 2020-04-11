<template>
	<view class="you-cell" :class="[customClass,cellStyle]" hover-class="you-cell--hover hover-class" :style="customStyle" hover-stay-time="70" @click="onClick">
		<you-icon
		    v-if="icon"
		    :name="icon"
		    class="you-cell__left-icon-wrap"
		    custom-class="you-cell__left-icon"
		  />
		<slot v-else name="icon"></slot>
		
		<view :style="titleWidth ? 'max-width:' + titleWidth + ';min-width:' + titleWidth : ''" class="you-cell__title title-class">
			<template v-if="title">
				{{ title }}
			</template>
			<slot v-else name="title" />

			<view v-if="label || useLabelSlot" class="you-cell__label label-class">
				<slot v-if="useLabelSlot" name="label" />
				<template v-elif="label">{{ label }}</template>
			</view>
		</view>

		<view class="you-cell__value value-class">
			<template v-if="value || value === 0">{{ value }}</template>
			<slot v-else name="value"/>
		</view>

		<you-icons 
			v-if="isLink"
			:name="arrowDirection ? 'arrow' + '-' + arrowDirection : 'arrow'"
			class="you-cell__right-icon-wrap right-icon-class"
			custom-class="you-cell__right-icon"
		 />
		<slot v-else name="right-icon" />

		<slot/>
	</view>
</template>

<script>
import youIcon from '../icon/index.vue';
import utils from '../wxs/utils.js'
/**
 * ListItem 列表子组件
 * @description 列表子组件
 * @tutorial https://ext.dcloud.net.cn/plugin?id=24
 * @property {String} title 标题
 * @property {String} note 描述
 * @property {String} icon 左侧缩略图
 * @property {String} badgeText 数字角标内容
 * @property {String} badgeType 数字角标类型，参考[uni-icons](https://ext.dcloud.net.cn/plugin?id=21)
 * @property {String} rightText 右侧文字内容
 * @property {Boolean} disabled = [true|false]是否禁用
 * @property {Boolean} showArrow = [true|false] 是否显示箭头图标
 * @property {Boolean} showBadge = [true|false] 是否显示数字角标
 * @property {Boolean} showSwitch = [true|false] 是否显示Switch
 * @property {Boolean} switchChecked = [true|false] Switch是否被选中
 * @property {Boolean} showExtraIcon = [true|false] 左侧是否显示扩展图标
 * @property {Boolean} scrollY = [true|false] 允许纵向滚动，需要显式的设置其宽高
 * @property {Object} extraIcon 扩展图标参数，格式为 {color: '#4cd964',size: '22',type: 'spinner'}
 * @event {Function} click 点击 uniListItem 触发事件
 * @event {Function} switchChange 点击切换 Switch 时触发
 */
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
			default: 'right'
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
			default: 'large'
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
			if(this.isLink){
				switch (this.linkType){
					case 'navigateTo': uni.navigateTo({
						url: this.url
					})
						break;
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
					default:
						break;
				}
			}else{
				this.$emit('click',this.dataIndex || this.dataName); 
			}
		},
		onSwitchChange(e) {
			this.$emit('switchChange', e.detail);
		}
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
