<template>
	<you-overlay v-if="overlay" :show="show" :z-index="zIndex" :custom-style="overlayStyle" :duration="duration" @click="onClickOverlay">
		<view
			v-if="inited"
			:class="[customClass,classes, popup]"
			:style="'z-index:' + zIndex + ';transition-duration:' + currentDuration + 'ms;display:' + display + ';' + customStyle"
			@tap.stop="onTap"
		>
			<slot />
			<you-icon
				v-if="closeable"
				:name="closeIcon"
				class="close-icon-class you-popup__close-icon"
				:class="['you-popup__close-icon--' + closeIconPosition]"
				@tap="onClickCloseIcon"
			/>
		</view>
	</you-overlay>
</template>

<script>
import youOverlay from '@/components/overlay/index.vue';
import youIcon from '@/components/icon/index.vue';
import { transition } from '../mixins/transition';
import {basic} from '../mixins/basic.js';
import utils from '../wxs/utils.js'
export default {
	name: 'youPopup',
	components: {
		youOverlay,
		youIcon
	},
	mixins: [transition(false),basic()],
	props: {
		round: {
			//是否显示圆角
			type: Boolean,
			default: false
		},
		closeable: {
			//是否显示关闭图标
			type: Boolean,
			default: false
		},
		customStyle: {
			//自定义弹出层样式
			type: String,
			default: ''
		},
		overlayStyle: {
			//自定义遮罩层样式
			type: String,
			default: ''
		},
		transition: {
			type: String,
			observer: 'observeClass'
		},
		zIndex: {
			type: Number,
			default: 100
		},
		overlay: {
			type: Boolean,
			default: true
		},
		closeIcon: {
			type: String,
			default: 'cross'
		},
		closeIconPosition: {
			type: String,
			default: 'top-right'
		},
		closeOnClickOverlay: {
			type: Boolean,
			default: true
		},
		position: {
			type: String,
			default: 'center',
			observer: 'observeClass'
		},
		safeAreaInsetBottom: {
			type: Boolean,
			default: true
		},
		safeAreaInsetTop: {
			type: Boolean,
			default: false
		},
		customClass: String
	},
	computed: {
		popup: function() {
			let position = this.position;
			let round = this.round;
			let safeAreaInsetBottom = this.safeAreaInsetBottom;
			let safeAreaInsetTop = this.safeAreaInsetTop;
			let popup = utils.bem('popup', [position, { round, safe: safeAreaInsetBottom, safeTop: safeAreaInsetTop }]);
			return popup;
		}
	},
	methods: {
		onClickCloseIcon() {
			this.$emit('close');
		},
		onClickOverlay() {
			this.$emit('click-overlay');
			if (this.closeOnClickOverlay) {
				this.$emit('close');
			}
		},
		onTap(){},
	}
};
</script>

<style>
@import './index.css';
@import '../transition/index.css';
</style>
