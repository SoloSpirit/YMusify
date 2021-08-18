// Yandex.Music API class
class YMusicAPI {
	#clientId = '23cabbbdc6cd418abb4b39c32c41195d';
	#clientSecret = '53bc75238f0c4d08a118e51fe9203300';
	#baseUrl = 'https://api.music.yandex.net';
	#oauthUrl = 'https://oauth.yandex.ru';
	#proxyUrl = 'https://cors-anywhere.herokuapp.com';
	#grantType = 'password';

	#uid;
	#_accessToken;

	// Getter - get current Yandex.Music access token
	get accessToken() {
		return this.#_accessToken;
	};

	// Setter - set Yandex.Music access token for further requests:
	// - token - actual Yandex.Music access token
	set accessToken(token) {
		this.#_accessToken = token;
	};

	// Get Yandex access token by login/password pair
	// YMusicAPI.uid is also set in this method in case of success
	// - login - Yandex.Music login
	// - password - Yandex.Music password
	// Method returns generated access token in case of success
	async genTokenFromCredentials(login, password) {
		const data = {
			grant_type: this.#grantType,
			client_id: this.#clientId,
			client_secret: this.#clientSecret,
			username: login,
			password: password
		};
		const headers = this.#genHeaders(['Content-Type']);

		const response = await RequestInterface.sendRequest('POST', this.#oauthUrl + '/token', data, headers);
		if (!response || !response.access_token) return false;

		if(response.uid) this.#uid = response.uid;
		return response.access_token;
	};

	// Create playlist:
	// - title - title of the playlist
	// - visibility - visibility of the playlist
	// Method returns created playlist id (kind) in case of success
	async createPlaylist(title, visibility) {
		if(!visibility) visibility = 'public';

		const headers = this.#genHeaders(['Content-Type', 'Authorization']);
		const data = {
			title: title,
			visibility: visibility
		}

		const response = await RequestInterface.sendRequest('POST', `${this.#proxyUrl}/${this.#baseUrl}/users/${this.#uid}/playlists/create`, data, headers);
		if(!response || !response.result.kind) return false;

		console.log(response.result.kind);
		return response.result.kind;
	};

	// Generate headers by names:
	// - headerNames - headers names array
	// Method returns headers object
	#genHeaders(headerNames) {
		const headers = {};

		if(headerNames.includes('Content-Type')) headers['Content-Type'] = 'application/x-www-form-urlencoded';
		if(headerNames.includes('Authorization')) headers['Authorization'] = `OAuth ${this.accessToken}`;

		return headers;
	};
}