exports.up = function(knex) {
    return knex.schema.table('products', function(table) {
      table.text("category");
    });
  };

  exports.down = function(knex) {
    return knex.schema.table('products', function(table) {
      table.dropColumn('category');
    });
  };