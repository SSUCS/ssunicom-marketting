import * as migration_20261028_092037_initial from './20261028_092037_initial';
import * as migration_20261028_095805_add_markets from './20261028_095805_add_markets';
import * as migration_20261028_095819_drop_area_served from './20261028_095819_drop_area_served';

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
    name: '20261028_095819_drop_area_served'
  },
];
