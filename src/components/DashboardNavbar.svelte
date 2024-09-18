<script lang="ts">
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
    import NavbarItem from './NavbarItem.svelte';
	import { faTableCells, faRankingStar, faUser, faUsers, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

    function logout(): void {

    }
</script>

<div class="flex flex-col gap-10">
    <NavbarItem label="Profile" link="/you" icon={faUser}/>
    <NavbarItem label="Friends" link="/friends" icon={faUsers}/>
    <NavbarItem label="Dashboard" link="/dashboard" icon={faTableCells}/>
    <NavbarItem label="Leaderboard" link="/dashboard" icon={faRankingStar}/>
    <button on:click={logout} class="uppercase font-bold p-5 rounded-xl flex flex-row gap-2 items-center justify-center font-mono bg-accent hover:brightness-75 ease-in-out duration-300">
        <FontAwesomeIcon icon={faRightFromBracket}/>
        logout
    </button>
</div>

