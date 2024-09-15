<script lang="ts">
	import type { User } from '$lib/types';
	import { page } from '$app/stores';

	let user: User;
	let message: string;

	$: user = $page.data.user;
	$: message = $page.data.message;
</script>

{#if user}
	<h1>Welcome, {user.username}!</h1>
	<p>HERE WILL BE THE DASHBOARD</p>
{:else}
	<p>Loading...</p>
{/if}
