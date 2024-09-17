import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { getUserFromToken } from '$lib';
import { browser } from '$app/environment';
import { user } from '$lib/stores/user';

export const load: LayoutLoad = async () => {
	if (browser) {
		const token = localStorage.getItem('token');

		if (!token) throw redirect(303, '/login');

		const { user: obtainedUser } = await getUserFromToken(token);

		// update the global store
		if(obtainedUser) {
			user.set(obtainedUser);
		} else {
			throw redirect(303, '/login');
		}
	} else {
		throw redirect(303, '/login');
	}
	
};
