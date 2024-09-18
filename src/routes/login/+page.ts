import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { user } from '$lib/stores/user';
import { get } from 'svelte/store';
import { browser } from '$app/environment';
import { isUserLoggedIn } from '$lib';

export const load: PageLoad = async () => {
    if(browser && await isUserLoggedIn()) {
        throw redirect(303, '/dashboard');
    }
};