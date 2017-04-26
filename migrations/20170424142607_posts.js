
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', (t) =>{
  t.increments('id');
  t.integer('poster_id');
  t.text('content').notNullable();
  t.text('location');
  t.string('post_pass').notNullable();
});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};
