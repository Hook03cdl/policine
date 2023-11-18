<template>
	<section class="form">
		<div>
			<form class="containInput" @submit.prevent="Login">
				<h1>Policine</h1>
				<h3>Login</h3>
				<span>
					<input type="text" id="email" v-model="email" required />
					<label for="email">Email address</label>
				</span>
				<span>
					<input type="text" id="pass" v-model="pass" required />
					<label for="pass">Password</label>
				</span>
				<button type="submit" class="submit">Login</button>
				<span> Don't have an account? <a href="">Register here</a> </span>
			</form>
			<img :src="imageP" alt="" />
			<button @click="close" class="close">
				<i class="fa-solid fa-xmark"></i>
			</button>
		</div>
	</section>
</template>

<script>
import users from '@/user.json';
import image from '@/assets/img.jpg';
import { ref } from 'vue';

export default {
	name: 'LoginSingup',
	props: {
		visible: Boolean,
		close: Function,
	},
	data() {
		return {
			email: ref(''),
			pass: ref(''),
			imageP: image,
		};
	},
	watch: {
		visible() {},
	},
	methods: {
		Login() {
			let user = users.find(
				(u) => u.email === this.email && u.pass === this.pass
			);
			if (user) {
				// alert('Bienvenido ' + user.email);
				window.location.reload();
				localStorage.setItem('idUser', user.id);
			} else {
				alert('Usuario o contraseña incorrectos');
				this.email = '';
				this.pass = '';
			}
		},
	},
};
</script>

<style scoped>
.form {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 999999999999999999;
	background: rgb(0, 0, 0, 0.5);
	padding: 20px 20%;
}
.form h3,
.form h1 {
	align-self: flex-start;
}
.form h1 {
	font-size: 3rem;
}
.form div {
	position: relative;
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	border-radius: 20px;
	overflow: hidden;
}

.containInput {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 100%;
	width: 100%;
	background: #fff;
	gap: 30px;
	padding: 50px;
}
.form input {
	height: 40px;
	width: 100%;
	padding: 0 15px;
	outline: none;
}
.form input:focus {
	border: 2px solid #0076d6;
}
.form span {
	width: 100%;
	position: relative;
}
.form label {
	position: absolute;
	top: 50%;
	left: 15px;
	transform: translateY(-50%);
	background: #fff;
	padding: 0 5px;
	transition: top 0.3s ease;
}
.form input:focus + label,
.form input:valid + label {
	top: 0;
}
.submit {
	background: #4ca3eb;
	font-size: 1.2rem;
	color: #fff;
	height: 40px;
	width: 100%;
	border: none;
}
.close {
	position: absolute;
	top: 20px;
	right: 20px;
	background: #333;
	display: grid;
	place-content: center;
	height: 30px;
	width: 30px;
	border: none;
	font-size: 1.5rem;
	color: #fff;
	border-radius: 100%;
}
.form img {
	height: 100%;
	width: 100%;
	object-fit: cover;
}
</style>
