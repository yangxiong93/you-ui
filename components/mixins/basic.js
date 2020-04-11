export const basic = function() {
	return {
		methods: {
			// $emit(...args) {
			// 	this.triggerEvent(...args);
			// },
			set(data, callback) {
				this.setData(data, callback);
				return new Promise(resolve => setTimeout(()=>{resolve}),500);
			},
			setData(obj){
				let that = this;
				let keys = [];
				let val,data;
				Object.keys(obj).forEach(function(key){
					keys = key.split('.');
					val = obj[key];
					data = that;
					keys.forEach(function(key2,index){
						if(index+1 == keys.length){
							that.$set(data,key2,val);
						}else{
							if(!data[key2]){
								that.$set(data,key2,{});
							}
						}
						data = data[key2];
					})
				});
			}
		}
    }
}