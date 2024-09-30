export interface User {
	id: string;
	username: string;
	created_at: string;
	times_logged_in: number;
	character: Character;
	friends: User[];
	points: number;
}

export interface Lobby {
	id: string;
	name: string;
	state: LobbyState,
	max_players: number;
}

export enum LobbyState {
	WAITING,
	CONFIGURING,
	ONGOING,
	FINISHED,
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
