import Vuex from "vuex";

import replies from "./assets/reply";

export default new Vuex.Store({
	state: {
		replies: replies.map(text => ({ text, enabled: false })),
		accounts: [],
	},
	mutations: {
		setAccounts(state, accounts) {
			state.accounts = accounts.sort((a, b) => a.screenName.toLowerCase() > b.screenName.toLowerCase());
		},
		reply(state, { key, enabled }) {
			state.replies[key].enabled = enabled;
		},
	},
	actions: {
		async fetchAccounts({ commit }) {
			const resp = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/getProfiles`).catch(e => new Error(e));

			if (resp instanceof Error) {
				return alert(resp);
			}
			if (!resp.ok) {
				return alert("HTTP Error: " + await resp.text());
			}

			commit("setAccounts", await resp.json());
		}
	},
});
