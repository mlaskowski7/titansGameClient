<script lang="ts">
	import { goto } from '$app/navigation';
	import { API_URL } from '$lib';
	import type { User } from '$lib/types';

	let username = '';
	let password = '';
	let error: string | null = null;

	interface LoginResponse {
		token: string;
		user: User;
		message: string;
	}

	async function login(): Promise<void> {
		try {
			const resp = await fetch(`${API_URL}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, password })
			});

			const data: LoginResponse = await resp.json();

			if (!resp.ok) {
				error = data.message || 'Login Failed';
				return;
			}

			localStorage.setItem('token', data.token);
			goto('/');
		} catch (err) {
			error = 'Login Failed';
		}
	}
</script>

<form on:submit|preventDefault={login}>
	<input type="text" bind:value={username} placeholder="username..." required />
	<input type="password" bind:value={password} placeholder="password..." required />
	<button type="submit">Login</button>

	{#if error}
		<p style="color: red;">{error}</p>
	{/if}
</form>
