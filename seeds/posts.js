



exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {id: 1, poster_id: 1, content: 'blah', post_pass: 'test', location: "here"}
      ]);
    });
};
