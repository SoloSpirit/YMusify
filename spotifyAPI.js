class SpotifyAPI extends AjaxInterface{
	constructor() {
		super();

		this.baseUrl = 'https://api.spotify.com/v1/';
		this.clientId = '8469a359cbb048ee8cb53dbbb255f17f';
		this.redirectUrl = 'https://solospirit.github.io/YMusify/';
	}

	async openLoginWindow() {
		const data = {
			client_id: this.clientId,
			response_type: 'code',
			redirect_uri: this.redirectUrl
		};

		const url = new URL('https://accounts.spotify.com/authorize');
		url.search = new URLSearchParams(data).toString();
		const loginWindow = window.open(url.href, '_blank', 'location=yes,width=800,status=yes');
	}

	async getUser(userId) {
		let res = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`);
		res = await res.json();

		console.log(res);
	}
}