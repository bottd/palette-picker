exports.up = function(knex, Promise) {
  return knex.schema.table('palettes', function(table) {
    table.foreign('project_id').references('projects.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('palettes', function(table) {
    table.dropForeign('project_id');
  });
};
