import { writable } from "svelte/store";
import type { User } from "$lib";

export const user = writable<User | null>(null);
export const currentCharacter = writable<number | null>(null);