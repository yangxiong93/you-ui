<template>
	<view class="">
		<view v-if="title" class="you-cell-group__title">{{ title }}</view>
		<view class="custom-class you-cell-group" :class="border ? 'you-hairline--top-bottom' : ''"><slot /></view>
	</view>
</template>

<script>
export default {
	name: 'youCellGroup',
	data() {
		return {}
	},
	props: {
		title: {
			// 列表标题
			type: String,
			default: ''
		},
		border: {
			type: Boolean,
			default: true
		}
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
