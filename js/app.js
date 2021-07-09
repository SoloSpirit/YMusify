// Constants for YMusify API
const SPOTIFY_CLIENT_ID = '8469a359cbb048ee8cb53dbbb255f17f';
const REDIRECT_URI = 'https://solospirit.github.io/YMusify/redirect.html';

// Create main API instance
const yMusify = new YMusify(SPOTIFY_CLIENT_ID, REDIRECT_URI);

document.addEventListener('DOMContentLoaded', () => {
	const app = document.querySelector('.app');

	// The architecture of the application is simple, so let's use event delegation
	app.addEventListener('click', event => {
		if(!event.target || !event.target.matches('[data-action]')) return;

		const availableEventTypes = ['action', 'toStep'];
		let appEventType = '';
		if(event.target.matches('[data-action]')) appEventType = 'action';
		if(event.target.matches('[data-to_step]')) appEventType = 'toStep';

		if(!availableEventTypes.includes(appEventType)) return;

		switch (appEventType) {
			case 'action':
				const action = event.target.getAttribute('data-action');
				handleAction(action);

				break;
			case 'toStep':
				const step = event.target.getAttribute('data-to_step');
				goToStep(step);

				break;
		}

	});


});

function handleAction(action) {
	switch (action) {
		case 'get_spotify_token':
			yMusify.getSpotifyAccessToken();

			break;
	}
}

function goToStep(step) {
	switch (step) {

	}
}