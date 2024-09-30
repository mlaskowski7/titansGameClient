<script lang="ts">

	import { lobbies } from '$lib/stores/lobbies';
	import { onMount } from 'svelte';
	import { getAllLobbies } from '$lib';
	import LobbyCard from '../../../components/LobbyCard.svelte';
	import { user } from '$lib/stores';

	let currentLobbies = $lobbies;
	let currentUser = $user;

	onMount(async () => {
		if (!currentLobbies) {
			const resp = await getAllLobbies();
			currentLobbies = resp;
			lobbies.set(resp);
		}
	})
</script>

<div class="flex flex-col w-full gap-40 ml-20 p-10 justify-center items-center">
	{#each currentLobbies ?? [] as lobby}
		<LobbyCard {lobby} currentUser={currentUser} />
	{/each}
</div>


