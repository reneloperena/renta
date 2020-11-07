
exports.up = async function (knex) {
  await knex.schema.createTable('user', table => {
    table.string('id').primary()
  })

  await knex.schema.createTable('conversation', table => {
    table.increments('id').primary().unsigned()
    table.json('metadata')
  })

  await knex.schema.createTable('member', table => {
    table.integer('conversation_id').references('conversation.id')
    table.string('user_id').references('user.id')
    table.primary(['conversation_id', 'user_id'])
  })

  await knex.schema.createTable('message', table => {
    table.bigIncrements('id').primary().unsigned()
    table.text('body')
    table.string('content_type')
    table.string('sender').references('user.id')
    table.integer('conversation_id').references('conversation.id')
    table.timestamp('sent_at', { precision: 6 }).defaultTo(knex.fn.now(6))
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTable('message')
  await knex.schema.dropTable('member')
  await knex.schema.dropTable('user')
  await knex.schema.dropTable('conversation')
}
