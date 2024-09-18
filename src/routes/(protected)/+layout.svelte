<script lang="ts">
	import type { User } from "$lib";
	import { user } from "$lib/stores/user";
	import { onDestroy } from "svelte";
	import DashboardNavbar from "../../components/DashboardNavbar.svelte";

	let currentUser: User | null;

    const unsubscribe = user.subscribe(value => {
        currentUser = value;
    });

    onDestroy(() => {
        // clean up the subscription
        unsubscribe();
    });

</script>

<div class="h-[90vh] flex justify-start items-center flex-row gap-10 px-10">
	<DashboardNavbar />
	<slot />
</div>