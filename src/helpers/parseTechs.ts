import type { Tech } from '../store/techsStore';

// error message with index prefix
function e(i: number, msg: string) {
  throw Error(`Tech object at index ${i}, ${msg}.`);
}

export function parseJSONTechs(jsonString: string): Tech[] {
  const json = JSON.parse(jsonString) as unknown;
  if (!Array.isArray(json)) throw Error('Please provide an array of Techs');
  const techs = json.map((tech, i) => {
    if (typeof tech?.name !== 'string') {
      e(i, 'does not have a name of type string');
    }
    if (typeof tech?.val !== 'number') {
      e(i, 'does not have a val of type number');
    }
    if (tech.val < 0 || tech.val > 99) {
      e(i, 'val must be between 0 and 99');
    }
    if (typeof tech?.quarter !== 'number') {
      e(i, 'does not have a quarter of type number');
    }
    if (tech.quarter < 0 || tech.quarter > 3) {
      e(i, 'quarter must be between 0 and 3');
    }
    return { ...tech, id: `tech-${i}` } as Tech;
  });
  return techs;
}
