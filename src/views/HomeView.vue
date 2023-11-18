<template>
	<div class="home">
		<MovieRecommended />
		<section class="catalogue">
			<PosterComponent filter="trending" />
			<PosterComponent filter="discoverMovie" />
			<PosterComponent filter="discoverTv" />
		</section>
	</div>
</template>

<script>
import PosterComponent from '@/components/PosterComponent.vue';
import MovieRecommended from '@/components/MovieRecommended.vue';
export default { components: { PosterComponent, MovieRecommended } };
</script>
