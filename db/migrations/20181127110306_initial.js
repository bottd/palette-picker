exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('projects', function(table) {
      table.increments('id').primary();
      table.string('name');
    }),
    knex.schema.createTable('palettes', function(table) {
      table.increments('id').primary();
      table.string('hex1');
      table.string('hex2');
      table.string('hex3');
      table.string('hex4');
      table.string('hex5');
      table.integer('project_id');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('projects'),
    knex.schema.dropTable('palettes'),
  ]);
};
