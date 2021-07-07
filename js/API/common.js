class Common {
	// Do request, available methods: GET, POST
	static async sendRequest(method, url, data, headers) {
		// Handle main errors
		if (!['GET', 'POST'].includes(method)) return console.error('Only GET and POST methods are available.');
		if (!Common.#validateUrl(url)) return console.error('Invalid URL for request.');
		if (headers && typeof headers !== 'object') return console.error('Headers must be of type "Object"');

		const options = {
			method: method,
			mode: 'no-cors',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json',
				...headers
			}
		}

		if (method === 'GET') {
			url = new URL(url);
			url.search = new URLSearchParams(data).toString();
			url = url.href;
		} else {
			options.body = JSON.stringify(data);
		}

		const response = await fetch(url, options);
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