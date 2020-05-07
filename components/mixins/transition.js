const getClassNames = (name) => ({
	enter: `you-${name}-enter you-${name}-enter-active enter-class enter-active-class`,
	'enter-to': `you-${name}-enter-to you-${name}-enter-active enter-to-class enter-active-class`,
	leave: `you-${name}-leave you-${name}-leave-active leave-class leave-active-class`,
	'leave-to': `you-${name}-leave-to you-${name}-leave-active leave-to-class leave-active-class`
});
const nextTick = () => new Promise(resolve => setTimeout(resolve, 1000 / 30));
export const transition = function(showDefaultValue) {
		return {
			props: {
				customClass: {
					type: String,
					default: ''
				},
				customStyle: {
					type: String,
					default: ''
				},
				// @ts-ignore
				show: {
					type: Boolean,
					default: showDefaultValue
				},
				// @ts-ignore
				duration: {
					type: [Number,Object],
					default: 300
				},
				name: {
					type: String,
					default: 'fade'
				}
			},
			computed:{
				comName(){
					const { transition, position } = this;
					if(transition || position){
						return transition || position
					}else{
						return this.name
					}
				},
				comDuration(){
					if(this.transition === 'none'){
						return 0
					}else{
						return this.duration
					}
				}
			},
			data() {
				return {
					type: '',
					inited: false,
					display: false,
					classes: '',
					currentDuration: '',
					status: ''
				}
			},
			watch: {
				show: function(value, old) {
					if (value === old) {
						return;
					}
					value ? this.enter() : this.leave();
				},
				 
			},
			methods: {
				enter() {
					const {
						comDuration,
						comName
					} = this;
					const classNames = getClassNames(comName);
					const currentDuration = typeof comDuration === 'object' ? comDuration.enter : comDuration;
					this.status = 'enter';
					this.$emit('before-enter');
					Promise.resolve()
						.then(nextTick())
						.then(() => {
							this.checkStatus('enter');
							this.$emit('enter');
							this.inited = true;
							this.display = 'block';
							this.classes = classNames.enter;
							this.currentDuration = currentDuration;
						})
						.then(nextTick)
						.then(() => {
							this.checkStatus('enter');
							this.transitionEnded = false;
							this.classes = classNames['enter-to'];
						})
						.catch(() => {});
				},
				leave() {
					if (!this.display) {
						return;
					}
					const {
						comDuration,
						comName
					} = this;
					const classNames = getClassNames(comName);
					const currentDuration = typeof comDuration === 'object' ? comDuration.leave : comDuration;
					this.status = 'leave';
					this.$emit('before-leave');
					Promise.resolve()
						.then(nextTick)
						.then(() => {
							this.checkStatus('leave');
							this.$emit('leave');
							this.classes = classNames.leave;
							this.currentDuration
						})
						.then(nextTick)
						.then(() => {
							this.checkStatus('leave');
							this.transitionEnded = false;
							setTimeout(() => this.onTransitionEnd(), currentDuration);
							this.classes = classNames['leave-to'];

						})
						.catch(() => {});
				},
				checkStatus(status) {
					if (status !== this.status) {
						throw new Error(`incongruent status: ${status}`);
					}
				},
				onTransitionEnd() {
					if (this.transitionEnded) {
						return;
					}
					this.transitionEnded = true;
					this.$emit(`after-${this.status}`);
					const {
						show,
						display
					} = this;
					if (!show) {
						this.display = 'none';
					}
				}
			}
		}
	}
