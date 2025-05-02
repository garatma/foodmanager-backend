import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.raw('alter table recipe alter column steps type varchar')
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('alter table recipe alter column steps type varchar(255)')
}
