<template>
	<view>
		<you-row gutter="20">
			<you-col span="8" v-for="(item, index) in bigList" :key="index"><view style="background: #000000;color: #fff;" @tap="onBrand" :data-index="index">{{item.brandName}}</view></you-col>
		</you-row>
	</view>
</template>

<script>
import youRow from '@/components/row/index.vue';
import youCol from '@/components/col/index.vue';
export default {
	components: { youRow, youCol },
	data() {
		return {
			bigList: [{
				brandName: '多发发呆'
			},{
				brandName: '会过得如何'
			},{
				brandName: '跟风狗还是'
			}]
		};
	},
	onLoad() {
		// this.getList()
	},
	methods: {
		onBrand(e){
			console.log(e.currentTarget.dataset.index)
		}
	}
};
</script>

<style>
.wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}

.block {
	width: 120px;
	height: 120px;
	background-color: #fff;
}
</style>
