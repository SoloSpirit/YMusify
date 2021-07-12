class Common {
	// Do request, available methods: GET, POST
	static async sendRequest(method, url, data, headers) {
		// Handle main errors
		if (!['GET', 'POST'].includes(method)) return console.error('Only GET and POST methods are available.');
		if (!Common.#validateUrl(url)) return console.error('Invalid URL for request.');
		if (headers && typeof headers !== 'object') return console.error('Headers must be of type "Object"');

		if(data === undefined) data = {};
		if(headers === undefined) headers = {};

		const options = {
			method: method,
			cors: 'no-cors',
			cache: 'no-cache',
			headers: new Headers({'Content-Type': 'application/json', ...headers})
		}

		if (method === 'GET') {
			url = new URL(url);
			url.search = new URLSearchParams(data).toString();
			url = url.href;
		} else {
			options.body = JSON.stringify(data);
		}

		console.log(options);

		const response = await fetch(url, options);
		if (!response.ok) return false;

		return await response.json();
	}

	// URL validation
	static #validateUrl(url) {
		try {
			new URL(url);
		} catch (e) {
			return false;
		}

		return true;
	}
}