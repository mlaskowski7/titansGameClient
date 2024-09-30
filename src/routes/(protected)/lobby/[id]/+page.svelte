<script lang="ts">

	import { lobbies } from '$lib/stores/lobbies';
	import { onMount } from 'svelte';
	import { users } from '$lib/stores';
	import { getAllLobbies, getAllUsers, getLobbyById, type Lobby, type User } from '$lib';
	import { page } from '$app/stores';

	let id = $page.params.id;

	let currentUsers = $users;


	let usersInLobby: User[] = [];
	let currentLobby: Lobby | null = null;

	onMount(async () => {
		if (!currentLobby) {
			currentLobby = await getLobbyById(id);
		}

		for(const x of currentUsers ?? []) {
			if (x.lobby?.id === currentLobby?.id) {
				usersInLobby.push(x);
			}
		}
	})
</script>

<div class="flex flex-col w-full gap-40 ml-20 p-10 justify-center items-center">
	<h1 class="tracking-wider text-accent p-4 text-[32px] uppercase">{currentLobby?.name}</h1>
	<div class="flex flex-row gap-2">
		{#each usersInLobby as current}
			<div>
				{current?.username} ({current?.points})
			</div>
		{/each}
	</div>
</div>