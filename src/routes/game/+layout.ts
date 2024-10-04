import { redirect } from '@sveltejs/kit';
import { isUserLoggedIn } from '$lib';
import { browser } from '$app/environment';
import type { LayoutLoad } from '../../../.svelte-kit/types/src/routes/(protected)/$types';

export const load: LayoutLoad = async () => {
	if(browser && !await isUserLoggedIn()){
		throw redirect(303, '/login');
	}
};
