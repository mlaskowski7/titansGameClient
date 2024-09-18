<script lang="ts">
	import DashboardNavbar from "../../components/DashboardNavbar.svelte";
</script>

<div class="h-[90vh] flex justify-start items-center flex-row gap-10 px-10">
	<DashboardNavbar />
	<slot />
</div>