<template>
	<you-tabs
	  :active="active"
	  color="#1989fa"
	  :change="onSwitch"
	>
	  <you-tab title="基础图标" custom-class="demo-tab-pane">
	    <you-col
	      v-for="(item,index) in icons.basic"
	      :key="index"
	      custom-class="col"
	      span="6"
	    >
	      <you-icon
	        :name="item"
	        size="32px"
	        custom-class="icon"
	      />
	      <view class="text">{{ item }}</view>
	    </you-col>
	  </you-tab>
	  <you-tab title="线框风格" custom-class="demo-tab-pane">
	    <you-col
	      v-for="(item,index) in icons.outline"
	      :key="index"
	      custom-class="col"
	      span="6"
	    >
	      <you-icon
	        :name="item"
	        size="32px"
	        custom-class="icon"
	      />
	      <view class="text">{{ item }}</view>
	    </you-col>
	  </you-tab>
	  <you-tab title="实底风格" custom-class="demo-tab-pane">
	    <you-col
	      v-for="(item,index) in icons.filled"
	      :key="index"
	      custom-class="col"
	      span="6"
	    >
	      <you-icon
	        :name="item"
	        size="32px"
	        custom-class="icon"
	      />
	      <view class="text">{{ item }}</view>
	    </you-col>
	  </you-tab>
	  <you-tab title="用法示例" custom-class="demo-tab-pane">
	    <demo-block title="图标右上角小红点">
	      <you-col
	        custom-class="col"
	        span="6"
	      >
	        <you-icon
	          :name="demoIcon"
	          size="32px"
	          custom-class="icon"
	        />
	        <view class="text">{{ demoIcon }}</view>
	      </you-col>
	       <you-col
	        custom-class="col"
	        span="6"
	      >
	        <you-icon
	          :name="demoIcon"
	          size="32px"
	          custom-class="icon"
	          dot
	        />
	        <view class="text">{{ demoIcon }}</view>
	      </you-col>
	    </demo-block>
	    <demo-block title="图标右上角文字提示">
	        <you-col
	          custom-class="col"
	          span="6"
	        >
	          <you-icon
	            :name="demoIcon"
	            size="32px"
	            custom-class="icon"
	          />
	          <view class="text">{{ demoIcon }}</view>
	        </you-col>
	        <you-col
	          custom-class="col"
	          span="6"
	        >
	          <you-icon
	            :name="demoIcon"
	            size="32px"
	            custom-class="icon"
	            info="99+"
	          />
	          <view class="text">{{ demoIcon }}</view>
	        </you-col>
	      </demo-block>
	      <demo-block title="图标颜色">
	        <you-col
	          custom-class="col"
	          span="6"
	        >
	          <you-icon
	            :name="demoIcon"
	            size="32px"
	            custom-class="icon"
	          />
	          <view class="text">{{ demoIcon }}</view>
	        </you-col>
	        <you-col
	          custom-class="col"
	          span="6"
	        >
	          <you-icon
	            :name="demoIcon"
	            size="32px"
	            custom-class="icon"
	            color="red"
	          />
	          <view class="text">{{ demoIcon }}</view>
	        </you-col>
	      </demo-block>
	      <demo-block title="图标大小">
	        <you-col
	          custom-class="col"
	          span="6"
	        >
	          <you-icon
	            :name="demoIcon"
	            size="32px"
	            custom-class="icon"
	          />
	          <view class="text">{{ demoIcon }}</view>
	        </you-col>
	        <you-col
	          custom-class="col"
	          span="6"
	        >
	          <you-icon
	            :name="demoIcon"
	            size="45px"
	            custom-class="icon"
	          />
	          <view class="text">{{ demoIcon }}</view>
	        </you-col>
	      </demo-block>
	    </you-tab>
	</you-tabs>
	
</template>

<script>
	import icons from './config';
	import youIcon from '@/components/icon/index.vue';
	import demoBlock from '@/components/demo-block/index.vue';
	import youTabs from '@/components/tabs/index.vue';
	import youTab from '@/components/tab/index.vue';
	import youCol from '@/components/col/index.vue';
	
	export default {
		components: {youIcon, demoBlock, youTabs, youTab, youCol},
		data() {
			return {
				icons: icons,
				active: 0,
				demoIcon: 'location-o'
			}
		},
		methods:{
			onSwitch(event) {
			    active = event.index
			}
		}
	}
</script>

<style>
	page {
	  padding-bottom: 0;
	}
	
	.col {
	  text-align: center;
	  height: 100px;
	  float: none;
	  display: inline-block;
	  vertical-align: middle;
	}
	
	.icon {
	  display: block;
	  color: #323233;
	  margin: 20px 0 10px;
	}
	
	.text {
	  font-size: 12px;
	  padding: 0 5px;
	  line-height: 14px;
	  color: #7d7e80;
	}
	
	.demo-tab-pane {
	  margin: 20px;
	  background-color: #fff;
	}
</style>
