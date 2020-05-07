<template>
	<view>
		<demo-block title="基础用法">
			<you-cell title="展示弹出层" is-link @click="showBasic" />
			<you-popup :show="show.basic" custom-style="padding: 30px 50px" @close="hideBasic">内容</you-popup>
		</demo-block>

		<demo-block title="弹出位置">
			<you-cell title="顶部弹出" is-link @click="showTop" />
			<you-cell title="底部弹出" is-link @click="showBottom" />
			<you-cell title="左侧弹出" is-link @click="showLeft" />
			<you-cell title="右侧弹出" is-link @click="showRight" />

			<you-popup :show="show.top" position="top" custom-style="height: 20%" @close="hideTop" />
			<you-popup :show="show.bottom" position="bottom" custom-style="height: 20%" @close="hideBottom" />
			<you-popup :show="show.left" position="left" custom-style="width: 20%; height: 100%" @close="hideLeft" />
			<you-popup :show="show.right" position="right" custom-style="width: 20%; height: 100%" @close="hideRight" />
		</demo-block>

		<demo-block title="关闭图标">
			<you-cell title="关闭图标" is-link @click="showCloseIcon" />
			<you-cell title="自定义图标" is-link @click="showCustomCloseIcon" />
			<you-cell title="图标位置" is-link @click="showCustomIconPosition" />

			<you-popup :show="show.closeIcon" closeable position="bottom" custom-style="height: 20%" @close="hideCloseIcon" />

			<you-popup :show="show.customCloseIcon" closeable close-icon="close" position="bottom" custom-style="height: 20%" @close="hideCustomCloseIcon" />

			<you-popup
				:show="show.customIconPosition"
				closeable
				close-icon-position="top-left"
				position="bottom"
				custom-style="height: 20%"
				@close="hideCustomIconPosition"
			/>
		</demo-block>

		<demo-block title="圆角弹窗">
			<you-cell title="圆角弹窗" is-link @click="showRound" />

			<you-popup :show="show.round" round position="bottom" custom-style="height: 20%" @close="hideRound" />
		</demo-block>
	</view>
</template>

<script>
import demoBlock from '@/components/demo-block/index.vue';
import youCell from '@/components/cell/index.vue';
import youPopup from '@/components/popup/index.vue';

export default {
	components: {
		demoBlock,
		youCell,
		youPopup
	},
	data() {
		return {
			show: {
				basic: false,
				top: false,
				bottom: false,
				left: false,
				right: false,
				round: false,
				closeIcon: false,
				customCloseIcon: false,
				customIconPosition: false
			}
		};
	},
	methods: {
		toggle(type, show) {
			this.show[`${type}`] = show;
		},

		showBasic() {
			this.toggle('basic', true);
		},

		hideBasic() {
			this.toggle('basic', false);
		},

		showTop() {
			this.toggle('top', true);
		},

		hideTop() {
			this.toggle('top', false);
		},

		showLeft() {
			this.toggle('left', true);
		},

		hideLeft() {
			this.toggle('left', false);
		},

		showRight() {
			this.toggle('right', true);
		},

		hideRight() {
			this.toggle('right', false);
		},

		showBottom() {
			this.toggle('bottom', true);
		},

		hideBottom() {
			this.toggle('bottom', false);
		},

		showRound() {
			this.toggle('round', true);
		},

		hideRound() {
			this.toggle('round', false);
		},

		showCloseIcon() {
			this.toggle('closeIcon', true);
		},

		hideCloseIcon() {
			this.toggle('closeIcon', false);
		},

		showCustomCloseIcon() {
			this.toggle('customCloseIcon', true);
		},

		hideCustomCloseIcon() {
			this.toggle('customCloseIcon', false);
		},

		showCustomIconPosition() {
			this.toggle('customIconPosition', true);
		},

		hideCustomIconPosition() {
			this.toggle('customIconPosition', false);
		}
	}
};
</script>

<style>
	:host {
	  font-size: 16px;
	}
</style>
