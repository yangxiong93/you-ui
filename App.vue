<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* #ifdef MP */
	@import '@/components/collapse-item/index.css';
	/* #endif */
	
	page {
	  box-sizing: border-box;
	  min-height: 100vh;
	  padding: 0 0 100rpx;
	  color: #323233;
	  font-size: 16px;
	  font-family: 'PingFang SC', Helvetica, Arial, sans-serif;
	  background: #f7f8fa;
	  -webkit-font-smoothing: antialiased;
	}
	
	.demo-margin-left {
	  margin-left: 10px;
	}
	
	.demo-margin-right {
	  margin-right: 10px;
	}
	
	.demo-margin-bottom {
	  display: block;
	  margin-bottom: 15px;
	}
	
</style>
