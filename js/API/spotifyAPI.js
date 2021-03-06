// Spotify API class. Constructor's arguments are:
// - clientId - the client ID provided to you by Spotify when you register your application
// - redirectUri - the URI to redirect to after the user grants/denies permission
class SpotifyAPI {
	#baseUrl = 'https://api.spotify.com/v1';
	#scope = 'user-read-private user-read-email user-library-read';

	#clientId;
	#redirectUri;
	#_accessToken;

	constructor(clientId, redirectUri) {
		this.#clientId = clientId;
		this.#redirectUri = redirectUri;
	};

	// Open Spotify login window. The following actions are initiated:
	// - the user is asked to authorize access within the scopes
	// - the user redirected back to specified redirectUrl that will contain a hash fragment with access token
	openAuthWindow() {
		const data = {
			client_id: this.#clientId,
			scope: this.#scope,
			response_type: 'token',
			redirect_uri: this.#redirectUri
		};

		const url = new URL('https://accounts.spotify.com/authorize');
		url.search = new URLSearchParams(data).toString();

		window.open(url.href, '_blank', 'location=yes,height=750,width=750,scrollbars=yes,status=yes');
	};

	// Getter - get current Spotify access token
	get accessToken() {
		return this.#_accessToken;
	};

	// Setter - set Spotify access token for further requests:
	// - token - actual Spotify access token
	set accessToken(token) {
		this.#_accessToken = token;
	};

	// Validate current Spotify access token:
	// - token - the value that must be validated
	// Method returns some data (not false) in case of success
	async validateAccessToken(token) {
		const headers = {'Authorization': `Bearer ${token}`};
		return await RequestInterface.sendRequest('GET', `${this.#baseUrl}/me`, {}, headers);
	};

	// Get list of saved tracks
	// Method returns track list in unified style (see Tracks class) in case of success
	async getSavedTracks() {
		const headers = this.#genHeaders(['Authorization']);
		const data = {
			limit: 50,
			offset: 0
		};
		const tracks = new Tracks();
		let requestContinue = true;

		while (requestContinue) {
			let response = await RequestInterface.sendRequest('GET', `${this.#baseUrl}/me/tracks`, data, headers);
			if (!response) return false;

			response.items.map(item => tracks.add(item.track.id, item.track.name, item.track.artists[0].name, item.track.album.name, item.track.album.id));

			data.offset += data.limit;
			if (tracks.list.length === response.total) requestContinue = false;
		}

		return tracks.list;
	};

	// Generate headers by names:
	// - headerNames - headers names array
	// Method returns headers object
	#genHeaders(headerNames) {
		const headers = {};

		if (headerNames.includes('Content-Type')) headers['Content-Type'] = 'application/x-www-form-urlencoded';
		if (headerNames.includes('Authorization')) headers['Authorization'] = `Bearer ${this.accessToken}`;

		return headers;
	};
}