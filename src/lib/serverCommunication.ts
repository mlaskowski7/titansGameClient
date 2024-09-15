import { API_URL } from './constants';
import type { User } from './types';

interface CheckTokenResponse {
	user: User;
	message: string;
}

export async function getUserFromToken(token: string): Promise<{ user?: User; message?: string }> {
	try {
		const resp = await fetch(`${API_URL}/checkToken`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ token })
		});

		const data: CheckTokenResponse = await resp.json();

		if (!resp.ok) {
			return {
				message:
					data.message ||
					"An unexpected error occured while trying to check user's token in session"
			};
		}

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
