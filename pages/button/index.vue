<template>
	<view class="">
		<demo-block title="按钮类型" padding>
			<view class="row">
				<you-button class="demo-margin-right">默认按钮</you-button>
				<you-button type="primary" class="demo-margin-right">主要按钮</you-button>
				<you-button type="info" class="demo-margin-right">信息按钮</you-button>
			</view>
			<you-button type="danger" class="demo-margin-right">危险按钮</you-button>
			<you-button type="warning">警告按钮</you-button>
		</demo-block>

		<demo-block title="朴素按钮" padding>
			<you-button type="primary" plain class="demo-margin-right">朴素按钮</you-button>
			<you-button type="info" plain>朴素按钮</you-button>
		</demo-block>

		<demo-block title="细边框" padding>
			<you-button type="primary" plain hairline class="demo-margin-right">细边框按钮</you-button>
			<you-button type="info" plain hairline>细边框按钮</you-button>
		</demo-block>

		<demo-block title="禁用状态" padding>
			<you-button type="primary" disabled class="demo-margin-right">禁用状态</you-button>
			<you-button type="info" disabled>禁用状态</you-button>
		</demo-block>

		<demo-block title="加载状态" padding>
			<you-button loading type="primary" class="demo-margin-right" />
			<you-button loading type="primary" loading-type="spinner" class="demo-margin-right" />
			<you-button loading type="info" loading-text="加载中..." />
		</demo-block>

		<demo-block title="按钮形状" padding>
			<you-button type="primary" square class="demo-margin-right">方形按钮</you-button>
			<you-button type="info" round>圆形按钮</you-button>
		</demo-block>

		<demo-block title="图标按钮" padding>
			<you-button type="primary" icon="star-o" class="demo-margin-right" />
			<you-button type="primary" icon="star-o" class="demo-margin-right">按钮</you-button>
			<you-button plain type="primary" icon="https://img.yzcdn.cn/vant/logo.png">按钮</you-button>
		</demo-block>

		<demo-block title="按钮尺寸" padding>
			<you-button type="primary" size="large" block custom-class="demo-margin-bottom">大号按钮</you-button>
			<you-button type="primary" class="demo-margin-right">普通按钮</you-button>
			<you-button type="primary" size="small" class="demo-margin-right">小型按钮</you-button>
			<you-button type="primary" size="mini">迷你按钮</you-button>
		</demo-block>

		<demo-block title="自定义颜色" padding>
			<you-button color="#7232dd" class="demo-margin-right">单色按钮</you-button>
			<you-button color="#7232dd" class="demo-margin-right" plain>单色按钮</you-button>
			<you-button color="linear-gradient(to right, #4bb0ff, #6149f6)">渐变色按钮</you-button>
		</demo-block>
	</view>
</template>

<script>
import demoBlock from '@/components/demo-block/index.vue';
import youButton from '@/components/button/index.vue';
export default {
	components: {
		demoBlock,
		youButton
	}
};
</script>

<style>
.row {
	height: 44px;
	margin-bottom: 15px;
}
</style>
