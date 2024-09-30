import { writable } from 'svelte/store';
import type { Lobby } from '$lib';

export const lobbies = writable<Lobby[] | null>(null);