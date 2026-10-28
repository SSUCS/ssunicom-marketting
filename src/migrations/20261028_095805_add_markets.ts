import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_markets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`settings_background\` text DEFAULT 'stone',
  	\`settings_anchor\` text,
  	\`settings_spacing\` text DEFAULT 'normal',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_markets_order_idx\` ON \`pages_blocks_markets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_markets_parent_id_idx\` ON \`pages_blocks_markets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_markets_path_idx\` ON \`pages_blocks_markets\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_markets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`settings_background\` text DEFAULT 'stone',
  	\`settings_anchor\` text,
  	\`settings_spacing\` text DEFAULT 'normal',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_markets_order_idx\` ON \`_pages_v_blocks_markets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_markets_parent_id_idx\` ON \`_pages_v_blocks_markets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_markets_path_idx\` ON \`_pages_v_blocks_markets\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_markets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`countries\` text,
  	\`coverage\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_markets_order_idx\` ON \`site_settings_markets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_markets_parent_id_idx\` ON \`site_settings_markets\` (\`_parent_id\`);`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_keywords\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`keyword\` text NOT NULL,
  	\`cluster\` text,
  	\`intent\` text,
  	\`market\` text DEFAULT 'global',
  	\`priority\` text DEFAULT 'p2',
  	\`status\` text DEFAULT 'mapped',
  	\`search_volume\` numeric,
  	\`difficulty\` numeric,
  	\`cpc\` numeric,
  	\`current_position\` numeric,
  	\`source\` text,
  	\`last_checked\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`INSERT INTO \`__new_keywords\`("id", "keyword", "cluster", "intent", "market", "priority", "status", "search_volume", "difficulty", "cpc", "current_position", "source", "last_checked", "notes", "updated_at", "created_at") SELECT "id", "keyword", "cluster", "intent", "market", "priority", "status", "search_volume", "difficulty", "cpc", "current_position", "source", "last_checked", "notes", "updated_at", "created_at" FROM \`keywords\`;`)
  await db.run(sql`DROP TABLE \`keywords\`;`)
  await db.run(sql`ALTER TABLE \`__new_keywords\` RENAME TO \`keywords\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`keywords_keyword_idx\` ON \`keywords\` (\`keyword\`);`)
  await db.run(sql`CREATE INDEX \`keywords_updated_at_idx\` ON \`keywords\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`keywords_created_at_idx\` ON \`keywords\` (\`created_at\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_markets\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_markets\`;`)
  await db.run(sql`DROP TABLE \`site_settings_markets\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_keywords\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`keyword\` text NOT NULL,
  	\`cluster\` text,
  	\`intent\` text,
  	\`market\` text DEFAULT 'us',
  	\`priority\` text DEFAULT 'p2',
  	\`status\` text DEFAULT 'mapped',
  	\`search_volume\` numeric,
  	\`difficulty\` numeric,
  	\`cpc\` numeric,
  	\`current_position\` numeric,
  	\`source\` text,
  	\`last_checked\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`INSERT INTO \`__new_keywords\`("id", "keyword", "cluster", "intent", "market", "priority", "status", "search_volume", "difficulty", "cpc", "current_position", "source", "last_checked", "notes", "updated_at", "created_at") SELECT "id", "keyword", "cluster", "intent", "market", "priority", "status", "search_volume", "difficulty", "cpc", "current_position", "source", "last_checked", "notes", "updated_at", "created_at" FROM \`keywords\`;`)
  await db.run(sql`DROP TABLE \`keywords\`;`)
  await db.run(sql`ALTER TABLE \`__new_keywords\` RENAME TO \`keywords\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`keywords_keyword_idx\` ON \`keywords\` (\`keyword\`);`)
  await db.run(sql`CREATE INDEX \`keywords_updated_at_idx\` ON \`keywords\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`keywords_created_at_idx\` ON \`keywords\` (\`created_at\`);`)
}
