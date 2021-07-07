// Global constants
const SPOTIFY_CLIENT_ID = '8469a359cbb048ee8cb53dbbb255f17f';
const REDIRECT_URL = 'https://solospirit.github.io/YMusify/redirect.html';

// The app is loaded
document.addEventListener('DOMContentLoaded', () => {
	// Create main API instance
	const YMusify = new YMusify(SPOTIFY_CLIENT_ID, REDIRECT_URL);

	// DOM element objects
	const spotifyConnectBtn = document.querySelector('[data-action="spotify_connect"]');

	// Event listeners
	spotifyConnectBtn.addEventListener('click', () => {
		YMusify.getSpotifyAuthToken();


	});
});