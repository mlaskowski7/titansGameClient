import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { getUserFromToken } from '$lib/serverCommunication';
import { browser } from '$app/environment';

export const load: LayoutLoad = async () => {
	if (browser) {
		const token = localStorage.getItem('token');

		if (!token) throw redirect(303, '/login');

		const { user } = await getUserFromToken(token);

		return { user };
	} else {
		throw redirect(303, '/login');
	}
	
};
