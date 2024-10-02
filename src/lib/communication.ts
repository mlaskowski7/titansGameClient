import { get } from 'svelte/store';
import { API_URL } from './constants';
import type { AuthResponse, Character, Lobby, User } from './types';
import { user } from './stores/user';

export async function getUserFromToken(token: string): Promise<{ user?: User; message?: string }> {
	try {
		const resp = await fetch(`${API_URL}/auth/checkToken`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (!resp.ok) {
			return {
				message: "An unexpected error occured while trying to check user's token in session"
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

	if (currentUser) return true;

	const token = localStorage.getItem('token');

	if (!token) return false;

	const { user: obtainedUser } = await getUserFromToken(token);

	// update the global store
	if (obtainedUser) {
		user.set(obtainedUser);
		return true;
	} else {
		return false;
	}
}

export async function getAllCharacters(): Promise<Character[]> {
	try {
		const resp = await fetch(`${API_URL}/characters`, {
			method: 'GET'
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

		if (!resp.ok) {
			return [] as User[];
		}

		const data = (await resp.json()) as User[];

		return data;
	} catch (err) {
		console.error('Getting list of users failed', err);
		return [] as User[];
	}
}

export async function getAllLobbies(): Promise<Lobby[]> {
	try {
		const resp = await fetch(`${API_URL}/lobbies`);

		if (!resp.ok) {
			return [] as Lobby[];
		}

		const data = (await resp.json()) as Lobby[];

		return data;
	} catch (err) {
		console.error('Getting list of lobbies failed', err);
		return [] as Lobby[];
	}
}

export async function getLobbyById(id: string): Promise<Lobby | null> {
	try {
		const resp = await fetch(`${API_URL}/lobbies/id/${id}`);

		if (!resp.ok) {
			return null;
		}

		const data = (await resp.json()) as Lobby;

		return data;
	} catch (err) {
		console.error('Getting lobby failed', err);
		return null;
	}
}

export async function joinLobby(
	userId: string,
	lobbyId: string
): Promise<{ success: boolean; message: string }> {
	try {
		const resp = await fetch(`${API_URL}/lobbies/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ user_id: parseInt(userId), lobby_id: parseInt(lobbyId) })
		});

		if (!resp.ok) {
			return {
				success: false,
				message: "Couldn't join this lobby"
			};
		}

		return {
			success: true,
			message: 'Successfully joined this lobby'
		};
	} catch (err) {
		console.error('Adding to lobby failed', err);
		return {
			success: false,
			message: 'An unexpected error occurred, pls try again later'
		};
	}
}

export async function exitLobby(userId: string): Promise<{ success: boolean; message: string }> {
	try {
		const resp = await fetch(`${API_URL}/lobbies/exit/${userId}`, {
			method: 'POST'
		});

		if (!resp.ok) {
			return {
				success: false,
				message: "Couldn't exit this lobby"
			};
		}

		return {
			success: true,
			message: 'Successfully exited this lobby'
		};
	} catch (err) {
		console.error('Exiting lobby failed', err);
		return {
			success: false,
			message: 'An unexpected error occurred, pls try again later'
		};
	}
}

export async function nextLobbyState(
	lobbyState: string,
	lobbyId: string
): Promise<{ success: boolean; message: string }> {
	try {
		const resp = await fetch(`${API_URL}/lobbies/nextState`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ lobby_id: parseInt(lobbyId), lobby_state: lobbyState })
		});

		if (!resp.ok) {
			return {
				success: false,
				message: "Couldn't modify this lobby"
			};
		}

		return {
			success: true,
			message: 'Successfully modified this lobby'
		};
	} catch (err) {
		console.error('Modyfing lobby failed', err);
		return {
			success: false,
			message: 'An unexpected error occurred, pls try again later'
		};
	}
}

export async function createLobby(
	name: string,
	state: number,
	maxPlayers: number
): Promise<{ success: boolean; message: string }> {
	try {
		const resp = await fetch(`${API_URL}/lobbies`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, state, max_players: maxPlayers })
		});

		if (!resp.ok) {
			return {
				success: false,
				message: "Couldn't create this lobby"
			};
		}

		return {
			success: true,
			message: 'Successfully created this lobby'
		};
	} catch (err) {
		console.error('Creating lobby failed', err);
		return {
			success: false,
			message: 'An unexpected error occurred, pls try again later'
		};
	}
}

export async function addFriend(
	userId: string,
	friend: User
): Promise<{ success: boolean; message: string }> {
	try {
		const resp = await fetch(`${API_URL}/friends/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ user_id: parseInt(userId), friend_id: parseInt(friend.id) })
		});

		if (!resp.ok) {
			return {
				success: false,
				message: "Couldn't add as friend, pls try again later"
			};
		}

		return {
			success: true,
			message: `Added ${friend.username} as friend`
		};
	} catch (error) {
		console.error('Adding new friend failed', error);
		return {
			success: false,
			message: 'An unexpected error occurred, pls try again later'
		};
	}
}

export async function removeFriend(
	userId: string,
	friend: User
): Promise<{ success: boolean; message: string }> {
	try {
		const resp = await fetch(`${API_URL}/friends/remove`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ user_id: parseInt(userId), friend_id: parseInt(friend.id) })
		});

		if (!resp.ok) {
			return {
				success: false,
				message: 'Couldnt remove the friend, pls try again later'
			};
		}

		return {
			success: true,
			message: `Removed ${friend.username} from friends`
		};
	} catch (error) {
		console.error('Adding new friend failed', error);
		return {
			success: false,
			message: 'An unexpected error occured, pls try again later'
		};
	}
}
