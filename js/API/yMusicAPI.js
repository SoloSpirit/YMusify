// Yandex.Music API class
class YMusicAPI extends Common {
	#clientId = '23cabbbdc6cd418abb4b39c32c41195d';
	#clientSecret = '53bc75238f0c4d08a118e51fe9203300';
	#baseUrl = 'https://api.music.yandex.net';
	#oauthUrl = 'https://oauth.yandex.ru';
	#grantType = 'password';
	#headers = {
		'X-Yandex-Music-Client': 'WindowsPhone/3.17',
		'User-Agent': 'Windows 10',
		'Connection': 'Keep-Alive'
	}

	constructor(){
		super();
	}

	// Get Yandex access token by login/password pair
	async genTokenFromCredentials(login, password) {
		const data = {
			grant_type: this.#grantType,
			client_id: this.#clientId,
			client_secret: this.#clientSecret,
			username: login,
			password: password
		}

		const response = await Common.sendRequest('POST', this.#oauthUrl + '/token', data, this.#headers);
		console.log(response);
	}
}