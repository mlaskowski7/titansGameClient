<script lang="ts">
    import { getAllUsers, type User } from "$lib";
	import { users, user } from "$lib/stores";
	import { onMount } from "svelte";
	import PlayerCard from "../../../components/PlayerCard.svelte";


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
                    <PlayerCard currentUserId={currentUser.id} friend={friend} isFriend={true} />
                {/each}
            {:else}
                <div>Nothing here</div>
            {/if}
        </div>
    </div>
    <div class="flex flex-col gap-5 items-center justify-center text-center">
        <h1 class="text-accent font-extrabold text-[32px] uppercase font-mono">other players</h1>
        <div class="flex flex-row gap-2 items-center justify-center">
            {#if otherUsers && otherUsers.length > 0}
                {#each otherUsers as u}
                    <PlayerCard currentUserId={currentUser?.id ?? "0"} friend={u} isFriend={false}/>
                {/each}
            {:else}
                <div>Nothing here</div>
            {/if}
        </div>
    </div>
</div>