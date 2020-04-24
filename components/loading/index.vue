<template>
	<view class="you-loading" :class="[customClass, vertical ? 'you-loading--vertical' : '']">
	  <view
	    class="you-loading__spinner"
		:class="'you-loading__spinner--' + type"
	    :style="'color:' + color + ';width:' + sizeWithUnit + ';height:' + sizeWithUnit"
	  >
	    <view
	      v-if="type === 'spinner'"
	      v-for="(item,index) in 12"
	      :key="index"
	      class="you-loading__dot"
	    />
	  </view>
	  <view class="you-loading__text" :style="'fontSize:' + textSizeWithUnit">
	    <slot />
	  </view>
	</view>
</template>

<script>
import { addUnit } from '../common/utils';
import { basic } from '../mixins/basic.js';
export default {
	name: 'youLoading',
	mixins: [basic()],
	props: {
	    color: String,
	    vertical: Boolean,
	    type: {
	        type: String,
	        default: 'circular'
	    },
	    size: String,
	    textSize: String,
		customClass: String,
	},
	data() {
		return {
			sizeWithUnit: '',
			textSizeWithUnit: ''
		}
	},
	watch:{
		size(nVal,oVal){
			if(nVal!==oVal){
				this.setSizeWithUnit(nVal)
			}
		},
		textSize(nVal,oVal){
			if(nVal!==oVal){
				this.setTextSizeWithUnit(nVal)
			}
		},
	},
	mounted() {
		this.$nextTick(()=>{
			this.setSizeWithUnit(this.size);
			this.setTextSizeWithUnit(this.textSize); 
		})
	},
	methods: {
	    setSizeWithUnit(size) {
	        this.setData({
	            sizeWithUnit: addUnit(size)
	        });
	    },
	    setTextSizeWithUnit(size) {
	        this.set({
	            textSizeWithUnit: addUnit(size)
	        });
	    }
	},
}
</script>

<style>
	@import './index.css';
</style>
