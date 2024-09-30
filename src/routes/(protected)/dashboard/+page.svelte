<script lang="ts">

	import { lobbies } from '$lib/stores/lobbies';
	import { onMount } from 'svelte';
	import { createLobby, getAllLobbies, getUserFromToken } from '$lib';
	import LobbyCard from '../../../components/LobbyCard.svelte';
	import { user } from '$lib/stores';

	let currentLobbies = $lobbies;
	let currentUser = $user;

	let creatingLobby: boolean = false;

	let lobbyName: string = "";
	let lobbyMaxPlayers: number = 0;
	let error = "";
	let success = "";

	onMount(async () => {
		if (!currentLobbies) {
			const resp = await getAllLobbies();
			currentLobbies = resp;
			lobbies.set(resp);
		}
	})

	const handleCreateLobby = async () => {
		if(lobbyName === "" || lobbyMaxPlayers === 0) {
			error = "Please fill all the inputs";
			return;
		}

		const result = await createLobby(lobbyName, 0, lobbyMaxPlayers);

		if(result.success) {
			error = '';
			success = result.message;

			await new Promise(resolve => setTimeout(resolve, 600));
			window.location.reload();
		} else {
			success = '';
			error = result.message;
			await new Promise(resolve => setTimeout(resolve, 600));
			window.location.reload();
		}
	}
</script>

<div class="flex flex-col w-full gap-20 ml-20 p-10 justify-center items-center">
	{#if creatingLobby}
		<div class="flex flex-col gap-5 items-center justify-center text-center">
			<h1 class="mt-10 font-mono font-extrabold text-accent text-[26px] uppercase">Fill this form to create new lobby</h1>
			<p class="ml-4 text-left mt-10">Name</p>
			<input type="text" class="bg-primaryBg p-2 rounded-md border-black border-[1.5px] outline-none text-accent" bind:value={lobbyName} placeholder="name..." required />
			<p class="ml-4 text-left">Max Players</p>
			<input type="number" class="bg-primaryBg p-2 rounded-md border-black border-[1.5px] outline-none text-accent" bind:value={lobbyMaxPlayers} placeholder="max players..." required />
			<button class="rounded-xl px-4 py-2 bg-secondaryBg text-bold hover:brightness-75 duration-300 ease-in-out" on:click={handleCreateLobby}>Submit</button>
			{#if error}
				<p style="color: red;" class="font-extrabold mt-4">{error}</p>
			{/if}

			{#if success}
				<p class="text-accent font-extrabold mt-4">{success}</p>
			{/if}
		</div>
	{:else}
		<div class="flex flex-row gap-2">
			{#each currentLobbies ?? [] as lobby}
				<LobbyCard {lobby} currentUser={currentUser} />
			{/each}
		</div>
	{/if}

	{#if creatingLobby}
		<button on:click={() => creatingLobby = false} class="w-[300px] uppercase font-bold tracking-wide rounded-xl p-4 bg-secondaryBg text-bold font-mono hover:brightness-75 duration-300 ease-in-out">
			Back to lobbies view
		</button>
	{:else}
		<button on:click={() => creatingLobby = true} class="w-[300px] uppercase font-bold tracking-wide rounded-xl p-4 bg-secondaryBg text-bold font-mono hover:brightness-75 duration-300 ease-in-out">
			Create new lobby
		</button>
	{/if}

</div>


