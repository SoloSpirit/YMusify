class YMusify {
	constructor(spotifyClientId, redirectUrl) {
		this.spotifyClientId = spotifyClientId;
		this.redirectUrl = redirectUrl;

		this.spotifyAPI = new SpotifyAPI(this.spotifyClientId, this.redirectUrl);
	}

	getSpotifyAuthToken() {
		this.spotifyAPI.openLoginWindow();
	}
}