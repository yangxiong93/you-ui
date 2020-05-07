<template>
	<view class="container">
	  <view class="title">
		<image class="logo" src="https://img.yzcdn.cn/vant/logo.png" />
		<view class="title-text">You Weapp</view>
	  </view>
	  <view class="desc">uniapp移动端 UI 组件库</view>
	
	  <you-collapse
		v-for="(group,index) in list"
		:key="index"
		:value="activeNames"
		:border="false"
		@change="onChangeCollapse"
	  >
		<you-collapse-item
		  clickable
		  :is-link="false"
		  customClass="mobile-nav"
		  titleClass="mobile-nav__title"
		  contentClass="mobile-nav__content"
		  :title="group.groupName"
		  :name="group.groupName"
		>
			<template v-slot:right-icon>
				<you-icon
				  :name="group.icon"
				  customClass="mobile-nav__icon"
				/>
			</template>
		  <you-cell
			v-for="(item,childIndex) in group.list"
			:key="childIndex"
			is-link
			:url="'/pages' + item.path + '/index'"
			:title="item.title"
		  />
		</you-collapse-item>
	  </you-collapse>
	</view>
</template>

<script>
import youCell from '@/components/cell/index.vue';
import youIcon from '@/components/icon/index.vue';
import youCollapse from '@/components/collapse/index.vue';
import youCollapseItem from '@/components/collapse-item/index.vue';
import list from '@/config';
export default {
	components: {youCell, youIcon, youCollapse, youCollapseItem},
	data() {
		return {
			list: list,
			activeNames: []
		};
	},
	methods: {
		onChangeCollapse(event) {
		  this.activeNames = event;
		},
		
		onClick(event) {
		  const { switchTab, url } = event.currentTarget.dataset;
		  if (switchTab) {
		    wx.switchTab({ url });
		  }
		}
	}
};
</script>

<style>
page {
  padding-bottom: 0;
}

.container {
  padding: 45px 20px 20px;
}

.title {
  padding-left: 15px;
  margin-bottom: 10px;
}

.logo,
.title-text {
  display: inline-block;
  vertical-align: middle;
}

.title-text {
  font-size: 32px;
  font-weight: 500;
  margin-left: 15px;
}

.logo {
  width: 36px;
  height: 36px;
}

.desc {
  font-size: 14px;
  color: #7d7e80;
  margin: 0 0 45px;
  padding-left: 15px;
}

.mobile-nav {
  margin-bottom: 16px;
}

.mobile-nav__title {
  font-size: 16px;
  font-weight: 500;
  line-height: 40px;
  align-items: center;
  border-radius: 2px;
  color: #333333!important;
}

.mobile-nav__content {
  padding: 0 !important;
}

.mobile-nav__icon {
  font-size: 24px !important;
  /* #ifdef MP */
    margin-top: 8px;
  /* #endif */
}

.mobile-nav__icon image {
  width: 100%;
}
</style>
