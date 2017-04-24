
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (t) =>{
    t.increments('id');
    t.string('name').notNullable();
    t.string('password').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
