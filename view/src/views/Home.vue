<template>
	<section>
		<article v-for="item in $store.state.accounts" :key="item.screenName">
			<img :src="`https://res.cloudinary.com/narusejun/image/twitter_name/h_200/${item.screenName}.jpg`">
			<div class="content">
				<h2>{{ item.name }}</h2>
				<h3>@{{ item.screenName }}</h3>
				<p>{{ item.bio }}</p>
			</div>
			<div class="action">
				クソリプ
			</div>
		</article>
	</section>
</template>

<style scoped lang="scss">
section {
	display: flex;
}
article {
	box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
	margin: 1em 1em 0 0;
	display: flex;
	flex-direction: column;

	$radius: 4px;
	border-radius: $radius;

	$card-size: 200px;
	width: $card-size;

	img {
		flex: 0 0 auto;
		border-radius: $radius $radius 0 0;
		width: $card-size;
		height: $card-size;
	}
	.content {
		flex: 1 0 auto;
		word-break: break-all;
		padding: .8em 1.2em;

		h2 {
			margin: 0;
			font-weight: 400;
			color: #444;
		}
		h3 {
			margin: 0;
			font-weight: 400;
			font-size: .8em;
			line-height: 1em;
			color: #888;
		}
		p {
			color: #666;
		}
	}
	.action {
		flex: 0 0 auto;
		color: #9880ff;
		border-top: 1px solid #EEE;
		text-align: center;
		padding: .6em;
		cursor: pointer;
		transition: 100ms all;

		&:hover {
			background-color: #EEE;
		}
	}
}
</style>

<script>
export default {

}
</script>
