// Constants for YMusify API
const SPOTIFY_CLIENT_ID = '8469a359cbb048ee8cb53dbbb255f17f';
const REDIRECT_URI = 'https://solospirit.github.io/YMusify/redirect.html';

document.addEventListener('DOMContentLoaded', () => {
	// Create main API instance
	const yMusify = new YMusify(SPOTIFY_CLIENT_ID, REDIRECT_URI);
	const app = document.querySelector('.app');

	// The architecture of the application is simple, so let's use event delegation
	app.addEventListener('click', event => {
		if(!event.target || !event.target.matches('[data-action]')) return;

		const action = event.target.getAttribute('data-action');

		switch (action) {
			case 'get_spotify_token':
				yMusify.getSpotifyAccessToken();

				break;
		}

	});


});