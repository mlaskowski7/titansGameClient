<script lang="ts">
	import { onMount } from 'svelte';
	import { users } from '$lib/stores';
	import { getLobbyById, LobbyState, nextLobbyState, type Lobby, type User } from '$lib';
	import { page } from '$app/stores';

	let id = $page.params.id;

	let currentUsers = $users;

	let usersInLobby: User[] = [];
	let currentLobby: Lobby | null = null;

	onMount(async () => {
		if (!currentLobby) {
			currentLobby = await getLobbyById(id);
		}

		for (const x of currentUsers ?? []) {
			if (x.lobby?.id === currentLobby?.id) {
				usersInLobby.push(x);
			}
		}
	});

	const handleNextState = async () => {
		await nextLobbyState(currentLobby?.state.toString() ?? '', currentLobby?.id ?? '');

		await new Promise((resolve) => setTimeout(resolve, 600));
		window.location.reload();
	};
</script>

<div class="flex flex-row gap-20 w-full items-center justify-between mx-40">
	<div class="flex flex-col gap-10 ml-20 p-10 justify-center items-center">
		<h1 class="tracking-wider text-accent font-extrabold p-4 text-[32px] uppercase">
			{currentLobby?.name}
		</h1>
		<div class="flex flex-row gap-2">
			<div>Max players: {currentLobby?.max_players}</div>
		</div>
		<div class="flex flex-row gap-2">
			{#each usersInLobby as current}
				<div>
					{current?.username} ({current?.points})
				</div>
			{/each}
		</div>
		<div class="flex flex-row gap-4">
			<div class="px-4 py-2 rounded-xl bg-secondaryBg uppercase font-mono">
				{currentLobby?.state}
			</div>
			{#if currentLobby?.state.toString() === 'FINISHED'}
				<button
					disabled
					class="bg-gray-700 px-2 py-1 text-[12px] rounded-xl uppercase"
					on:click={handleNextState}>Next state</button
				>
			{:else}
				<button
					class="bg-accent px-2 py-1 text-[12px] rounded-xl uppercase hover:brightness-75 duration-300 ease-in-out"
					on:click={handleNextState}>Next state</button
				>
			{/if}
		</div>
	</div>
	<div class="flex flex-col gap-2 justify-center items-center">
		<h2 class="text-accent font-extrabold text-[32px]">Lobby States</h2>
		<div class="px-4 py-2 rounded-xl bg-secondaryBg font-mono">1. WAITING -> just created</div>
		<div class="px-4 py-2 rounded-xl bg-secondaryBg font-mono">
			2. CONFIGURING -> players joining
		</div>
		<div class="px-4 py-2 rounded-xl bg-secondaryBg font-mono">3. ONGOING -> game in progress</div>
		<div class="px-4 py-2 rounded-xl bg-secondaryBg font-mono">4. FINISHED -> game finished</div>
	</div>
</div>
