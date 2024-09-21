export interface User {
	id: string;
	username: string;
	created_at: string;
	times_logged_in: number;
	character: Character;
	friends: User[];
}

export interface Character {
	id: number;
	name: string;
	health: number;
	strength: number;
}

export interface AuthResponse {
	token: string;
	user: User;
}
