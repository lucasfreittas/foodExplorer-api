exports.up = knex => knex.schema.createTable('products', table => {
    table.increments('id');
    table.text('name');
    table.text('description');
    table.decimal('price', 8, 2);
    table.text('photo').nullable()

});

exports.down = knex => knex.schema.dropTable('products');