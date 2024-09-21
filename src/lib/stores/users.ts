import type { User } from "$lib/types";
import { writable } from "svelte/store";

export const users = writable<User[] | null>(null);