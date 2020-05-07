<template>
	<view
	  v-if="info !== null && info !== '' || dot"
	  class="you-info"
	  :class="[customClass,infoClass]"
	  :style="customStyle"
	>{{ dot ? '' : info }}</view>
</template>

<script>
import utils from '../wxs/utils.js';
export default {
	name: 'youInfo',
	props: {
		customClass: String,
		customStyle: {
			type: String,
			default: ''
		},
		dot: {
			type: Boolean,
			default: false
		},
		info: [String,Number]
	},
	computed: {
		infoClass:function(){
			let {dot} = this;
			return utils.bem('info', { dot });
		}
	}
}
</script>

<style>
	@import './index.css';
</style>
