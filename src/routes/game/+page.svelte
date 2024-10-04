<script lang="ts">

</script>


<div class="w-[100vw] h-[90vh] grid grid-cols-12">
	{#each Array(12 * 12	) as _, i}
		<div class="border-2 border-white flex items-center justify-center">
			{i}
		</div>
	{/each}
</div>