<template>
	<view :class="[customClass, tab__pane]" :style="shouldShow ? '' : 'display: none;'"><slot v-if="shouldRender" /></view>
</template>

<script>
import utils from '../wxs/utils.js';
import { basic } from '../mixins/basic.js';

function shiftArr(arr){
		let newArr = arr.filter((item,index)=>{
			return index !== 0;
		})
		return newArr;
	}
	
export default {
	props: {
		customClass: String,
		dot: Boolean,
		info: [String,Number],
		title: String,
		disabled: Boolean,
		titleStyle: String,
		name: {
			type: [Number, String],
			default: ''
		}
	},
	inject: ['tabs_parent'],
	data() {
		return {
			active: false,
			shouldShow: true,
			shouldRender: true
		}
	},
	mixins: [basic()],
	computed: {
		tab__pane: function() {
			let { active } = this;
			return utils.bem('tab__pane', { active, inactive: !active });
		},
		index: function() {
			let children,index;
			// #ifdef MP
			children = shiftArr(this.tabs_parent.$children);
			index = children.findIndex(item => {
				return item.title === this.title;
			})
			// #endif
			// #ifndef MP
			index = this.tabs_parent.tabs.findIndex(item => {
				return item.title === this.title;
			})
			// #endif
			return index;
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
			console.log(this.index)
			return this.index;
		},
		updateRender(active, parent) {
			const parentData = parent;
			this.inited = this.inited || active;
			this.setData({
				active,
				shouldRender: this.inited || !parentData.lazyRender,
				shouldShow: active || parentData.animated
			});
		},
		update() {
			if (this.tabs_parent) {
				this.tabs_parent.updateTabs();
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
