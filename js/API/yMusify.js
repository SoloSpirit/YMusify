// YMusify API class. Connects Spotify and Yandex.Music methods to transfer music. Constructor's arguments are:
// - spotifyClientId - see SpotifyAPI class, argument: clientId
// - redirectUri - the URI to redirect after OAuth actions
class YMusify {
	#spotifyAPI;
	#yMusicAPI;

	constructor(spotifyClientId, redirectUrl) {
		this.spotifyClientId = spotifyClientId;
		this.redirectUrl = redirectUrl;

		this.#spotifyAPI = new SpotifyAPI(this.spotifyClientId, this.redirectUrl);
		this.#yMusicAPI = new YMusicAPI();
	}

	// Get Spotify access token. The new window will be opened
	spotifyGetAccessToken() {
		this.#spotifyAPI.openAuthWindow();
	}

	// Set Spotify access token:
	// - token - Spotify API access token will be set to this value after successful validation
	async spotifySetAccessToken(token) {
		const response = await this.#spotifyAPI.validateAccessToken(token);
		if (!response) return false;

		this.#spotifyAPI.accessToken = token;
		return true;
	}

	// Get Yandex.Music access token:
	// - yMusicLogin - Yandex login
	// - yMusicPassword - Yandex password
	async yMusicGetAccessToken(yMusicLogin, yMusicPassword) {
		const response = await this.#yMusicAPI.genTokenFromCredentials(yMusicLogin, yMusicPassword);
		if(!response) return false;
	}
}