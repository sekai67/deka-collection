import Vuex from "vuex";

import replies from "./assets/reply";

export default new Vuex.Store({
	state: {
		replies: replies.map(text => ({ text, enabled: false })),
		accounts: [],
	},
	mutations: {
		addAccount(state, account) {
			const accounts = state.accounts.filter(({ screen_name }) => screen_name != account.screen_name);
			accounts.push(account);
			state.accounts = accounts.sort((a, b) => a.screen_name.toLowerCase() > b.screen_name.toLowerCase());
		},
		setAccounts(state, accounts) {
			state.accounts = accounts.sort((a, b) => a.screen_name.toLowerCase() > b.screen_name.toLowerCase());
		},
		reply(state, { key, enabled }) {
			state.replies[key].enabled = enabled;
		},
	},
	actions: {
		async update({ commit }, id) {
			const resp = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/update?id=${id}`).catch(e => new Error(e));

			if (resp instanceof Error) {
				return alert(resp);
			}
			if (!resp.ok) {
				return alert(`HTTP Error: ${await resp.text()}`);
			}

			commit("addAccount", await resp.json());
		},
		async list({ commit }) {
			const resp = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/list`).catch(e => new Error(e));

			if (resp instanceof Error) {
				return alert(resp);
			}
			if (!resp.ok) {
				return alert(`HTTP Error: ${await resp.text()}`);
			}

			commit("setAccounts", await resp.json());
		}
	},
});
