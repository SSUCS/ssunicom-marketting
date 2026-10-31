import * as migration_20261028_092037_initial from './20261028_092037_initial';
import * as migration_20261028_095805_add_markets from './20261028_095805_add_markets';
import * as migration_20261028_095819_drop_area_served from './20261028_095819_drop_area_served';
import * as migration_20261030_135905_uploadthing_fields from './20261030_135905_uploadthing_fields';
import * as migration_20261031_120652_brand_name_defaults from './20261031_120652_brand_name_defaults';

export const migrations = [
  {
    up: migration_20261028_092037_initial.up,
    down: migration_20261028_092037_initial.down,
    name: '20261028_092037_initial',
  },
  {
    up: migration_20261028_095805_add_markets.up,
    down: migration_20261028_095805_add_markets.down,
    name: '20261028_095805_add_markets',
  },
  {
    up: migration_20261028_095819_drop_area_served.up,
    down: migration_20261028_095819_drop_area_served.down,
    name: '20261028_095819_drop_area_served',
  },
  {
    up: migration_20261030_135905_uploadthing_fields.up,
    down: migration_20261030_135905_uploadthing_fields.down,
    name: '20261030_135905_uploadthing_fields',
  },
  {
    up: migration_20261031_120652_brand_name_defaults.up,
    down: migration_20261031_120652_brand_name_defaults.down,
    name: '20261031_120652_brand_name_defaults'
  },
];
