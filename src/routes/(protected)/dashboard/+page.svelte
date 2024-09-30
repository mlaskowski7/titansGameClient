<script lang="ts">

	import { lobbies } from '$lib/stores/lobbies';
	import { onMount } from 'svelte';
	import { getAllLobbies } from '$lib';
	import LobbyCard from '../../../components/LobbyCard.svelte';
	import { user } from '$lib/stores';

	let currentLobbies = $lobbies;
	let currentUser = $user;

	let creatingLobby: boolean = false;

	let lobbyName: string = "";
	let lobbyMaxPlayers: number = 0;

	onMount(async () => {
		if (!currentLobbies) {
			const resp = await getAllLobbies();
			currentLobbies = resp;
			lobbies.set(resp);
		}
	})
</script>

<div class="flex flex-col w-full gap-20 ml-20 p-10 justify-center items-center">
	{#if creatingLobby}
		<div class="flex flex-col gap-5 items-center justify-center text-center">
			<h1 class="mt-10 font-mono font-extrabold text-accent text-[26px] uppercase">Fill this form to create new lobby</h1>
			<p class="ml-4 text-left mt-10">Name</p>
			<input type="text" class="bg-primaryBg p-2 rounded-md border-black border-[1.5px] outline-none text-accent" bind:value={lobbyName} placeholder="name..." required />
			<p class="ml-4 text-left">Max Players</p>
			<input type="number" class="bg-primaryBg p-2 rounded-md border-black border-[1.5px] outline-none text-accent" bind:value={lobbyMaxPlayers} placeholder="max players..." required />
			<button class="rounded-xl p-4 bg-secondaryBg text-bold hover:brightness-75 duration-300 ease-in-out">Submit</button>
		</div>
	{:else}
		<div class="flex flex-row gap-2">
			{#each currentLobbies ?? [] as lobby}
				<LobbyCard {lobby} currentUser={currentUser} />
			{/each}
		</div>
	{/if}

	{#if creatingLobby}
		<button on:click={() => creatingLobby = false} class="w-[300px] uppercase rounded-xl p-4 bg-secondaryBg text-bold font-mono hover:brightness-75 duration-300 ease-in-out">
			Back to lobbies view
		</button>
	{:else}
		<button on:click={() => creatingLobby = true} class="w-[300px] uppercase rounded-xl p-4 bg-secondaryBg text-bold font-mono hover:brightness-75 duration-300 ease-in-out">
			Create new lobby
		</button>
	{/if}

</div>


