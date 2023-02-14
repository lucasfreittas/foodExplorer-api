exports.up = knex => knex.schema.createTable('tags', table => {
    table.increments('id');
    table.integer('product_id').references('id').inTable('products').onDelete('CASCADE');
    table.text('name');
});

exports.down = knex => knex.schema.dropTable('tags');