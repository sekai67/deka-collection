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
			const resp = await fetch(`${process.env.VUE_APP_API_ENDPOINT}/getProfiles`);
			if(resp.status != 200){
				return alert("Failed to fetch collection!");
			}
			commit("setAccounts", await resp.json());
		}
	},
});
