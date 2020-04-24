<template>
	<view class="">
		<demo-block title="基础用法">
			<you-cell-group>
				<you-cell title="单元格" value="内容" />
				<you-cell title="单元格" value="内容" label="描述信息" :border="false" />
			</you-cell-group>
		</demo-block>

		<demo-block title="单元格大小">
			<you-cell-group>
				<you-cell title="单元格" value="内容" size="large" />
				<you-cell title="单元格" value="内容" size="large" use-label-slot :border="false"><view slot="label">描述信息</view></you-cell>
			</you-cell-group>
		</demo-block>

		<demo-block title="展示图标"><you-cell title="单元格" value="内容" icon="location-o" :border="false" /></demo-block>

		<demo-block title="展示箭头">
			<you-cell title="单元格" is-link />
			<you-cell title="单元格" value="内容" is-link />
			<you-cell title="单元格" is-link arrow-direction="down" value="内容" :border="false" />
		</demo-block>

		<demo-block title="页面跳转">
			<you-cell title="单元格" is-link url="/pages/index/index" />
			<you-cell title="单元格" is-link url="/pages/index/index" link-type="redirectTo" />
		</demo-block>

		<demo-block title="分组标题">
			<you-cell-group title="分组 1"><you-cell title="单元格" value="内容" /></you-cell-group>
			<you-cell-group title="分组 2"><you-cell title="单元格" value="内容" /></you-cell-group>
		</demo-block>

		<demo-block title="使用插槽">
			<you-cell value="内容" icon="shop-o" is-link>
				<template v-slot:title>
					<view class="title">单元格</view>
					<you-tag type="danger">标签</you-tag>
				</template>
			</you-cell>
			<you-cell title="单元格" :border="false">
				<template v-slot:right-icon>
					<you-icon name="search" />
				</template>
			</you-cell>
		</demo-block>
	</view>
</template>

<script>
	import demoBlock from '@/components/demo-block/index.vue';
	import youCellGroup from '@/components/cell-group/index.vue';
	import youCell from '@/components/cell/index.vue';
	import youIcon from '@/components/icon/index.vue';
	import youTag from '@/components/tag/index.vue';
	
	export default {
		components: {
			demoBlock,
			youCellGroup,
			youCell,
			youIcon,
			youTag
		}
	}
</script>

<style>
	.title {
	  margin-right: 5px;
	  display: inline-block;
	  vertical-align: middle;
	}
</style>
