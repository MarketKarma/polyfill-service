/* eslint-env mocha */

"use strict";

const request = require("supertest");
const host = require("../helpers").host;

describe("Request with a If-Modified-Since value which is the same as the lastModified", function() {
	it(`responds with a 304 and an Age reset to 0`, function() {
		this.timeout(30000);
		return request(host)
			.get("/v3/polyfill.min.js")
			.expect(200)
			.then(response => {
				const lastModified = response.headers["last-modified"];

				return request(host)
					.get("/v3/polyfill.min.js")
					.set("if-modified-since", lastModified)
					.expect(304)
					.expect("Age", "0");
			});
	});
});

describe("Request with a If-Modified-Since value which is different to the lastModified", function() {
	it(`responds with a 200 and an Age reset to 0`, function() {
		this.timeout(30000);
		return request(host)
			.get("/v3/polyfill.min.js")
			.expect(200)
			.then(response => {
				const lastModified = response.headers["last-modified"];

				return request(host)
					.get("/v3/polyfill.min.js")
					.set("if-modified-since", lastModified)
					.expect(304)
					.expect("Age", "0");
			});
	});
});
