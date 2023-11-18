<template>
	<header :style="{ height: heightRef }">
		<div class="menu">
			<a class="logo" href="#">Policine</a>
			<ul v-if="windowWidht">
				<li><link-router to="/details">discover</link-router></li>
				<li>trending</li>
				<li>popular</li>
				<li>categories</li>
			</ul>
			<button v-if="!userActive" class="singup" @click="mostrar = true">
				Sing Up
			</button>
			<div class="search" v-else>
				<input type="text" />
				<button @click="Search">
					<i class="fa-solid fa-magnifying-glass"></i>
				</button>
			</div>
		</div>
	</header>
	<LoginSingup v-if="mostrar" :close="close" />
</template>

<script>
import { ref } from 'vue';
import LoginSingup from './LoginSingup.vue';

export default {
	components: {
		LoginSingup,
	},
	data() {
		return {
			userActive: localStorage.getItem('idUser'),
			mostrar: ref(false),
		};
	},
	setup() {
		const windowWidht = ref(window.innerWidth >= 1024);
		const heightRef = ref('100px');
		window.addEventListener('resize', updateWindow);
		window.addEventListener('scroll', () => {
			heightRef.value = window.scrollY > 0 ? '50px' : '100px';
		});

		function updateWindow() {
			windowWidht.value = window.innerWidth >= 1024;
		}
		return {
			windowWidht,
			heightRef,
		};
	},

	methods: {
		Search() {
			localStorage.removeItem('idUser');
		},
		close() {
			this.mostrar = false;
			console.log(this.mostrar);
		},
	},
};
</script>

<style scoped>
header {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 100px;
	padding: 0 50px;
	font-size: 1rem;
	text-transform: uppercase;
	z-index: 99999999999;
	background: #fff;
	transition: height 0.5s ease;
}
.logo {
	text-decoration: none;
	font-size: 2.4rem;
	color: #000;
}
header .menu {
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.actions {
	display: flex;
	height: 100%;
	align-items: center;
}
header ul {
	list-style: none;
	display: flex;
}
header li {
	position: relative;
	padding: 10px 20px;
}
header li::after {
	content: '';
	position: absolute;
	top: 0;
	right: 0;
	width: 0;
	height: 3px;
	background: #9cc485;
	transition: width 0.5s ease-out;
}
header li::before {
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	width: 0;
	height: 3px;
	background: #1c4f47;
	transition: width 0.5s ease-out;
}
header li:hover::before,
header li:hover::after {
	width: 100%;
}
.singup {
	background: #333;
	color: #fff;
	padding: 5px 20px;
}
</style>
