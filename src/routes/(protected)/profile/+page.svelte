<script lang="ts">
    import { getAllCharacters, type Character, type User } from "$lib";
    import { characters, user } from "$lib/stores/user"; // Import stores
    import Profile from "../../../components/Profile.svelte";
    import EditProfile from "../../../components/EditProfile.svelte"; // Import EditProfile
	import { onMount } from "svelte";
  
    onMount(async () => {
        // Fetch all characters and update the `characters` store
        const fetchedCharacters = await getAllCharacters();
        characters.set(fetchedCharacters);
    });
  </script>
  
  <div class="flex flex-row gap-20 p-10 justify-center items-center">
    <Profile />
    <EditProfile />
  </div>
  