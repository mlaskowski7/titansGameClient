<script lang="ts">
	import type { User } from "$lib";
    
    export let currentUser: User | null;
    let username = currentUser?.username;
    let character = 1;

    //TODO: update profile
</script>

<form class=" flex flex-col justify-start items-start gap-5 text-white mb-[100px]">
    <p>Username:</p>
	<input type="text" class=" p-2 rounded-md border-black border-[1.5px] outline-none text-black" bind:value={username} placeholder="username..." required />
	<p>Character:</p>
    <input type="number" class=" p-2 rounded-md border-black border-[1.5px] outline-none text-black" bind:value={character} placeholder="password..." required />
	<button type="button" on:click={() => {}} class="uppercase bg-accent p-2 rounded-xl font-mono font-semibold hover:brightness-75 ease-in-out duration-300">Update profile</button>
</form>