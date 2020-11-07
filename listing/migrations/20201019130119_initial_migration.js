
exports.up = async function (knex) {
  await knex.schema.createTable('user', table => {
    table.string('id').primary()
  })

  await knex.schema.createTable('listing_type', table => {
    table.string('id').primary()
    table.string('type').unique()
  })

  await knex.schema.createTable('listing_status', table => {
    table.string('id').primary()
    table.string('status').unique()
  })

  await knex.schema.createTable('transaction_type', table => {
    table.string('id').primary()
    table.string('type').unique()
  })

  await knex.schema.createTable('amenity', table => {
    table.increments('id').primary()
  })

  await knex.schema.createTable('file_type', table => {
    table.string('id').primary()
  })

  await knex.schema.createTable('address', table => {
    table.increments('id').primary()
    table.string('line1')
    table.string('line2')
    table.string('city')
    table.string('zip_code')
    table.string('state')
    table.string('country')
    table.specificType('geo', 'POINT')
  })

  await knex.schema.createTable('listing', table => {
    table.bigIncrements('id').primary().unsigned()
    table.string('title')
    table.text('description')
    table.integer('num_of_bedrooms')
    table.integer('num_of_baths')
    table.integer('num_of_half_baths')
    table.integer('property_size')
    table.integer('price')
    table.string('agent_id').references('user.id')
    table.integer('address_id').references('address.id')
    table.string('listing_type').references('listing_type.id')
    table.string('listing_status').references('listing_status.id')
    table.string('transaction_type').references('transaction_type.id')
    table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6))
  })

  await knex.schema.createTable('listing_amenities', table => {
    table.integer('amenity_id').references('amenity.id')
    table.bigInteger('listing_id').unsigned().references('listing.id')
    table.primary(['listing_id', 'amenity_id'])
  })

  await knex.schema.createTable('favorite_listings', table => {
    table.string('user_id').references('user.id')
    table.bigInteger('listing_id').unsigned().references('listing.id')
    table.primary(['listing_id', 'user_id'])
  })

  await knex.schema.createTable('listing_file', table => {
    table.bigIncrements('id').primary()
    table.integer('listing_id').references('listing.id')
    table.json('file_info')
  })


}

exports.down = async function (knex) {
  await knex.schema.dropTable('favorite_listings')
  await knex.schema.dropTable('listing_image')
  await knex.schema.dropTable('listing_amenities')
  await knex.schema.dropTable('amenity')
  await knex.schema.dropTable('listing')
  await knex.schema.dropTable('transaction_type')
  await knex.schema.dropTable('listing_status')
  await knex.schema.dropTable('listing_type')
  await knex.schema.dropTable('user')
}
