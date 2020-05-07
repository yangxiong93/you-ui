<template>
	<view>
		<demo-block title="基本用法" >
				<you-checkbox custom-class="demo-checkbox" :value="checkbox1" @change="onChange1">复选框</you-checkbox> 
		</demo-block>

		<demo-block title="禁用状态">
			<you-checkbox disabled :value="false" custom-class="demo-checkbox">复选框</you-checkbox>
			<you-checkbox disabled :value="true" custom-class="demo-checkbox">复选框</you-checkbox>
		</demo-block>

		<demo-block title="自定义形状">
			<you-checkbox :value="checkboxShape" shape="square" custom-class="demo-checkbox" @change="onChangeShape">复选框</you-checkbox>
		</demo-block>

		<demo-block title="自定义颜色">
			<you-checkbox :value="checkbox2" checked-color="#07c160" custom-class="demo-checkbox" @change="onChange2">复选框</you-checkbox>
		</demo-block>

		<demo-block title="自定义图标">
			<you-checkbox use-icon-slot :value="checkbox3" custom-class="demo-checkbox" @change="onChange3">
				自定义图标
				<image slot="icon" class="icon" mode="widthFix" :src="checkbox3 ? activeIcon : inactiveIcon" />
			</you-checkbox>
		</demo-block>

		<demo-block title="复选框组">
			<you-checkbox-group :value="result" @change="onChange4">
				<you-checkbox v-for="(item,index) in list" :key="index" :name="item" custom-class="demo-checkbox">复选框 {{ item }}</you-checkbox>
			</you-checkbox-group>
		</demo-block>

		<demo-block title="设置最大可选数">
			<you-checkbox-group :value="result2" :max="2" @change="onChange5">
				<you-checkbox v-for="(item,index) in list" :key="index" :name="item" custom-class="demo-checkbox">复选框 {{ item }}</you-checkbox>
			</you-checkbox-group>
		</demo-block>

		<demo-block title="搭配单元格组件使用">
			<you-checkbox-group :value="result3" @change="onChange6">
				<you-cell-group>
					<you-cell v-for="(item,index) in list" :key="index" :title="'复选框' + item" value-class="value-class" clickable :dataIndex="index" @click="toggle">
						<you-checkbox catch:tap="noop" :class="'checkboxes-'+index" :name="item" />
					</you-cell>
				</you-cell-group>
			</you-checkbox-group>
		</demo-block>
	</view>
</template>

<script>
	import demoBlock from '@/components/demo-block/index.vue';
	import youCheckboxGroup from '@/components/checkbox-group/index.vue';
	import youCheckbox from '@/components/checkbox/index.vue';
	import youCellGroup from '@/components/cell-group/index.vue';
	import youCell from '@/components/cell/index.vue';
	
export default {
	components: {
		demoBlock,
		youCheckboxGroup,
		youCheckbox,
		youCellGroup,
		youCell
	},
	data() {
		return {
			checkbox1: true,
			checkbox2: true,
			checkbox3: true,
			checkboxShape: true,
			list: ['a', 'b', 'c'],
			result: ['a', 'b'],
			result2: [],
			result3: [],
			activeIcon: 'https://img.yzcdn.cn/vant/user-active.png',
			inactiveIcon: 'https://img.yzcdn.cn/vant/user-inactive.png'
		};
	},
	methods: {
		onChange1(event) {
			this.checkbox1 = event;
		},
		
		onChange2(event) {
			this.checkbox2 = event;
		},
		
		onChange3(event) {
			this.checkbox3 = event;
		},
		
		onChange4(event) {
			this.result = event;
		},
		
		onChange5(event) {
			this.result2 = event;
		},         
		
		onChange6(event) {
			this.result3 = event;
		},
		
		onChangeShape(event) {
			this.checkboxShape = event;
		},

		onClick(event) {
			const { value } = event.currentTarget.dataset;
			this.radio3 = value;
		},

		toggle(event) {
			
			const index = event;
			const checkbox = this.selectComponent(`.checkboxes-${index}`);
			// #ifdef MP
			checkbox.$vm.toggle();
			// #endif
			
			// #ifndef MP
			checkbox.toggle();
			// #endif
			
		},

		noop() {}
	}
};
</script>

<style>
	.demo-checkbox-group {
	  margin: 10px 0 0 20px;
	}
	
	.demo-checkbox {
	  margin: 10px 0 0 20px;
	}
	
	.value-class {
	  flex: none !important;
	}
	
	.icon {
	  width: 20px;
	}
</style>
