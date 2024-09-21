<script lang="ts">
	import { goto } from "$app/navigation";
    import { API_URL, getAllCharacters, type AuthResponse, type Character, type User } from "$lib";
	import { characters, user } from "$lib/stores";
	import { onMount } from "svelte";
  
    export let currentUser: User | null = $user;

    let charactersArr = $characters;
  
    // Bind form inputs to the values of `currentUser` and `currentCharacter`
    let username = currentUser?.username ?? '';
    let character = currentUser?.character.id ?? 1;
    let error: string | null = null;
	  let successMessage: null | 'Updated user successfully' = null;

  
    onMount(async () => {
        if(!charactersArr){
            const result = await getAllCharacters();
            charactersArr = result;
            characters.set(result);
        }
    });
    async function updateProfile() {
      try {
        const resp = await fetch(`${API_URL}/auth/user/${currentUser?.id}`, {
          method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, character_id: character })
        });

        if (resp.ok){
          successMessage = 'Updated user successfully'; 
				  error = null;
        } else {
          error = 'There are some problems regarding our server, please try again in couple of minutes';
          successMessage = null;
          return;
        }

        const data: User = await resp.json();

        user.set(data);
        await new Promise(resolve => setTimeout(resolve, 600));
			  window.location.reload();
      } catch (error) {
        error = 'An unexpected error occured'
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

    {#if error}
      <p style="color: red;" class="font-extrabold">{error}</p>
    {/if}

    {#if successMessage}
      <p class="text-accent font-extrabold">{successMessage}</p>
    {/if}
  </form>
  