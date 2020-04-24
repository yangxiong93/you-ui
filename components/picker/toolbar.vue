<template>
	<view
	    v-if="showToolbar"
	    class="you-picker__toolbar you-hairline--top-bottom toolbar-class"
	  >
	    <view
	      class="you-picker__cancel"
	      hover-class="you-picker__cancel--hover"
	      hover-stay-time="70"
	      data-type="cancel"
	      @tap="emit"
	    >
	      {{ cancelButtonText }}
	    </view>
	    <view v-if="title" class="you-picker__title you-ellipsis">
		{{title}}
		</view>
	    <view
	      class="you-picker__confirm"
	      hover-class="you-picker__confirm--hover"
	      hover-stay-time="70"
	      data-type="confirm"
	      @tap="emit"
	    >
	      {{ confirmButtonText }}
	    </view>
	  </view>
</template>

<script>
	export default {
		name: 'toolbar',
		props: {
			showToolbar: {
				type: Boolean,
				default: true
			},
			cancelButtonText: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			confirmButtonText: {
				type: String,
				default: ''
			}
		},
		methods:{
			emit(event) {
				const { type } = event.currentTarget.dataset;
				this.$emit(type,type);
			},
		}
	}
</script>

<style>
	@import './index.css';
</style>
