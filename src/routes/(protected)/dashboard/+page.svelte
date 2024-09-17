<script lang="ts">
	import type { User } from '$lib';
	import { user } from '$lib/stores/user';
	import { onDestroy } from 'svelte';

	let currentUser: User | null;

	const unsubscribe = user.subscribe(value => {
		currentUser = value;
	});

	onDestroy(() => {
		// clean up the subscription
		unsubscribe();
	})

</script>

{#if user}
	<h1>Welcome, {currentUser?.username}!</h1>
	<p>HERE WILL BE THE DASHBOARD</p>
{:else}
	<p>Loading...</p>
{/if}
