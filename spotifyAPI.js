class SpotifyAPI extends AjaxInterface{
	constructor() {
		super();

		this.baseUrl = 'https://api.spotify.com/v1/';
		this.clientId = '8469a359cbb048ee8cb53dbbb255f17f';
		this.redirectUrl = 'https://solospirit.github.io/YMusify/';
	}

	getAuthCode() {
		const data = {
			client_id: this.clientId,
			response_type: 'code',
			redirect_uri: this.redirectUrl,
			show_dialog: true
		};

		this.sendRequest('GET', 'https://accounts.spotify.com/authorize', data)
			.then(response => {
				console.log(response);
			});
	}
}