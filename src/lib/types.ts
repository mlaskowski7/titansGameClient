export interface User {
	username: string;
	lobbyId: string;
}

export interface AuthResponse {
	token: string;
	user: User;
}
