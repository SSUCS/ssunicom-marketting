import type { SelectField } from 'payload'

import { iconNames } from '@/lib/iconNames'

export const iconField = (overrides: Partial<SelectField> = {}): SelectField =>
  ({
    name: 'icon',
    type: 'select',
    options: iconNames.map((name) => ({ label: name.replace(/([a-z])([A-Z0-9])/g, '$1 $2'), value: name })),
    admin: { description: 'Line icon shown with this item.' },
    ...overrides,
  }) as SelectField
