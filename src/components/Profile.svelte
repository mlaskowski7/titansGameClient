<script lang="ts">
  import { getAllCharacters, type Character, type User } from "$lib";
  import { characters, user } from "$lib/stores/user"; // Import stores
  import { faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import {onMount } from "svelte";

  let currentUser: User | null = $user; // Automatically subscribe to `user` store
  let currentCharacter: Character | null | undefined = null;

  // Use the store shorthand ($) to access characters
  let charactersArray: Character[] | null = $characters;

  onMount(async () => {
    // Set the current character based on the user’s character_id
    if (charactersArray) {
      currentCharacter = charactersArray.find((c) => c.id === currentUser?.character_id);
    }
  });

  // Change the character by cycling through the character array
  function changeCharacter(change: number) {
    let next = (currentCharacter?.id ?? 0) + change;

    // Use the $ shorthand to access the characters array
    if (charactersArray && next <= charactersArray.length && next > 0) {
      currentCharacter = charactersArray.find((c) => next === c.id);
    }
  }
</script>

<div class="flex flex-row justify-center items-center text-[24px] font-lido gap-40 ml-20">
  <div class="flex flex-col gap-5 items-center justify-center text-center">
    <img src={`/characters/${currentCharacter?.name}/Attack/attack2.png`} alt="Character Image" class="w-[350px] h-[350px]" />
    <div class="flex flex-row gap-5 items-center justify-center">
      <button on:click={() => changeCharacter(-1)} class="hover:brightness-75 ease-in-out duration-300">
        <FontAwesomeIcon icon={faLeftLong} />
      </button>
      <div class="font-mono font-bold uppercase">{currentCharacter?.name}</div>
      <button on:click={() => changeCharacter(1)} class="hover:brightness-75 ease-in-out duration-300">
        <FontAwesomeIcon icon={faRightLong} />
      </button>
    </div>
    <div>
      <p class="text-[16px]">Strength: {currentCharacter?.strength}</p>
      <p class="text-[16px]">Health: {currentCharacter?.health}</p>
    </div>
  </div>
  <div class="flex flex-col items-start justify-center gap-2 p-5">
    <div class="text-accent uppercase font-mono">{currentUser?.username}</div>
    <div class="text-[16px]">Character: {currentUser?.character_id}</div>
    <div class="text-[16px]">Account created at: {currentUser?.created_at.split('T')[0]}</div>
    <div class="text-[16px]">Times logged in: {currentUser?.times_logged_in}</div>
  </div>
</div>
