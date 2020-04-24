<template>
	<view class="demo-block you-clearfix" :class="[customClass,padding ? 'demo-block--padding' : '']">
	  <view v-if="title" class="demo-block__title">{{ title }}</view>
	  <slot />
	</view>
</template>

<script>
export default {
	name: 'demoBlock',
	props: {
		title: String,
		padding: Boolean,
		customClass: String
	}
}
</script>

<style>
	@import '../common/index.css';
	.demo-block__title {
	  margin: 0;
	  font-weight: 400;
	  font-size: 14px;
	  color: rgba(69,90,100,.6);
	  padding: 20px 15px 15px;
	}
	
	.demo-block--padding {
	  padding: 0 15px;
	}
	
	.demo-block--padding .demo-block__title {
	  padding-left: 0;
	}
</style>
