<script lang="ts">
    import type { User } from "$lib";
	import { user } from "$lib/stores/user";
	import { onDestroy } from "svelte";
	import Profile from "../../../components/Profile.svelte";
	import ProfileStats from "../../../components/EditProfile.svelte";
	import EditProfile from "../../../components/EditProfile.svelte";

    let currentUser: User | null;

    const unsubscribe = user.subscribe(value => {
        currentUser = value;
    });

    onDestroy(() => {
        // clean up the subscription
        unsubscribe();
    });
</script>

<div class="flex flex-row gap-20 p-10 justify-center items-center">
    <Profile currentUser={currentUser} />
    <EditProfile currentUser={currentUser} />
    
</div>