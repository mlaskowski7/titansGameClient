import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { getUserFromToken } from '$lib/serverCommunication';

export const load: LayoutLoad = async () => {
	const token = localStorage.getItem('token');

	if (!token) throw redirect(303, '/login');

	const { user } = await getUserFromToken(token);

	return { user };
};
