exports.up = function(knex) {
    return knex.schema.alterTable('orders', function(table) {
      table.text('status').defaultTo('Pendente').alter();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.alterTable('orders', function(table) {
      table.text('status').alter();
    });
  };