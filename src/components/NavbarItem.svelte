<script lang="ts">
	import { page } from "$app/stores";
	import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

    export let label: string;
    export let link: string;
    export let icon: IconDefinition;

    $: currentPath = $page.url.pathname;
</script>

<a href={link} class={`uppercase font-bold bg-secondaryBg p-5 rounded-xl flex flex-row gap-2 items-center justify-center font-mono ${currentPath === link ? 'brightness-150' : ''} hover:brightness-75 ease-in-out duration-300`}>
    <FontAwesomeIcon icon={icon}/>
    {label}
</a>