import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`media\` ADD \`_key\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`prefix\` text DEFAULT '';`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`_objectkey\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_thumbnail__key\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_card__key\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_large__key\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_og__key\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`_key\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`prefix\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`_objectkey\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_thumbnail__key\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_card__key\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_large__key\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_og__key\`;`)
}
