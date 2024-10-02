export interface User {
	id: string;
	username: string;
	created_at: string;
	times_logged_in: number;
	character: Character;
	friends: User[];
	points: number;
	lobby: Lobby;
}

export interface Lobby {
	id: string;
	name: string;
	state: LobbyState;
	max_players: number;
}

export enum LobbyState {
	WAITING,
	CONFIGURING,
	ONGOING,
	FINISHED
}

export function lobbyStateToString(state: LobbyState | null | undefined) {
	switch (state) {
		case LobbyState.WAITING:
			return 'WAITING';
		case LobbyState.CONFIGURING:
			return 'CONFIGURING';
		case LobbyState.ONGOING:
			return 'ONGOING';
		case LobbyState.FINISHED:
			return 'FINISHED';
		default:
			return '';
	}
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
