// YMusify API class. Connects Spotify and Yandex.Music methods to transfer music. Constructor's arguments are:
// - spotifyClientId - see SpotifyAPI class, argument: clientId
// - redirectUri - the URI to redirect after OAuth actions
class YMusify {
	constructor(spotifyClientId, redirectUrl) {
		this.spotifyClientId = spotifyClientId;
		this.redirectUrl = redirectUrl;

		this.spotifyAPI = new SpotifyAPI(this.spotifyClientId, this.redirectUrl);
	}

	// Get Spotify access token. The new window is opened
	getSpotifyAccessToken() {
		this.spotifyAPI.openAuthWindow();
	}
}