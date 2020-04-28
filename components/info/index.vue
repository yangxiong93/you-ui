<template>
	<view
	  v-if="info !== null && info !== '' || dot"
	  class="you-info"
	  :class="[customClass,info]"
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
	}
}
</script>

<style>
	@import './index.css';
</style>
