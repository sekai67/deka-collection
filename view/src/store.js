import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		accounts: [],
	},
	mutations: {
		setAccounts(state, accounts) {
			state.accounts = accounts;
		},
	},
	actions: {
		async fetchAccounts({commit}) {
			const resp = await fetch(`${process.env.VUE_APP_API_ENDPOINT}/getProfiles`).catch(e => new Error(e));

			if(resp instanceof Error){
				return alert(resp);
			}
			if(!resp.ok){
				return alert("HTTP Error: " + await resp.text());
			}

			commit("setAccounts", await resp.json());
		}
	},
});
