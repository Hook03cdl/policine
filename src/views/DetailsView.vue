<template>
	<section class="details">
		<div
			class="first"
			:style="{
				background: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${result.backdrop_path})`,
				backgroundRepeat: 'none',
				backgroundSize: 'cover',
				backgroundPosition: 'top',
			}"
		>
			<div class="image">
				<img
					:src="`	https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${result.poster_path}`"
				/>
				<span>{{ `${Math.round(result.vote_average * 10)}%` }}</span>
			</div>
			<div class="inf">
				<h1 class="tittle">
					{{ tittle }}
					<span>{{ year }}</span>
				</h1>
				<ul>
					<li v-for="(gener, i) in result.genres" :key="i">
						{{ `#${gener.name}` }}
					</li>
				</ul>
				<p>{{ result.overview }}</p>
			</div>
		</div>
		<section class="contain2">
			<div class="credits">
				<div v-for="actor in credits" :key="actor.id">
					<img
						loading="lazy"
						:src="`https://www.themoviedb.org/t/p/w138_and_h175_face/${actor.profile_path}`"
						alt=""
					/>
					<div class="names">
						<h3>{{ actor.name }}</h3>
						<h4>{{ actor.character }}</h4>
					</div>
				</div>
			</div>
			<article>
				<h2>Keyword</h2>
				<div class="containKeywords">
					<span v-for="keyword in keywords">
						{{ keyword.name }}
					</span>
				</div>
			</article>
		</section>
		<section class="galery">
			<h2>Galery</h2>
			<div class="containGalery">
				<img
					v-for="image in images"
					:src="`https://www.themoviedb.org/t/p/w533_and_h300_bestv2/${image.file_path}`"
				/>
			</div>
		</section>
	</section>
</template>

<script>
import { dataFetch } from '@/fetch';
export default {
	name: 'Details',
	data() {
		return {
			result: {},
			images: {},
			credits: {},
			keywords: {},
			year: '',
			tittle: '',
		};
	},
	mounted() {
		dataFetch({
			urlType: 'details',
			selectId: this.$route.query.id,
			selectType: this.$route.query.type,
		}).then((data) => {
			this.result = data;
			this.year =
				this.$route.query.type === 'tv'
					? new Date(data.last_air_date).getFullYear()
					: new Date(data.release_date).getFullYear();
			this.tittle =
				this.$route.query.type === 'tv' ? data.name : data.original_title;
			// console.log(this.result);
		});
		dataFetch({
			urlType: 'images',
			selectId: this.$route.query.id,
			selectType: this.$route.query.type,
		}).then((data) => {
			this.images = data.backdrops;
		});
		dataFetch({
			urlType: 'credits',
			selectId: this.$route.query.id,
			selectType: this.$route.query.type,
		}).then((data) => {
			this.credits = data.cast;
		});
		dataFetch({
			urlType: 'keywords',
			selectId: this.$route.query.id,
			selectType: this.$route.query.type,
		}).then((data) => {
			this.keywords =
				this.$route.query.type === 'tv' ? data.results : data.keywords;
		});
	},
};
</script>

<style scoped>
.first {
	position: relative;
	height: 100vh;
	width: 100%;
	display: grid;
	place-items: center;
	grid-template-columns: 0.5fr 1.5fr;
	padding: 100px 50px 0;
	gap: 30px;
	color: #fff;
	margin-bottom: 50px;
}
.first::after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(0, 0, 0, 0.8);
}
.image {
	position: relative;
	display: flex;
	z-index: +1;
	box-shadow: 0 0 30px #0074d3;
	border-radius: 10px;
}
.image img {
	height: 450px;
	border-radius: 10px;
	width: auto;
}
.image span {
	position: absolute;
	display: grid;
	place-content: center;
	height: 60px;
	width: 60px;
	top: -25px;
	right: -25px;
	background: #0074d3;
	border-radius: 50%;
	font-size: 1.3rem;
	font-weight: 800;
}
.inf {
	padding: 0 30px;
	z-index: +1;
	& ul {
		display: flex;
		list-style: none;
		gap: 10px;
	}
}
.tittle {
	font-size: 3rem;
	& span {
		font-size: 1.3rem;
	}
}
.credits {
	display: flex;
	gap: 20px;
	overflow-x: auto;
	padding: 50px;
	& div {
		box-shadow: 0 0 1px #000;
		border-radius: 20px;
		& .names {
			box-shadow: none;
			padding: 10px;
			& h3 {
				font-size: 1.1rem;
				font-weight: 600;
			}
			& h4 {
				font-size: 1rem;
				font-weight: 400;
			}
		}
	}
}
.credits img {
	border-radius: 20px;
}

.credits::-webkit-scrollbar,
.containGalery::-webkit-scrollbar {
	display: none;
}

.contain2 {
	display: grid;
	grid-template-columns: 1.4fr 0.6fr;
	gap: 30px;
	& .containKeywords {
		display: flex;
		flex-wrap: wrap;
		padding: 0 20px;
		gap: 10px;
		& span {
			background: #ccc;
			padding: 0 5px;
			border-radius: 5px;
		}
	}
}
.galery {
	padding: 0 50px;
	margin-bottom: 50px;
	& h2 {
		font-size: 2.5rem;
		font-weight: 600;
	}
	& .containGalery {
		display: flex;
		overflow-x: auto;
		& img {
			width: auto;
			object-fit: cover;
		}
	}
}
</style>
