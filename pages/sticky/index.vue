<template>
	<view class="">
		<demo-block title="基础用法">
			<you-sticky><you-button type="primary" custom-style="margin-left: 15px">基础用法</you-button></you-sticky>
		</demo-block>

		<demo-block title="吸顶距离">
			<you-sticky :offset-top="50"><you-button type="info" custom-style="margin-left: 115px">吸顶距离</you-button></you-sticky>
		</demo-block>

		<demo-block title="指定容器">
			<view id="container" style="height: 150px; background-color: #fff;">
				<you-sticky :container="true"><you-button type="warning" custom-style="margin-left: 215px;">指定容器</you-button></you-sticky>
			</view>
		</demo-block>
	</view>
</template>

<script>
import demoBlock from '@/components/demo-block/index.vue';
import youSticky from '@/components/sticky/index.vue';
import youButton from '@/components/button/index.vue';
export default {
	components: {
		demoBlock,
		youSticky,
		youButton
	}
};
</script>

<style>
page {
	height: 200vh;
}

.you-button {
	margin-left: 16px;
}

.sticky-container {
	position: relative;
	z-index: -1;
	height: 150px;
	background-color: #fff;
}
</style>
