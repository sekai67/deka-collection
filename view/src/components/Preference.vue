<template>
	<section>
		<h1>Add new account</h1>
		<div v-if="working">
			Working
			<div class="loading dot-flashing"></div>
		</div>
		<div v-else>
			<input type="text" v-model="account" placeholder="@deka0106" />
			<button @click="newAccount">Add</button>
		</div>

		<h1>Enable or disable replies</h1>
		<article v-for="(item, key) in $store.state.replies" :key="`reply-${key}`">
			<pre :id="`reply-${key}`">{{ item.text }}</pre>
			<a href="javascript:" @click="toggleReply(key, !item.enabled)">{{ item.enabled ? "disable" : "enable" }}</a>
			|
			<a href="javascript:" @click="pbcopy(key)">pbcopy</a>
		</article>
	</section>
</template>

<style scoped lang="scss">
h1 {
	font-family: "Oswald";
	font-weight: 300;
	text-transform: uppercase;
	letter-spacing: 0.1em;

	&:not(:first-child) {
		margin-top: 3em;
	}
}
article {
	display: inline-block;
	background-color: #eee;
	border-radius: 4px;

	padding: 1em;
	margin: 0 1em 1em 0;

	pre {
		word-break: break-all;
		white-space: pre-wrap;
	}
	a {
		color: #9880ff;
		text-decoration: none;
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
			if (!target) {
				return;
			}

			this.account = "";
			this.working = true;

			await this.$store.dispatch("update", target);

			this.working = false;
			this.$router.push({ path: "/" });
		},
		toggleReply(key, enabled) {
			this.$store.commit("reply", { key, enabled });
		},
		pbcopy(key) {
			const selection = document.getSelection();
			selection.selectAllChildren(document.querySelector(`#reply-${key}`));
			document.execCommand("copy");
			selection.removeAllRanges();
			alert("Copied!");
		},
	},
};
</script>
