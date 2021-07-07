class SpotifyAPI extends Common{
	constructor(clientId, redirectUrl) {
		super();

		this.baseUrl = 'https://api.spotify.com/v1/';
		this.clientId = clientId;
		this.redirectUrl = redirectUrl;
	}

	openLoginWindow() {
		const data = {
			client_id: this.clientId,
			response_type: 'token',
			redirect_uri: this.redirectUrl
		};

		const url = new URL('https://accounts.spotify.com/authorize');
		url.search = new URLSearchParams(data).toString();

		location.href = url.href;
	}
}