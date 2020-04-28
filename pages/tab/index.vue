<template>
	<view>
		<demo-block title="基础用法">
			<you-tabs :active="active" @change="onChange">
				<you-tab v-for="(item,index) in tabs4" :key="index" :title="'标签 ' + item">
					<view class="content">{{ '内容' + item }}</view>
				</you-tab>
			</you-tabs>
		</demo-block>

		<!-- <demo-block title="通过名称匹配">
			<you-tabs active="b">
				<you-tab v-for="(item,index) in tabsWithName" :key="index" :name="item.name" :title="'标签 ' + item.index">
					<view class="content">{{ '内容' + item.index }}</view>
				</you-tab>
			</you-tabs>
		</demo-block>

		<demo-block title="横向滚动">
			<you-tabs>
				<you-tab v-for="(item,index) in tabs6" :key="index" :title="'标签 ' + item">
					<view class="content">{{ '内容' + item }}</view>
				</you-tab>
			</you-tabs>
		</demo-block>

		<demo-block title="禁用标签">
			<you-tabs :disabled="onClickDisabled">
				<you-tab v-for="(item,index) in tabs3" :key="index" :disabled="index === 1" :title="'标签 ' + item">
					<view class="content">{{ '内容' + item }}</view>
				</you-tab>
			</you-tabs>
		</demo-block>

		<demo-block title="样式风格">
			<you-tabs type="card" tab-class="special-tab">
				<you-tab v-for="(item,index) in tabs3" :key="index" :title="'标签 ' + item">
					<view class="content-2">{{ '内容' + item }}</view>
				</you-tab>
			</you-tabs>
		</demo-block>

		<demo-block title="点击事件">
			<you-tabs bind:click="onClick">
				<you-tab v-for="(item,index) in tabs2" :key="index" :title="'标签 ' + item">
					<view class="content">{{ '内容' + item }}</view>
				</you-tab>
			</you-tabs>
		</demo-block>

		<demo-block title="粘性布局">
			<you-tabs sticky>
				<you-tab v-for="(item,index) in tabs4" :key="index" :title="'标签 ' + item">
					<view class="content">{{ '内容' + item }}</view>
				</you-tab>
			</you-tabs>
		</demo-block>

		<demo-block title="切换动画">
			<you-tabs animated>
				<you-tab v-for="(item,index) in tabs4" :key="index" :title="'标签 ' + item">
					<view class="content">{{ '内容' + item }}</view>
				</you-tab>
			</you-tabs>
		</demo-block>

		<demo-block title="滑动切换">
			<you-tabs swipeable>
				<you-tab v-for="(item,index) in tabs4" :key="index" :title="'标签 ' + item">
					<view class="content">{{ '内容' + item }}</view>
				</you-tab>
			</you-tabs>
		</demo-block> -->

		<demo-block title="自定义标题">
			<you-tabs active="1" :change="onChange" tab-class="special-tab" tab-active-class="special-tab-active">
				<template v-slot:nav-right>
					<you-icon name="search" custom-class="right-nav" :click="onClickNavRight" />
				</template>
				<you-tab v-for="(item,index) in tabs4" :key="index" :title="'标签 ' + item" :dot="index === 1" :info="index === 2 ? 99 : null" >
					<view class="content">{{ '内容' + item }}</view>
				</you-tab>
			</you-tabs>
		</demo-block>
	</view>
</template>

<script>
import demoBlock from '@/components/demo-block/index.vue';
import youTabs from '@/components/tabs/index.vue';
import youTab from '@/components/tab/index.vue';
import youIcon from '@/components/icon/index.vue';

export default {
	components: {
		demoBlock,
		youTabs,
		youTab,
		youIcon
	},
	data() {
		return {
			active: 1,
			tabs2: [1, 2],
			tabs3: [1, 2, 3],
			tabs4: [1, 2, 3, 4],
			tabs6: [1, 2, 3, 4, 5, 6],
			tabsWithName: [{ name: 'a', index: 1 }, { name: 'b', index: 2 }, { name: 'c', index: 3 }]
		};
	},
	methods: {
		onClickDisabled(event) {
			uni.showToast({
				title: `标签 ${event.index + 1} 已被禁用`,
				icon: 'none'
			});
		},

		onChange(event) {
			console.log(event)
			uni.showToast({
				title: `切换到标签 ${event.index + 1}`,
				icon: 'none'
			});
		},

		onClickNavRight() {
			uni.showToast({
				title: '点击 right nav',
				icon: 'none'
			});
		},

		onClick(event) {
			uni.showToast({
				title: `点击标签 ${event.index + 1}`,
				icon: 'none'
			});
		}
	}
};
</script>

<style>
page {
	padding-bottom: 300px;
}

.content {
	padding: 20px;
	background-color: #fff;
}

.content-2 {
	padding: 20px;
}

.right-nav {
	padding: 0 10px;
	line-height: 44px !important;
	background-color: #fff;
}

.special-tab {
	transition: all 0.25s ease-in-out;
}

.special-tab-active {
	font-size: 1.05em !important;
}
</style>
