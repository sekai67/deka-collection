<template>
	<div id="home">
		<ul>
			<li v-for="item in $store.state.accounts" v-bind:key="item.screenName">{{ item.screenName }}</li>
		</ul>
	</div>
</template>

<script>
export default {

}
</script>
