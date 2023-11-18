<template>
	<header
		:style="{
			height: heightRef ? '100px' : '50px',
			background: heightRef ? 'transparent' : '#fff',
			color: heightRef ? '#fff' : '#000',
		}"
	>
		<div class="menu">
			<router-link
				class="logo"
				:to="this.$router.path === '/' ? scrollBahivor() : '/'"
				:style="{
					color: heightRef ? '#fff' : '#000',
				}"
				>Policine</router-link
			>

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

	<router-view />
</template>
<script>
	import { ref } from 'vue';
	import LoginSingup from '@/components/LoginSingup.vue';

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
			const heightRef = ref(true);
			window.addEventListener('resize', updateWindow);
			window.addEventListener('scroll', () => {
				heightRef.value = window.scrollY > 0 ? false : true;
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
		transition: height 0.5s ease;
	}
	.dropdown {
		cursor: default;
	}
	.logo {
		text-decoration: none;
		font-size: 2.4rem;
	}
	header .menu {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	header ul {
		list-style: none;
		display: flex;
	}
	.dropdown-content {
		display: none;
		position: absolute;
		min-width: 160px;
		z-index: 1;
		border: 1px solid #000;
	}

	.dropdown-content a {
		color: black;
		padding: 5px 10px;
		text-decoration: none;
		display: block;
	}
	.dropdown-content a:hover {
		background: #0074d3;
	}
	.dropdown:hover .dropdown-content {
		display: block;
		background: #fff;
	}

	header li {
		position: relative;
		padding: 10px 20px;
		cursor: pointer;
	}

	.singup {
		background: #333;
		color: #fff;
		padding: 5px 20px;
	}
	header a.router-link-exact-active {
		color: #0074d3;
		text-decoration: none;
	}
	header .logo.router-link-exact-active {
		color: #333;
		text-decoration: none;
	}
	header a {
		text-decoration: none;
		color: #000;
	}
</style>
