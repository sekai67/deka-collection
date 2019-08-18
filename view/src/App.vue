<template>
	<section>
		<header>
			<h1>🐬 DEKA COLLECTION</h1>
			<router-link to="/">Home</router-link>
			<router-link to="/preference">Preference</router-link>
		</header>
		<section v-if="loading">Loading <div class="loading dot-flashing"></div></section>
		<router-view v-else />
	</section>
</template>

<style>
html, body {
	padding: 0;
	margin: 0;
}
.loading {
	display: inline-block;
	margin-left: 20px;
}
</style>

<style scoped lang="scss">
header {
	padding: 1em 3em;
	border-bottom: 1px solid #EEE;
	min-width: 560px;
	display: flex;

	h1 {
		font-family: "Oswald";
		font-weight: 400;
		font-size: 24px;
		color: #333;
		margin: 0;
		margin-right: 2em;
	}
	a {
		display: block;
		text-decoration: none;
		color: #9880ff;
		background-color: transparent;
		margin: 0 .5em;
		padding: .4em 1.4em;
		border-radius: .2em;
		transition: 100ms all;

		&:hover, &.router-link-exact-active {
			background-color: #EEE;
		}
	}
}
section > section {
	padding: 1em 4em;
}
</style>

<script>
export default {
	data() {
		return {
			loading: true,
		};
	},
	async created() {
		await this.$store.dispatch("fetchAccounts");
		this.loading = false;
	}
}
</script>
