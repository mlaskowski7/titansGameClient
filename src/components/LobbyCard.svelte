<script lang="ts">
	import type { Lobby, User } from '$lib';
	import { joinLobby } from '$lib';

	export let lobby: Lobby;
	export let user: User | null;
	export let users: User[] | null;

	let playersCounter = 0;
	for(const i of users ?? []) {
		if (i.lobby_id === lobby.id) {
			playersCounter++;
		}
	}

	let isUserInLobby: boolean = user?.lobby_id === lobby.id;

	let error = '';
	let success = '';

	const join = async () => {
		const result = await joinLobby(user?.id ?? "", lobby.id);

		if(result.success) {
			error = '';
			success = result.message;
		} else {
			success = '';
			error = result.message;
		}
	}

</script>

<div class={`flex flex-col gap-1 ${ isUserInLobby ? "bg-accent" : "bg-secondaryBg"} p-4 items-center justify-center rounded-xl`}>
	<div class="uppercase font-mono p-[1.5] rounded-md font-extrabold">{lobby.name}</div>
	<div class="text-[16px]">State: {lobby.state}</div>
	<div class="text-[16px]">Players in: {playersCounter}</div>
	<div class="text-[16px]">Max players: {lobby.max_players}</div>
	{#if isUserInLobby}
		<button class="bg-primaryBg w-40 mx-auto rounded-md hover:brightness-75 duration-300 ease-in-out mt-4">Exit Lobby</button>
	{:else}
		<button class="bg-primaryBg w-40 mx-auto rounded-md hover:brightness-75 duration-300 ease-in-out mt-4" on:click={join}>Join Lobby</button>
	{/if}
	{#if error}
		<p style="color: red;" class="font-extrabold mt-4">{error}</p>
	{/if}

	{#if success}
		<p class="text-accent font-extrabold mt-4">{success}</p>
	{/if}

</div>