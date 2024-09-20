import { writable } from "svelte/store";
import type { Character, User } from "$lib";

export const user = writable<User | null>(null);
export const characters = writable<Character[] | null>(null);