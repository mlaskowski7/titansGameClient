<script lang="ts">
	import { goto } from '$app/navigation';
	import { API_URL } from '$lib';
	import type { AuthResponse, User } from '$lib';
	import { user } from '$lib/stores/user';
	import { get } from 'svelte/store';

	let username = '';
	let password = '';
	let error: string | null = null;
	let successMessage: null | 'Logged in succesfully' | 'Registered successfully' = null;


	async function login(): Promise<void> {
		try {
			const resp = await fetch(`${API_URL}/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, password })
			});

			if (resp.status === 404) {
				error = 'Provided credentials are invalid';
				return;
			} else if (resp.ok){
				successMessage = 'Logged in succesfully'; 
				error = null;
			} else {
				error = 'There are some problems regarding our server, please try again in couple of minutes';
				return;
			}

			const data: AuthResponse = await resp.json();

			localStorage.setItem('token', data.token);
			user.set(data.user);
			await new Promise(resolve => setTimeout(resolve, 600));
			goto('/dashboard');
		} catch (err) {
			error = 'An unexpected error occured';
		}
	}

	async function register(): Promise<void>{
		try {
			const resp = await fetch(`${API_URL}/auth/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, password })
			});
			
			if (resp.status === 400) {
				error = 'User with provided username already exist';
				return;
			} else if (resp.ok){
				successMessage = 'Registered successfully'; 
				error = null;
			} else {
				error = 'There are some problems regarding our server, please try again in couple of minutes';
				return;
			}

			const data: AuthResponse = await resp.json();

			localStorage.setItem('token', data.token);
			user.set(data.user);
			await new Promise(resolve => setTimeout(resolve, 600));
			goto('/dashboard');
		} catch (err) {
			error = 'An unexpected error occured';
		}
	}
</script>

<form class="h-[90vh] flex flex-col justify-center items-center gap-5 text-white">
	<h2 class="uppercase font-bold font-mono">Login or register to continue to game dashboard</h2>
	<input type="text" class="bg-primaryBg p-2 rounded-md border-black border-[1.5px] outline-none text-accent" bind:value={username} placeholder="username..." required />
	<input type="password" class="bg-primaryBg p-2 rounded-md border-black border-[1.5px] outline-none text-accent" bind:value={password} placeholder="password..." required />
	<div class="flex gap-10">
		<button type="button" on:click={login} class="uppercase font-mono font-semibold hover:brightness-75 ease-in-out duration-300">Login</button>
		<button type="button" on:click={register} class="uppercase font-mono font-semibold hover:brightness-75 ease-in-out duration-300">Register</button>
	</div>

	{#if error}
		<p style="color: red;" class="font-extrabold">{error}</p>
	{/if}

	{#if successMessage}
		<p class="text-accent font-extrabold">{successMessage}</p>
	{/if}
</form>
