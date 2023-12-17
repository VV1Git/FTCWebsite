import PocketBase, { type AuthModel } from 'pocketbase'
import { writable, type Writable } from 'svelte/store';

export const pb = new PocketBase('https://firstconnect.pockethost.io/');

export let user: Writable<AuthModel> = writable();
pb.authStore.onChange((_, v) => {
    user.set(v);
}, true);