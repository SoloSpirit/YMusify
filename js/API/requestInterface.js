// Request interface. Allows to send GET and POST requests
class RequestInterface {
	// Send request, available methods: GET, POST
	// Method returns response data
	static async sendRequest(method, url, data, headers) {
		// Handle main errors
		if (!['GET', 'POST'].includes(method)) return console.error('Only GET and POST methods are available.');
		if (!RequestInterface.validateUrl(url)) return console.error('Invalid URL for request.');
		if (headers && typeof headers !== 'object') return console.error('Headers must be of type "Object"');

		// Set default values
		if (data === undefined) data = {};
		if (headers === undefined) headers = {};

		// Generate request headers
		headers = new Headers(headers);
		if (!headers.get('Content-Type')) headers.append('Content-Type', 'application/json');

		// Generate request params
		const options = {
			method: method,
			cache: 'no-cache',
			headers: headers
		};

		// Add request params depending on request method
		if (method === 'GET') {
			url = new URL(url);
			url.search = new URLSearchParams(data).toString();
			url = url.href;
		} else {
			if (headers.get('Content-Type') === 'application/json')
				options.body = JSON.stringify(data);
			else
				options.body = new URLSearchParams(data);
		}

		// Execute request
		const response = await fetch(url, options);
		if (!response.ok) return false;

		return await response.json();
	};

	// URL validation
	// Method returns true in case of success
	static validateUrl(url) {
		try {
			new URL(url);
		} catch (e) {
			return false;
		}

		return true;
	};
}