<template>
	<view class="">
		<demo-block title="基础用法" padding>
			<you-row>
				<you-col span="8" custom-class="dark">span: 8</you-col>
				<you-col span="8" custom-class="light">span: 8</you-col>
				<you-col span="8" custom-class="dark">span: 8</you-col>
			</you-row>

			<you-row>
				<you-col span="4" custom-class="dark">span: 4</you-col>
				<you-col span="10" offset="4" custom-class="light">offset: 4, span: 10</you-col>
			</you-row>

			<you-row><you-col offset="12" span="12" custom-class="dark">offset: 12, span: 12</you-col></you-row>
		</demo-block>

		<demo-block title="在列元素之间增加间距" padding>
			<you-row gutter="20">
				<you-col span="8" custom-class="dark">span: 8</you-col>
				<you-col span="8" custom-class="light">span: 8</you-col>
				<you-col span="8" custom-class="dark">span: 8</you-col>
			</you-row>
		</demo-block>
	</view>
</template>

<script>
import demoBlock from '@/components/demo-block/index.vue';
import youRow from '@/components/row/index.vue';
import youCol from '@/components/col/index.vue';
export default {
	components: {
		demoBlock,
		youRow,
		youCol
	}
};
</script>

<style>
.dark,
.light {
	color: #fff;
	font-size: 13px;
	line-height: 30px;
	text-align: center;
	margin-bottom: 10px;
	background-clip: content-box;
}

.dark {
	background-color: #39a9ed;
}

.light {
	background-color: #66c6f2;
}
</style>
