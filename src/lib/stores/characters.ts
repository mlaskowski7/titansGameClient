import type { Character } from "$lib/types";
import { writable } from "svelte/store";

export const characters = writable<Character[] | null>(null);