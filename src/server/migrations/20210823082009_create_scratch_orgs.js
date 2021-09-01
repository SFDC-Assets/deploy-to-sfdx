exports.up = function(knex) {
    return knex.schema.createTable('created_scratch_orgs', function(table) {
        table.integer('org_id').primary();
        table.text('repo_url');
        table.text('email');
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('created_scratch_orgs');
};
