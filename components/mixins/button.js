export const button = function() {
		return {
			props: {
				id: String,
				lang: String,
				businessId: Number,
				sessionFrom: String,
				sendMessageTitle: String,
				sendMessagePath: String,
				sendMessageImg: String,
				showMessageCard: Boolean,
				appParameter: String,
				ariaLabel: String
			}
		}
}