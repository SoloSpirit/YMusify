class SpotifyAPI extends AjaxInterface{
	constructor() {
		super();

		this.baseUrl = 'https://api.spotify.com/v1/';
		this.clientId = '8469a359cbb048ee8cb53dbbb255f17f';
		this.clientSecret = '32c5454fd8e34e8ab6c43a1740ed3864';
		this.redirectUrl = 'https://solospirit.github.io/YMusify/';
	}

	openLoginWindow() {
		const data = {
			client_id: this.clientId,
			response_type: 'code',
			redirect_uri: this.redirectUrl
		};

		const url = new URL('https://accounts.spotify.com/authorize');
		url.search = new URLSearchParams(data).toString();

		// location.href = url.href;
		window.open(url.href, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
	}

	getToken() {


		const data = {

		}
	}
}