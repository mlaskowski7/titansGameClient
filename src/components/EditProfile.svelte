<script lang="ts">
    import type { Character, User } from "$lib";
	import { user } from "$lib/stores/user";
  
    export let currentUser: User | null = $user;
  
    // Bind form inputs to the values of `currentUser` and `currentCharacter`
    let username = currentUser?.username ?? '';
    let characterName = '';
  
    function updateProfile() {
      if (currentUser) {
        // Update the user and character
        currentUser.username = username;
      }
    }
  </script>
  
  <form class="flex flex-col justify-start items-start gap-5 text-white">
    <p>Username:</p>
    <input
      type="text"
      class="p-2 rounded-md border-black border-[1.5px] outline-none text-black"
      bind:value={username}
      placeholder="Enter username"
    />
    <p>Character:</p>
    <input
      type="text"
      class="p-2 rounded-md border-black border-[1.5px] outline-none text-black"
      bind:value={characterName}
      placeholder="Enter character name"
    />
    <button
      type="button"
      on:click={updateProfile}
      class="uppercase bg-secondaryBg p-3 rounded-xl font-mono font-semibold hover:brightness-75 ease-in-out duration-300"
    >
      Update profile
    </button>
  </form>
  