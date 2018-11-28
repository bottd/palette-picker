exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('palettes')
    .del()
    .then(() => knex('projects').del())
    .then(() =>
      knex('projects').insert(
        [{name: 'project 1'}, {name: 'project 2'}, {name: 'project 3'}],
        'id',
      ),
    )
    .then(projectIds =>
      knex('palettes').insert([
        {
          hex1: '#dec9be',
          hex2: '#8af615',
          hex3: '#2c36dd',
          hex4: '#c0e11b',
          hex5: '#c7600e',
          project_id: projectIds[0],
          name: 'palette 1',
        },
        {
          hex1: '#000000',
          hex2: '#ffffff',
          hex3: '#bbbbbb',
          hex4: '#aaaaaa',
          hex5: '#cccccc',
          project_id: projectIds[0],
          name: 'palette 2',
        },
        {
          hex1: '#111111',
          hex2: '#222222',
          hex3: '#333333',
          hex4: '#444444',
          hex5: '#555555',
          project_id: projectIds[1],
          name: 'palette 3',
        },
      ]),
    );
};
