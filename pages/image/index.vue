<template>
	<view>
		<demo-block title="基础用法" padding>
			<you-row><you-image width="100" height="100" :src="src" /></you-row>
		</demo-block>

		<demo-block title="填充模式" padding>
			<you-row gutter="20">
				<you-col v-for="(fit, index) in fits" :key="fit" span="8">
					<you-image :fit="fit" width="100%" height="27vw" :src="src" />
					<view class="text">{{ fit }}</view>
				</you-col>
			</you-row>
		</demo-block>

		<demo-block title="圆形图片" padding>
			<you-row gutter="20">
				<you-col v-for="(fit, index) in fits" :key="fit" span="8">
					<you-image round :fit="fit" width="100%" height="27vw" :src="src" />
					<view class="text">{{ fit }}</view>
				</you-col>
			</you-row>
		</demo-block>

		<demo-block title="加载中提示" padding>
			<you-row gutter="20">
				<you-col span="8">
					<you-image width="100%" height="27vw" />
					<view class="text">默认提示</view>
				</you-col>

				<you-col span="8">
					<you-image width="100%" height="27vw" use-loading-slot>
						<template v-slot:loading>
							<you-loading type="spinner" size="20" vertical />
						</template>
					</you-image>
					<view class="text">自定义提示</view>
				</you-col>
			</you-row>
		</demo-block>

		<demo-block title="加载失败提示" padding>
			<you-row gutter="20">
				<you-col span="8">
					<you-image width="100%" height="27vw" src="x" />
					<view class="text">默认提示</view>
				</you-col>

				<you-col span="8">
					<you-image width="100%" height="27vw" src="x" use-error-slot>
						<template v-slot:error>
							<text>加载失败</text>
						</template>
					</you-image>
					<view class="text">自定义提示</view>
				</you-col>
			</you-row>
		</demo-block>
	</view>
</template>

<script>
import demoBlock from '@/components/demo-block/index.vue';
import youRow from '@/components/row/index.vue';
import youCol from '@/components/col/index.vue';
import youImage from '@/components/image/index.vue';
import youLoading from '@/components/loading/index.vue';

export default {
	components: {
		demoBlock,
		youRow,
		youCol,
		youImage,
		youLoading
	},
	data() {
		return {
			fits: ['contain', 'cover', 'fill', 'none', 'scale-down'],
			src: 'https://img.yzcdn.cn/vant/cat.jpeg'
		}
	}
};
</script>

<style>
page {
	background-color: #fff;
}

.text {
	width: 100%;
	margin-top: 5px;
	color: #7d7e80;
	font-size: 14px;
	text-align: center;
}
</style>
