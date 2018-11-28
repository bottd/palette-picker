exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('palettes')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('palettes').insert([
        {
          id: 1,
          hex1: '#dec9be',
          hex2: '#8af615',
          hex3: '#2c36dd',
          hex4: '#c0e11b',
          hex5: '#c7600e',
          project_id: 1,
          name: 'palette 1',
        },
        {
          id: 2,
          hex1: '#000000',
          hex2: '#ffffff',
          hex3: '#bbbbbb',
          hex4: '#aaaaaa',
          hex5: '#cccccc',
          project_id: 1,
          name: 'palette 2',
        },
        {
          id: 3,
          hex1: '#111111',
          hex2: '#222222',
          hex3: '#333333',
          hex4: '#444444',
          hex5: '#555555',
          project_id: 2,
          name: 'palette 3',
        },
      ]);
    });
};
