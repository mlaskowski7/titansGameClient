import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { isUserInGame, isUserLoggedIn } from '$lib';
import { browser } from '$app/environment';

export const load: LayoutLoad = async () => {
	if (browser && !(await isUserLoggedIn())) {
		throw redirect(303, '/login');
	}

	if (await isUserInGame()) {
		throw redirect(303, '/game');
	}
};
