import { get } from 'svelte/store';
import { API_URL } from './constants';
import type { AuthResponse, Character, User } from './types';
import { user } from './stores/user';
import { redirect } from '@sveltejs/kit';


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

export async function isUserLoggedIn(): Promise<boolean> {
	const currentUser = get(user);

	if(currentUser)
		return true;

	const token = localStorage.getItem('token');

	if (!token) return false;

	const { user: obtainedUser } = await getUserFromToken(token);
	
	// update the global store
	if(obtainedUser) {
		user.set(obtainedUser);
		return true;
	} else {
		return false;
	}
}

export async function getAllCharacters(): Promise<Character[]> {
	try {
		const resp = await fetch(`${API_URL}/characters`, {
			method: 'GET',
		});

		if (!resp.ok) {
			return [] as Character[];
		}

		const data: Character[] = await resp.json();

		return data;
	} catch (err) {
		console.error('Getting list of characters failed', err);
		return [] as Character[];
	}
}

export async function getAllUsers(): Promise<User[]> {
	try {
		const resp = await fetch(`${API_URL}/auth/users`);

		if(!resp.ok) {
			return [] as User[];
		}

		const data: User[] = await resp.json();

		return data;
	} catch (err) {
		console.error('Getting list of users failed', err);
		return [] as User[];
	}
}


export async function addFriend(userId: string, friend: User) : Promise<{success: boolean, message: string}>{
	try {
		const resp = await fetch(`${API_URL}/friends/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ user_id: parseInt(userId), friend_id: parseInt(friend.id) })
		});

		if(!resp.ok) {
			return {
				success: false,
				message: "Couldnt add as friend, pls try again later"
			};
		}

		return {
			success: true,
			message: `Added ${friend.username} as friend`
		}
	} catch (error) {
		console.error('Adding new friend failed', error);
		return {
			success: false,
			message: 'An unexpected error occure, pls try again later'
		}
	}
}