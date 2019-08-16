<template>
	<section id="app">
		<header>
			<h1>🐬 DEKA COLLECTION</h1>
			<router-link to="/">Home</router-link>
			<router-link to="/preference">Preference</router-link>
		</header>
		<router-view/>
	</section>
</template>

<style lang="scss">
html, body {
	padding: 0;
	margin: 0;
}
#app {
	header {
		padding: 1em 3em;
		border-bottom: 1px solid #EEE;
		min-width: 500px;
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
			color: #666;
			background-color: transparent;
			margin: 0 .5em;
			padding: .4em 1.4em;
			border-radius: .2em;
			transition: 100ms all;

			&:hover, &.router-link-exact-active {
				color: #333;
				background-color: #EEE;
			}
		}
	}
	> div {
		padding: 1em 4em;
	}
}
</style>

<script>
export default {
	async created() {
		await this.$store.dispatch("fetchAccounts");
	}
}
</script>
