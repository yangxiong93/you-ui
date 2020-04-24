<template>
	<view :class="[customClass, tab__pane]" :style="shouldShow ? '' : 'display: none;'"><slot v-if="shouldRender" /></view>
</template>

<script>
import utils from '../wxs/utils.js';
import { basic } from '../mixins/basic.js';

export default {
	props: {
		dot: Boolean,
		info: null,
		title: String,
		disabled: Boolean,
		titleStyle: String,
		name: {
			type: [Number, String],
			default: ''
		}
	},
	data() {
		return {
			active: false
		};
	},
	mixins: [basic()],
	computed: {
		tab__pane: function() {
			let { active } = this;
			return utils.bem('tab__pane', { active, inactive: !active });
		}
	},
	watch: {
		title(val) {
			this.update();
		},
		disabled(val) {
			this.update();
		},
		dot(val) {
			this.update();
		},
		info(val) {
			this.update();
		},
		titleStyle(val) {
			this.update();
		}
	},
	methods: {
		getComputedName() {
			if (this.name !== '') {
				return this.name;
			}
			return this.index;
		},
		updateRender(active, parent) {
			const { data: parentData } = parent;
			this.inited = this.inited || active;
			this.setData({
				active,
				shouldRender: this.inited || !parentData.lazyRender,
				shouldShow: active || parentData.animated
			});
		},
		update() {
			if (this.$parent) {
				this.$parent.updateTabs();
			}
		}
	}
};
</script>

<style>
@import '../common/index.css';
:host {
	-webkit-flex-shrink: 0;
	flex-shrink: 0;
	width: 100%;
}
.you-tab__pane,
:host {
	box-sizing: border-box;
}
.you-tab__pane {
	overflow-y: auto;
}
.you-tab__pane--active {
	height: auto;
}
.you-tab__pane--inactive {
	height: 0;
	overflow: visible;
}
</style>
