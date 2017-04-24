
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (t) =>{
    t.increments('id');
    t.string('name').notNullable();
    t.string('password').notNullable();
    t.boolean('logged_in').defaultTo(false);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
