<script lang="ts">
	import type { User } from "$lib";
	import { onMount } from "svelte";
    
    export let currentUser: User | null;
    let username = currentUser?.username;
    let character = 1;

    let showPopover = false;

    // Toggle the popover visibility
    function togglePopover() {
        showPopover = !showPopover;
    }

    // Close the popover if clicked outside
    onMount(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const popover = document.querySelector('.popover');
            if (popover && !popover.contains(event.target as Node)) {
                showPopover = false;
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });
</script>

<style>
    .popover {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80vw;
        height: 80vh;
        background-color: white;
        color: black;
        padding: 2rem;
        border: 1px solid black;
        border-radius: 8px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
        z-index: 999;
    }
</style>

<form class=" flex flex-col justify-start items-start gap-5 text-white mb-[100px]">
    <p>Username:</p>
	<input type="text" class=" p-2 rounded-md border-black border-[1.5px] outline-none text-black" bind:value={username} placeholder="username..." required />
	<p>Character:</p>
    <input type="number" class=" p-2 rounded-md border-black border-[1.5px] outline-none text-black w-20" bind:value={character} placeholder="password..." required />
	<button type="button" on:click={() => {}} class="uppercase bg-accent p-2 rounded-xl font-mono font-semibold hover:brightness-75 ease-in-out duration-300">Update profile</button>
</form>