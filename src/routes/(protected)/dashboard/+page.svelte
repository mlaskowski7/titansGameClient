<script lang="ts">

	import { lobbies } from '$lib/stores/lobbies';
	import { onMount } from 'svelte';
	import { getAllLobbies } from '$lib';

	let currentLobbies = $lobbies;

	onMount(async () => {
		if (!currentLobbies) {
			const resp = await getAllLobbies();
			currentLobbies = resp;
			lobbies.set(resp);
		}
		console.log(currentLobbies);
	})
</script>

<div class="flex flex-col w-full gap-40 ml-20 p-10 justify-center items-center">

</div>


