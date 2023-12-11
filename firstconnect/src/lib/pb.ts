import PocketBase, { type AuthModel } from 'pocketbase'
import { writable, type Writable } from 'svelte/store';

export const pb = new PocketBase('http://127.0.0.1:8090');

export let user: Writable<AuthModel> = writable();
pb.authStore.onChange((_, v) => {
    user.set(v);
}, true);