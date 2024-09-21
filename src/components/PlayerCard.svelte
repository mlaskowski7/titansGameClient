<script lang="ts">
	import { addFriend, removeFriend, type User } from "$lib";
	import Page from "../routes/login/+page.svelte";

    export let friend: User;
    export let currentUserId: string;
    export let isFriend: boolean;

    let error = '';
    let success = '';

    const addNewFriend = async (currentUserId: string, friend: User) => {
        const result = await addFriend(currentUserId, friend);

        if(result.success) {
            success = result.message;
            error = '';
            await new Promise(resolve => setTimeout(resolve, 600));
            window.location.reload();
        } else {
            success = '';
            error = result.message;
        }
    }

    const removeTheFriend = async (currentUserId: string, friend: User) => {
        const result = await removeFriend(currentUserId, friend);

        if(result.success) {
            success = result.message;
            error = '';
            await new Promise(resolve => setTimeout(resolve, 600));
            window.location.reload();
        } else {
            success = '';
            error = result.message;
        }
    }
</script>

<div class="flex flex-col gap-1">
    <div class="bg-secondaryBg uppercase font-mono p-[1.5] rounded-md">{friend.username}</div>
    <div class="text-[16px]">Character: {friend.character.name}</div>
    <div class="text-[16px]">Account created at: {friend.created_at.split('T')[0]}</div>
    <div class="text-[16px]">Times logged in: {friend.times_logged_in}</div>
    {#if isFriend}
        <button class="bg-red-600 w-40 mx-auto rounded-md hover:brightness-75 duration-300 ease-in-out mt-4" on:click={() => removeTheFriend(currentUserId, friend)}>Remove Friend</button>
    {:else}
        <button class="bg-accent w-40 mx-auto rounded-md hover:brightness-75 duration-300 ease-in-out mt-4" on:click={() => addNewFriend(currentUserId, friend)}>Add Friend</button>
    {/if}
    {#if error}
		<p style="color: red;" class="font-extrabold mt-4">{error}</p>
	{/if}

	{#if success}
		<p class="text-accent font-extrabold mt-4">{success}</p>
	{/if}
    
</div>