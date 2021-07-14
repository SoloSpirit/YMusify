// Yandex.Music API class
class YMusicAPI extends RequestInterface {
	#clientId = '23cabbbdc6cd418abb4b39c32c41195d';
	#clientSecret = '53bc75238f0c4d08a118e51fe9203300';
	#baseUrl = 'https://api.music.yandex.net';
	#oauthUrl = 'https://oauth.yandex.ru';
	#grantType = 'password';

	#_accessToken;

	constructor(){
		super();
	}

	// Get current Yandex.Music access token
	get accessToken() {
		return this.#_accessToken;
	}

	// Set Yandex.Music access token for further requests:
	// - token - actual Yandex.Music access token
	set accessToken(token) {
		this.#_accessToken = token;
	}

	// Get Yandex access token by login/password pair
	async genTokenFromCredentials(login, password) {
		const data = {
			grant_type: this.#grantType,
			client_id: this.#clientId,
			client_secret: this.#clientSecret,
			username: login,
			password: password
		};
		const headers = {'Content-Type': 'application/x-www-form-urlencoded'};

		const response = await RequestInterface.sendRequest('POST', this.#oauthUrl + '/token', data, headers);
		if (!response || !response.access_token) return false;

		return response.access_token;
	}
}