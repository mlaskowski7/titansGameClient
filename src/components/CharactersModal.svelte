<script lang="ts">
    import type { User } from "$lib";
    import { onMount } from "svelte";

    export let currentUser: User | null;
    let username = currentUser?.username || '';
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
        position: absolute;
        background-color: white;
        color: black;
        padding: 1rem;
        border: 1px solid black;
        border-radius: 8px;
        z-index: 10;
    }
</style>

<form class="flex flex-col justify-start items-start gap-5 text-white mb-[100px] relative">
    <p>Username:</p>
    <input type="text" class="p-2 rounded-md border-black border-[1.5px] outline-none text-black" bind:value={username} placeholder="username..." required />
    <p>Character:</p>
    <div class="flex gap-4">
        <input type="number" class="p-2 rounded-md border-black border-[1.5px] outline-none text-black w-20" bind:value={character} placeholder="character..." required />
        <button type="button" on:click={togglePopover} class="text-[12px] underline-offset-2 hover:underline ease-in-out duration-300">
            Click to view all
        </button>
    </div>

    {#if showPopover}
        <div class="popover">
            <p>Select a character:</p>
            <ul>
                <li>Character 1</li>
                <li>Character 2</li>
                <li>Character 3</li>
                <!-- Add more characters as needed -->
            </ul>
        </div>
    {/if}

    <button type="button" on:click={() => {}} class="uppercase bg-accent p-2 rounded-xl font-mono font-semibold hover:brightness-75 ease-in-out duration-300">
        Update profile
    </button>
</form>
