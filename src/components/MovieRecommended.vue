<template>
	<div class="contain">
		<img
			:src="`https://image.tmdb.org/t/p/original/${recommended.backdrop_path}`"
			alt=""
		/>
		<section class="description">
			<h2>
				recommended
				<span class="raitingRecommended">
					{{ `${Math.round(recommended.vote_average * 10)}%` }}
				</span>
			</h2>
			<h1>
				{{ recommended.original_title }}
			</h1>

			<p>{{ recommended.overview }}</p>
			<button class="watch" :key="recommended.id">
				Watch now
				<span><i class="fa-solid fa-arrow-right"></i></span>
			</button>
		</section>
	</div>
</template>

<script>
import { dataFetch } from '@/fetch.js';
export default {
	data() {
		return {
			recommended: {},
		};
	},
	mounted() {
		dataFetch({ urlType: 'recommended', filterTrending: 'movie' })
			.then((datas) => {
				this.recommended = datas.results.reduce((vote, movie) =>
					vote.vote_average > movie.vote_average ? vote : movie
				);
			})
			.catch((error) => {
				console.error(error);
			});
	},
};
</script>

<style scoped>
.contain {
	position: relative;
	min-height: 100vh;
	width: 100vw;
	display: grid;
	grid-template-columns: 1.3fr 0.7fr;
	transition: left 1s ease;
	box-sizing: border-box;
	padding-top: 100px;
	margin-bottom: 20px;
}
.contain::after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.8);
}
.contain img {
	position: absolute;
	top: 0;
	left: 0;
	object-fit: cover;
	object-position: top;
	height: 100%;
	width: 100%;
}
.description {
	height: 100%;
	max-width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	gap: 10px;
	color: #fff;
	padding: 0 50px;
	z-index: +1;
}
.contain p {
	width: 100%;
	text-transform: uppercase;
}
.description h1 {
	font-size: 3rem;
	font-weight: bolder;
	letter-spacing: 5px;
	display: flex;
	width: 100%;
}
.description h2 {
	font-size: 2rem;
	align-self: flex-start;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.watch {
	position: relative;
	border: 2px solid #edbc4d;
	width: min(100%, 300px);
	height: 40px;
	border-radius: 25px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 30px;
	padding-left: 10px;
	overflow: hidden;
	background: none;
	color: #d5f0c7;
	font-size: 1.5rem;
	z-index: 2;
}
.watch::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 0;
	background: #edbc4d;
	transition: width 0.3s ease;
	z-index: -1;
}
.watch:hover::before {
	width: 100%;
}
.watch span {
	display: grid;
	place-items: center;
	height: 40px;
	width: 40px;
}
.raitingRecommended {
	font-size: 1.3rem;
	height: 33px;
	background: #edbc4d;
	padding: 0 20px;
	border-radius: 15px;
}

@media (200px <= width <= 1024px) {
	.contain {
		grid-template-columns: 1fr;
	}
	.description {
		padding: 0 20px;
	}
}
@media (200px<= width <= 500px) {
	.description h1 {
		font-size: 2rem;
		letter-spacing: normal;
	}
	.description h2 {
		font-size: 1.5rem;
	}
}
</style>
