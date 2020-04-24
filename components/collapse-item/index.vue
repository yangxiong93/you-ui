<template>
	<view class="you-collapse-item" :class="[customClass, index !== 0 ? 'van-hairline--top' : '']">
		<you-cell
			:title="title"
			:title-class="titleClass"
			:icon="icon"
			:value="value"
			:label="label"
			:is-link="isLink"
			:clickable="clickable"
			:border="border && expanded"
			:class="collapseItemTitle"
			right-icon-class="you-cell__right-icon"
			custom-class="you-cell"
			hover-class="you-cell--hover"
			@click="onClick"
		>	
			<template v-slot:title>
				<slot name="title"/>
			</template>
			<template v-slot:icon>
				<slot name="icon"/>
			</template>
			<slot name="value" />
			<template v-slot:right-icon>
				<slot name="right-icon" />
			</template>
		</you-cell>
		<view :class="collapseItemWrapper" :style="'height:' + contentHeight" @transitionend="onTransitionEnd">
			<view class="you-collapse-item__content" :class="contentClass"><slot /></view>
		</view>
	</view>
</template>

<script>
import utils from '../wxs/utils.js';
import { basic } from '../mixins/basic.js';
import youCell from '@/components/cell/index.vue';

const nextTick = () => new Promise(resolve => setTimeout(resolve, 20));
export default {
	name: 'youCollapseItem',
	components: {
		youCell
	},
	mixins: [basic()],
	props: {
		name: null,
		title: null,
		value: null,
		icon: String,
		label: String,
		disabled: Boolean,
		clickable: Boolean,
		border: {
			type: Boolean,
			default: true
		},
		isLink: {
			type: Boolean,
			default: true
		},
		titleClass: String,
		contentClass: String,
		customClass: String
	},
	data() {
		return {
			contentHeight: 0,
			expanded: false,
			transition: false,
			index: 0
		};
	},
	inject: ['collapse_parent'],
	computed: {
		collapseItemTitle: function() {
			let disabled = this.disabled;
			let expanded = this.expanded;
			return utils.bem('collapse-item__title', { disabled, expanded });
		},
		collapseItemWrapper: function() {
			let transition = this.transition;
			return utils.bem('collapse-item__wrapper', { transition });
		}
	},
	mounted() {
		this.updateExpanded()
			.then(nextTick)
			.then(() => {
				const data = { transition: true };
				if (this.expanded) {
					data.contentHeight = 'auto';
				}
				this.setData(data);
			});
	},
	methods: {
		updateExpanded() {
			if (!this.collapse_parent) {
				return Promise.resolve();
			}
			const { value, accordion } = this.collapse_parent;
			const children = this.collapse_parent.$children;
			const { name } = this;
			const index = children.indexOf(this);
			const currentName = name == null ? index : name;
			const expanded = accordion ? value === currentName : (value || []).some(name => name === currentName);
			const stack = [];
			if (expanded !== this.expanded) {
				stack.push(this.updateStyle(expanded));
			}
			stack.push(this.set({ index, expanded }));
			return Promise.all(stack);
		},
		updateStyle(expanded) {
			return this.getRect('.you-collapse-item__content')
				.then(rect => rect.height)
				.then(height => {
					if (expanded) {
						return this.set({
							contentHeight: height ? `${height}px` : 'auto'
						});
					}
					return this.set({ contentHeight: `${height}px` })
						.then(nextTick)
						.then(() => this.set({ contentHeight: 0 }));
				});
		},
		onClick() {
			if (this.disabled) {
				return;
			}
			const { name, expanded } = this;
			const index = this.collapse_parent.$children.indexOf(this);
			const currentName = name == null ? index : name;
			this.collapse_parent.switch(currentName, !expanded);
		},
		onTransitionEnd() {
			if (this.expanded) {
				this.setData({
					contentHeight: 'auto'
				});
			}
		}
	}
};
</script>

<style>
@import './index.css';
</style>
