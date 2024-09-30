<script lang="ts">

	import { lobbies } from '$lib/stores/lobbies';
	import { onMount } from 'svelte';
	import { user, users } from '$lib/stores';
	import { getAllLobbies, getAllUsers, type Lobby, type User } from '$lib';
	import { page } from '$app/stores';

	let id = $page.params.id;

	let currentLobbies = $lobbies;
	let currentUsers = $users;
	let currentUser = $user;


	let usersInLobby: User[] = [];
	let currentLobby: Lobby | undefined = currentLobbies?.find((val) => val.id === id);

	onMount(async () => {
		if (!currentLobbies) {
			const resp = await getAllLobbies();
			currentLobbies = resp;
			lobbies.set(resp);
			currentLobby = resp.find((val) => val.id === id);
		}

		if(!currentUsers) {
			const resp = await getAllUsers();
			currentUsers = resp;
			users.set(resp);
		}

		for(const x of currentUsers) {
			if (x.lobby?.id === currentLobby?.id) {
				usersInLobby.push(x);
			}
		}
	})
</script>

<div class="flex flex-col w-full gap-40 ml-20 p-10 justify-center items-center">
	<h1 class="tracking-wider text-accent p-4 text-[32px]">{currentLobby?.name}</h1>
	<div class="flex flex-row gap-2">
		{#each usersInLobby as current}
			<div>
				{current?.username} ({current?.points})
			</div>
		{/each}
	</div>
</div>