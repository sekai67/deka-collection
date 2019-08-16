<template>
	<section>
		<h1>Add new account</h1>
		<div v-if="working">Working <div class="loading dot-flashing"></div></div>
		<div v-else>
			<input type="text" v-model="account" placeholder="@deka0106">
			<button @click="newAccount">Add</button>
		</div>

		<h1>Enable or disable replies</h1>
	</section>
</template>

<style scoped lang="scss">
h1 {
	font-family: "Oswald";
	font-weight: 300;
	text-transform: uppercase;
	letter-spacing: .1em;

	&:not(:first-child) {
		margin-top: 3em;
	}
}
</style>

<script>
export default {
	data() {
		return {
			working: false,
			account: "",
		};
	},
	methods: {
		async newAccount() {
			const target = this.account.replace(/@/g, "");
			if(!target){
				return;
			}

			this.account = "";
			this.working = true;

			const resp = await fetch(`${process.env.VUE_APP_API_ENDPOINT}/updateProfile`, {
				method: "POST",
				body: JSON.stringify({target}),
				headers: {
					"Content-Type": "application/json",
				},
			}).catch(e => new Error(e));

			if(resp instanceof Error){
				this.working = false;
				return alert(resp);
			}
			if(!resp.ok){
				this.working = false;
				return alert("HTTP Error: " + await resp.text());
			}

			await this.$store.dispatch("fetchAccounts");
			this.working = false;
			this.$router.push({path: "/"});
		}
	}
}
</script>
