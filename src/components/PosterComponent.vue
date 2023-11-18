<template>
	<div>
		<div class="filter">
			<h1>{{ tittle[filter] }}</h1>
			<div class="inputgroup" v-if="filter === 'trending'">
				<div>
					<input
						type="radio"
						name="filterTrending"
						id="day"
						value="day"
						v-model="trending"
						checked
					/>
					<label for="day">
						<span>to day</span>
					</label>
				</div>

				<div>
					<input
						type="radio"
						name="filterTrending"
						id="week"
						value="week"
						v-model="trending"
					/>
					<label for="week">
						<span>week</span>
					</label>
				</div>
			</div>
		</div>
	</div>

	<div class="containPoster">
		<router-link
			v-for="result in results"
			class="poster"
			:key="result.id"
			:to="{
				name: 'details',
				query: {
					type: typeFilter(filter),
					id: result.id,
				},
			}"
		>
			<img
				loading="lazy"
				:src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${result.poster_path}`"
			/>
			<span
				v-if="filter !== 'credits'"
				class="raiting"
				:style="{
					background:
						result.vote_average > 8
							? '#9cc485'
							: result.vote_average > 5
							? '#edbc4d'
							: '#EA4635',
				}"
			>
				{{ `${Math.round(result.vote_average * 10)}%` }}
			</span>
		</router-link>
	</div>
</template>

<script>
	import { dataFetch } from '@/fetch.js';
	// import PosterComponent from './PosterComponent.vue';
	export default {
		name: 'PosterComponent',
		props: {
			filter: String,
		},
		data() {
			return {
				tittle: {
					trending: 'trending',
					discoverMovie: 'discover movies',
					discoverTv: 'discover tv series',
				},
				results: {},
				numRound: 0,
				trending: '',
			};
		},
		methods: {
			typeFilter(urlType) {
				let type = {
					trending: 'trending',
					discoverMovie: 'movie',
					discoverTv: 'tv',
				};
				return type[urlType];
			},
		},
		watch: {
			trending(newVal) {
				dataFetch({ urlType: this.filter, filterTrending: newVal })
					.then((datas) => {
						this.results = datas.results;
					})
					.catch((error) => {
						console.error(error);
					});
			},
		},
		mounted() {
			dataFetch({ urlType: this.filter })
				.then((datas) => {
					this.results = datas.results;
					console.log(this.results);
				})
				.catch((error) => {
					console.error(error);
				});
		},
	};
</script>

<style scoped>
	h1 {
		font-size: 1.5rem;
		padding: 0 50px;
		text-transform: uppercase;
	}
	.filter {
		display: flex;
	}
	.inputgroup {
		display: flex;
		border: 2px solid #0076d6;
		width: 10rem;
		border-radius: 20px;
		overflow: hidden;
	}
	.inputgroup input {
		display: none;
		visibility: hidden;
	}
	.inputgroup div {
		flex: 1;
		display: flex;
		height: 100%;
		width: 100%;
	}
	.inputgroup label {
		display: grid;
		place-content: center;
		height: 100%;
		width: 100%;
	}
	.inputgroup input:checked + label {
		text-align: center;
		background: #0076d6;
		color: #fff;
	}

	.containPoster {
		display: flex;
		gap: 10px;
		overflow-x: auto;
		scroll-behavior: smooth;
		width: 100%;
	}
	.containPoster::-webkit-scrollbar {
		display: none;
	}
	/* .containPoster::-webkit-scrollbar-thumb {
	background: #333;
	border-radius: 5px;
}  */
	.poster {
		position: relative;
		height: 280px;
		min-width: 180px;
		border-radius: 20px;
		overflow: hidden;
		cursor: pointer;
	}
	.poster::after {
		content: '';
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgb(51, 51, 51, 0.4);
	}
	.poster img {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		object-fit: cover;
		object-position: center;
		z-index: -1;
	}
	.raiting {
		position: absolute;
		top: 10px;
		right: 10px;
		padding: 0 15px;
		border-radius: 10px;
		color: #fff;
		z-index: +1;
	}
</style>
