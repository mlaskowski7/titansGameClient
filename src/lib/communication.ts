import { API_URL } from './constants';
import type { AuthResponse, User } from './types';


export async function getUserFromToken(token: string): Promise<{ user?: User; message?: string }> {
	try {
		const resp = await fetch(`${API_URL}/auth/checkToken`, {
			method: 'GET',
			headers: {
				'Authorization':`Bearer ${token}`
			},
		});

		if (!resp.ok) {
			return {
				message:
					"An unexpected error occured while trying to check user's token in session"
			};
		}

		const data: AuthResponse = await resp.json();

		return {
			user: data.user
		};
	} catch (err) {
		console.error('Token Verification failed', err);
		return {
			message: "An unexpected error occured while trying to check user's token in session"
		};
	}
}
