<template>
	<van-tabs
	  active="{{ active }}"
	  color="#1989fa"
	  bind:change="onSwitch"
	>
	  <van-tab title="基础图标" custom-class="demo-tab-pane">
	    <van-col
	      wx:for="{{ icons.basic }}"
	      wx:key="index"
	      custom-class="col"
	      span="6"
	    >
	      <van-icon
	        name="{{ item }}"
	        size="32px"
	        custom-class="icon"
	      />
	      <view class="text">{{ item }}</view>
	    </van-col>
	  </van-tab>
	  <van-tab title="线框风格" custom-class="demo-tab-pane">
	    <van-col
	      wx:for="{{ icons.outline }}"
	      wx:key="index"
	      custom-class="col"
	      span="6"
	    >
	      <van-icon
	        name="{{ item }}"
	        size="32px"
	        custom-class="icon"
	      />
	      <view class="text">{{ item }}</view>
	    </van-col>
	  </van-tab>
	  <van-tab title="实底风格" custom-class="demo-tab-pane">
	    <van-col
	      wx:for="{{ icons.filled }}"
	      wx:key="index"
	      custom-class="col"
	      span="6"
	    >
	      <van-icon
	        name="{{ item }}"
	        size="32px"
	        custom-class="icon"
	      />
	      <view class="text">{{ item }}</view>
	    </van-col>
	  </van-tab>
	  <van-tab title="用法示例" custom-class="demo-tab-pane">
	    <demo-block title="图标右上角小红点">
	      <van-col
	        custom-class="col"
	        span="6"
	      >
	        <van-icon
	          name="{{ demoIcon }}"
	          size="32px"
	          custom-class="icon"
	        />
	        <view class="text">{{ demoIcon }}</view>
	      </van-col>
	       <van-col
	        custom-class="col"
	        span="6"
	      >
	        <van-icon
	          name="{{ demoIcon }}"
	          size="32px"
	          custom-class="icon"
	          dot
	        />
	        <view class="text">{{ demoIcon }}</view>
	      </van-col>
	    </demo-block>
	    <demo-block title="图标右上角文字提示">
	        <van-col
	          custom-class="col"
	          span="6"
	        >
	          <van-icon
	            name="{{ demoIcon }}"
	            size="32px"
	            custom-class="icon"
	          />
	          <view class="text">{{ demoIcon }}</view>
	        </van-col>
	        <van-col
	          custom-class="col"
	          span="6"
	        >
	          <van-icon
	            name="{{ demoIcon }}"
	            size="32px"
	            custom-class="icon"
	            info="99+"
	          />
	          <view class="text">{{ demoIcon }}</view>
	        </van-col>
	      </demo-block>
	      <demo-block title="图标颜色">
	        <van-col
	          custom-class="col"
	          span="6"
	        >
	          <van-icon
	            name="{{ demoIcon }}"
	            size="32px"
	            custom-class="icon"
	          />
	          <view class="text">{{ demoIcon }}</view>
	        </van-col>
	        <van-col
	          custom-class="col"
	          span="6"
	        >
	          <van-icon
	            name="{{ demoIcon }}"
	            size="32px"
	            custom-class="icon"
	            color="red"
	          />
	          <view class="text">{{ demoIcon }}</view>
	        </van-col>
	      </demo-block>
	      <demo-block title="图标大小">
	        <van-col
	          custom-class="col"
	          span="6"
	        >
	          <van-icon
	            name="{{ demoIcon }}"
	            size="32px"
	            custom-class="icon"
	          />
	          <view class="text">{{ demoIcon }}</view>
	        </van-col>
	        <van-col
	          custom-class="col"
	          span="6"
	        >
	          <van-icon
	            name="{{ demoIcon }}"
	            size="45px"
	            custom-class="icon"
	          />
	          <view class="text">{{ demoIcon }}</view>
	        </van-col>
	      </demo-block>
	    </van-tab>
	</van-tabs>
	
</template>

<script>
	export default {
		data: {
		  icons,
		  active: 0,
		  demoIcon: 'location-o'
		},
		methods:{
			onSwitch(event) {
			  this.setData({
			    active: event.detail.index
			  });
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
