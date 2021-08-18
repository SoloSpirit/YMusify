// YMusify API class. Connects Spotify and Yandex.Music methods to transfer music. Constructor's arguments are:
// - spotifyClientId - see SpotifyAPI class, argument: clientId
// - redirectUri - the URI to redirect after OAuth actions
class YMusify {
	#spotifyAPI;
	#yMusicAPI;

	constructor(spotifyClientId, redirectUrl) {
		this.#spotifyAPI = new SpotifyAPI(spotifyClientId, redirectUrl);
		this.#yMusicAPI = new YMusicAPI();
	};

	// Get Spotify access token. The new window will be opened
	spotifyGetAccessToken() {
		this.#spotifyAPI.openAuthWindow();
	};

	// Set Spotify access token:
	// - token - Spotify access token will be set to this value after successful validation
	// Method returns true in case of success
	async spotifySetAccessToken(token) {
		const response = await this.#spotifyAPI.validateAccessToken(token);
		if (!response) return false;

		this.#spotifyAPI.accessToken = token;
		return true;
	};

	// Get Yandex.Music access token by credentials:
	// - yMusicLogin - Yandex login
	// - yMusicPassword - Yandex password
	// Method returns token in case of success
	async yMusicGetAccessToken(yMusicLogin, yMusicPassword) {
		const token = await this.#yMusicAPI.genTokenFromCredentials(yMusicLogin, yMusicPassword);
		if(!token) return false;

		return token;
	};

	// Set Yandex.Music access token by credentials:
	// - token - Yandex.Music access token will be set to this value
	// Method returns true in case of success
	yMusicSetAccessToken(token) {
		this.#yMusicAPI.accessToken = token;
		return true;
	};

	// Start music transfer:
	// - transferType - direction of music transfer: either form Spotify to Yandex.Music (spot_to_ym) or from Yandex.Music to Spotify (ym_to_spot)
	async startMusicTransfer(transferType) {
		switch (transferType) {
			case 'spot_to_ym':
				const playlistTitle = 'YMusify';

				const playlistId = await this.#yMusicAPI.createPlaylist(playlistTitle);
				if(!playlistId) return console.error('Playlist creation error');

				break;
			case 'ym_to_spot':
				return console.error('Method is currently unavailable');
		}
	};
}