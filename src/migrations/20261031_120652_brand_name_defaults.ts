import { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-sqlite'

/**
 * The short brand name changed from "SS Unicom" to "SS Universal", so some field defaults changed
 * (site name, title template, post author, job location). This migration only records the new schema
 * snapshot. The database columns keep their old SQL defaults on purpose: SQLite can only change a
 * default by rebuilding the table, which is not worth the risk on live data, and Payload always
 * writes these fields itself from the config defaults, so the SQL defaults are never used.
 */
export async function up(_args: MigrateUpArgs): Promise<void> {}

export async function down(_args: MigrateDownArgs): Promise<void> {}
