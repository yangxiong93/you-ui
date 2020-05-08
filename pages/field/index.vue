<template>
	<view>
		<demo-block title="基础用法">
			<you-cell-group><you-field :value="value" placeholder="请输入用户名" :border="false" clearable /></you-cell-group>
		</demo-block>

		<demo-block title="自定义类型">
			<you-cell-group>
				<you-field
					:value="username"
					label="用户名"
					placeholder="请输入用户名"
					clearable
					right-icon="question-o"
					right-icon-class="custom-icon"
					required
					@click-icon="onClickIcon"
				/>
				<you-field :value="password" type="password" label="密码" placeholder="请输入密码" required :border="false" />
			</you-cell-group>
		</demo-block>

		<demo-block title="禁用输入框">
			<you-cell-group><you-field value="输入框已禁用" label="用户名" left-icon="contact" disabled :border="false" /></you-cell-group>
		</demo-block>

		<demo-block title="错误提示">
			<you-cell-group>
				<you-field :value="username2" label="用户名" placeholder="请输入用户名" error />
				<you-field :value="phone" label="手机号" placeholder="请输入手机号" error-message="手机号格式错误" :border="false" />
			</you-cell-group>
		</demo-block>

		<demo-block title="内容对齐方式">
			<you-cell-group><you-field :value="username3" label="用户名" placeholder="请输入用户名" input-align="right" /></you-cell-group>
		</demo-block>

		<demo-block title="高度自适应">
			<you-cell-group><you-field :value="message" label="留言" type="textarea" placeholder="请输入留言" rows="1" autosize :border="false" /></you-cell-group>
		</demo-block>

		<demo-block title="插入按钮">
			<you-cell-group>
				<you-field :value="sms" center clearable label="短信验证码" placeholder="请输入短信验证码" use-button-slot :border="false">
					<you-button slot="button" size="small" type="primary" custom-class="button">发送验证码</you-button>
				</you-field>
			</you-cell-group>
		</demo-block>
	</view>
</template>

<script>
	import demoBlock from '@/components/demo-block/index.vue';
	import youCellGroup from '@/components/cell-group/index.vue';
	import youField from '@/components/field/index.vue';
	import youButton from '@/components/button/index.vue';
	
export default {
	components: {
		demoBlock,
		youCellGroup,
		youField,
		youButton
	},
	data() {
		return {
			sms: '',
			value: '',
			password: '',
			username: '',
			username2: '',
			username3: '',
			message: '',
			phone: '1365577'
		};
	},
	methods: {
		onClickIcon() {
			uni.showToast({
				icon: 'none',
				title: '点击图标'
			});
		}
	}
};
</script>

<style>
	.button {
	  vertical-align: middle;
	}
	
	.custom-icon {
	  color: #1989fa;
	}
	
</style>
