<script lang="ts">
	import { users } from "$lib/stores";
	import { onMount } from "svelte";
    import Podium from "../../../components/Podium.svelte";
	import { getAllUsers } from "$lib";

    let currentUsers = $users;

    onMount(async () => {
        if(!currentUsers) {
            const resp = await getAllUsers();
            currentUsers = resp;
            users.set(resp);
        }
    })
</script>

<div class="flex flex-col w-full gap-40 ml-20 p-10 justify-center items-center">
    <Podium players={currentUsers ?? []} />
</div>