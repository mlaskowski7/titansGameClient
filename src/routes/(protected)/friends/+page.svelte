<script lang="ts">
    import { getAllUsers, type User } from "$lib";
	import { users, user } from "$lib/stores";
	import { onMount } from "svelte";


    let currentUser: User | null = $user;
    let currentUsers: User[] | null = $users;
    let otherUsers: User[] | null = null;

    onMount(async () => {
        if(!currentUsers) {
            const resp = await getAllUsers();
            currentUsers = resp;
            users.set(resp);
        }

        otherUsers = currentUsers.filter((u) => 
            !currentUser?.friends.some(friend => friend.id === u.id) && u.id !== currentUser?.id
        );

    })
</script>

<div class="flex flex-col w-full gap-40 ml-20 p-10 justify-center items-center">
    <div class="flex flex-col gap-5 items-center justify-center text-center">
        <h1 class="text-accent font-extrabold text-[32px] uppercase font-mono">your friends</h1>
        <div class="flex flex-row gap-2">
            {#if currentUser && currentUser.friends.length > 0}
                {#each currentUser.friends as friend}
                    <div class="flex flex-col gap-1">
                        <div class="bg-secondaryBg uppercase font-mono p-[1.5] rounded-md">{friend.username}</div>
                        <div class="text-[16px]">Character: {friend.character.name}</div>
                        <div class="text-[16px]">Account created at: {friend.created_at.split('T')[0]}</div>
                        <div class="text-[16px]">Times logged in: {friend.times_logged_in}</div>
                    </div>
                {/each}
            {/if}
        </div>
    </div>
    <div class="flex flex-col gap-5 items-center justify-center text-center">
        <h1 class="text-accent font-extrabold text-[32px] uppercase font-mono">other players</h1>
        <div class="flex flex-row gap-2">
            {#if otherUsers && otherUsers.length > 0}
                {#each otherUsers as u}
                    <div class="flex flex-col gap-1">
                        <div class="bg-secondaryBg uppercase font-mono p-[1.5] rounded-md">{u.username}</div>
                        <div class="text-[16px]">Character: {u.character.name}</div>
                        <div class="text-[16px]">Account created at: {u.created_at.split('T')[0]}</div>
                        <div class="text-[16px]">Times logged in: {u.times_logged_in}</div>
                    </div>
                {/each}
            {/if}
        </div>
    </div>
</div>