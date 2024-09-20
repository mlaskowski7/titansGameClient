<script lang="ts">
    import { getAllCharacters, type Character, type User } from "$lib";
	import { characters, user } from "$lib/stores/user";
	import { onMount } from "svelte";
  
    export let currentUser: User | null = $user;

    let charactersArr = $characters;
  
    // Bind form inputs to the values of `currentUser` and `currentCharacter`
    let username = currentUser?.username ?? '';
    let character = currentUser?.character.id ?? 1;
  
    onMount(async () => {
        if(!charactersArr){
            const result = await getAllCharacters();
            charactersArr = result;
            characters.set(result);
        }
    });
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
      class="p-2 rounded-md border-black border-[1.5px] outline-none text-accent bg-primaryBg uppercase"
      bind:value={username}
    />
    <p>Character:</p>
    <select
      class="p-2 rounded-md border-black border-[1.5px] outline-none text-accent bg-primaryBg uppercase"
      bind:value={character}
    >
        {#each charactersArr || [] as c}
            <option value={c.id}>
                {c.name}
            </option>
        {/each}
    </select>
    <button
      type="button"
      on:click={updateProfile}
      class="uppercase p-2 text-[14px] rounded-xl bg-accent font-roboto font-semibold hover:brightness-75 ease-in-out duration-300"
    >
      Update profile
    </button>
  </form>
  