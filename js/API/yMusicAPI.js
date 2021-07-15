// Yandex.Music API class
class YMusicAPI extends RequestInterface {
	#clientId = '23cabbbdc6cd418abb4b39c32c41195d';
	#clientSecret = '53bc75238f0c4d08a118e51fe9203300';
	#baseUrl = 'https://api.music.yandex.net';
	#oauthUrl = 'https://oauth.yandex.ru';
	#grantType = 'password';

	#uid;
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
		if(!this.accessToken){
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

			this.#uid = response.uid;
			this.accessToken = response.access_token;

		}else{
			// const headers = {'OAuth': ''}
			const response = await RequestInterface.sendRequest('POST', this.#baseUrl + '/users/' + this.#uid + '/playlists/list');
			console.log(response)

		}

		return true;
	}

	// Get Yandex.Music favorites playlist
	async getFavoritesPlaylist() {

	}
}