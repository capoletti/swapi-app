// src/react-app/utils/displayFields.ts

export const getDisplayFields = (resource: string) => {
  const fields: { [key: string]: string[] } = {
    films: ['title', 'director', 'producer', 'release_date', 'opening_crawl'],
    people: ['name', 'height', 'mass', 'hair_color', 'skin_color', 'eye_color', 'birth_year', 'gender'],
    planets: ['name', 'rotation_period', 'orbital_period', 'diameter', 'climate', 'gravity', 'terrain', 'surface_water', 'population'],
    species: ['name', 'classification', 'designation', 'average_height', 'skin_colors', 'hair_colors', 'eye_colors', 'average_lifespan', 'language'],
    starships: ['name', 'model', 'manufacturer', 'cost_in_credits', 'length', 'max_atmosphering_speed', 'crew', 'passengers', 'cargo_capacity', 'consumables', 'hyperdrive_rating', 'MGLT', 'starship_class'],
    vehicles: ['name', 'model', 'manufacturer', 'cost_in_credits', 'length', 'max_atmosphering_speed', 'crew', 'passengers', 'cargo_capacity', 'consumables', 'vehicle_class'],
  };

  return fields[resource] || null;
};
