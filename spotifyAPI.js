class SpotifyAPI extends AjaxInterface{
	constructor() {
		super();

		this.baseUrl = 'https://api.spotify.com/v1/';
		this.clientId = '8469a359cbb048ee8cb53dbbb255f17f';
		this.clientSecret = '32c5454fd8e34e8ab6c43a1740ed3864';
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
		setInterval(() => {
			try {
				let authCode = new URL(location.href).searchParams.get('code');

				if (authCode) {
					this.newAuthCode(authCode);
					loginWindow.close();
				}
			} catch (e) {
				console.log('Spotify user is logging in...');
			}
		}, 1000);
	}

	get newAuthCode() {
		return this.authCode;
	}

	set newAuthCode(authCode) {
		window.localStorage.setItem('spotifyAuthCode', authCode);
		this.authCode = authCode;
	}

	getToken() {
		const data = {

		}
	}
}