exports.up = function(knex) {
    return knex.schema.table('orders', function(table) {
      table.dropColumn('product_id');
      table.decimal('total', 10, 2);
    });
  };

  exports.down = function(knex) {
    return knex.schema.table('orders', function(table) {
      table.dropColumn('total');
      table.integer('product_id');
    });
  };