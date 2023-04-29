import { writable } from 'svelte/store';

export const selectedTechStore = writable('');

export function setSelectedTech(id: string) {
  selectedTechStore.set(id);
}
