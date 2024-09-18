<script lang="ts">
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
    import NavbarItem from './NavbarItem.svelte';
	import { faTableCells, faRankingStar, faUser, faUsers, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
	import { user } from '$lib/stores/user';
	import { goto } from '$app/navigation';

    function logout(): void {
        localStorage.removeItem('token');
        user.set(null);
        goto('/login');
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

