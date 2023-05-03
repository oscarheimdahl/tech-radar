import { writable } from 'svelte/store';

export interface Tech {
  val: number;
  quarter: 0 | 1 | 2 | 3;
  name: string;
  id: string;
}

export function techId(tech: Tech) {
  return `${tech.name}-${tech.val}-${tech.quarter}`;
}

export const techsStore = writable<Tech[]>([]);

export function setTechs(techs: Tech[]) {
  techs.sort((a, b) => a.val - b.val);
  techsStore.set(techs);
}
