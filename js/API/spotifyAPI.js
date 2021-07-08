// Spotify API class. Constructor's arguments are:
// - clientId - the client ID provided to you by Spotify when you register your application
// - redirectUri - the URI to redirect to after the user grants/denies permission
class SpotifyAPI extends Common {
	constructor(clientId, redirectUri) {
		super();

		this.baseUrl = 'https://api.spotify.com/v1/';
		this.clientId = clientId;
		this.redirectUri = redirectUri;
	}

	// Open Spotify login window. The following actions are initiated:
	// - the user is asked to authorize access within the scopes
	// - the user redirected back to specified redirectUrl that will contain a hash fragment with access token
	openAuthWindow() {
		const data = {
			client_id: this.clientId,
			response_type: 'token',
			redirect_uri: this.redirectUri
		};

		const url = new URL('https://accounts.spotify.com/authorize');
		url.search = new URLSearchParams(data).toString();

		window.open(url.href, '_blank', 'location=yes,scrollbars=yes,status=yes');
	}
}