"use strict";

process.env.VUE_APP_API_ENDPOINT =
	process.env.NODE_ENV === "production"
		? "https://asia-northeast1-deka-collection.cloudfunctions.net"
		: "http://localhost:5001/deka-collection/asia-northeast1";

module.exports = {

};
