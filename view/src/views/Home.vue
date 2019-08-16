<template>
	<section>
		<ul>
			<li v-for="item in $store.state.accounts" v-bind:key="item.screenName">{{ item.screenName }}</li>
		</ul>
	</section>
</template>

<style scoped lang="scss">

</style>

<script>
export default {

}
</script>
