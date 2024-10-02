<script lang="ts">
	import {
		exitLobby,
		getAllUsers,
		getUserFromToken,
		type Lobby,
		LobbyState,
		type User
	} from '$lib';
	import { joinLobby } from '$lib';
	import { user, users } from '$lib/stores';
	import { onMount } from 'svelte';

	export let lobby: Lobby;
	export let currentUser: User | null;
	let currentUsers: User[] | null = $users;
	let playersCounter = 0;

	const countPlayers = () => {
		for (const i of currentUsers ?? []) {
			if (i.lobby?.id === lobby?.id) {
				playersCounter++;
			}
		}
	};

	countPlayers();

	let isUserInLobby: boolean = currentUser?.lobby?.id === lobby.id;

	let error = '';
	let success = '';

	onMount(async () => {
		if (!currentUsers) {
			const resp = await getAllUsers();
			currentUsers = resp;
			users.set(resp);
		}
		countPlayers();
	});

	const join = async () => {
		const result = await joinLobby(currentUser?.id ?? '', lobby.id);

		if (result.success) {
			error = '';
			success = result.message;

			const userResult = await getUserFromToken(localStorage.getItem('token') ?? '');
			user.set(userResult.user ?? null);
			await new Promise((resolve) => setTimeout(resolve, 600));
			window.location.reload();
		} else {
			success = '';
			error = result.message;
			await new Promise((resolve) => setTimeout(resolve, 600));
			window.location.reload();
		}
	};

	const exit = async () => {
		const result = await exitLobby(currentUser?.id ?? '');

		if (result.success) {
			error = '';
			success = result.message;

			const userResult = await getUserFromToken(localStorage.getItem('token') ?? '');
			user.set(userResult.user ?? null);
			await new Promise((resolve) => setTimeout(resolve, 600));
			window.location.reload();
			countPlayers();
		} else {
			success = '';
			error = result.message;
			await new Promise((resolve) => setTimeout(resolve, 600));
			window.location.reload();
		}
	};
</script>

<div
	class={`flex flex-col gap-1 ${isUserInLobby ? 'bg-accent' : 'bg-secondaryBg'} py-4 px-6 items-center justify-center rounded-xl`}
>
	<div class="uppercase font-mono p-[1.5] rounded-md font-extrabold">{lobby.name}</div>
	<div class="text-[16px]">State: {lobby.state}</div>
	<div class="text-[16px]">Players in: {playersCounter}</div>
	<div class="text-[16px]">Max players: {lobby.max_players}</div>
	<a
		href={`/lobby/${lobby.id}`}
		class={` ${isUserInLobby ? 'bg-secondaryBg' : 'bg-primaryBg'} w-40 mx-auto rounded-md hover:brightness-75 duration-300 ease-in-out mt-4 text-center`}
		>View</a
	>
	{#if isUserInLobby}
		<button
			class="bg-secondaryBg w-40 mx-auto rounded-md hover:brightness-75 duration-300 ease-in-out"
			on:click={exit}>Exit</button
		>
	{:else if lobby.state.toString() === 'CONFIGURING'}
		<button
			class="bg-primaryBg w-40 mx-auto rounded-md hover:brightness-75 duration-300 ease-in-out"
			on:click={join}>Join</button
		>
	{/if}
	{#if error}
		<p style="color: red;" class="font-extrabold mt-4">{error}</p>
	{/if}

	{#if success}
		<p class={`${isUserInLobby ? 'text-secondaryBg' : 'text-accent'} font-extrabold mt-4`}>
			{success}
		</p>
	{/if}
</div>
