
exports.up = async function (knex) {
  await knex.schema.createTable('user', table => {
    table.string('id').primary()
    table.text('avatar')
    table.string('email')
    table.string('name') 
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTable('user')
}
