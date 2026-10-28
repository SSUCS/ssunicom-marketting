import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access'

/**
 * A SEMrush-style keyword map kept next to the content. Record research from SEMrush,
 * Ahrefs or Google Keyword Planner here and assign each keyword to exactly one page so
 * pages never compete for the same search (keyword cannibalisation).
 */
export const Keywords: CollectionConfig = {
  slug: 'keywords',
  labels: { singular: 'Keyword', plural: 'Keyword map' },
  admin: {
    group: 'SEO',
    useAsTitle: 'keyword',
    defaultColumns: ['keyword', 'cluster', 'intent', 'searchVolume', 'difficulty', 'priority', 'target', 'status'],
    listSearchableFields: ['keyword', 'cluster'],
    description:
      'Target keywords and the page that owns each one. Fill volume, difficulty and CPC from SEMrush / Ahrefs / Keyword Planner, and positions from Google Search Console.',
  },
  access: { create: authenticated, delete: authenticated, read: authenticated, update: authenticated },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'keyword', type: 'text', required: true, unique: true, admin: { width: '50%' } },
        { name: 'cluster', type: 'text', admin: { width: '50%', description: 'Topic group, e.g. "medical billing".' } },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'intent',
          type: 'select',
          options: [
            { label: 'Commercial', value: 'commercial' },
            { label: 'Transactional', value: 'transactional' },
            { label: 'Informational', value: 'informational' },
            { label: 'Navigational', value: 'navigational' },
          ],
          admin: { width: '25%' },
        },
        {
          name: 'market',
          type: 'select',
          defaultValue: 'global',
          options: [
            { label: 'Middle East', value: 'me' },
            { label: 'India', value: 'in' },
            { label: 'United States', value: 'us' },
            { label: 'United Kingdom', value: 'uk' },
            { label: 'Canada', value: 'ca' },
            { label: 'Australia', value: 'au' },
            { label: 'Global', value: 'global' },
          ],
          admin: { width: '25%' },
        },
        {
          name: 'priority',
          type: 'select',
          defaultValue: 'p2',
          options: [
            { label: 'P1 – now', value: 'p1' },
            { label: 'P2 – next', value: 'p2' },
            { label: 'P3 – later', value: 'p3' },
          ],
          admin: { width: '25%' },
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'mapped',
          options: [
            { label: 'Idea', value: 'idea' },
            { label: 'Mapped to a page', value: 'mapped' },
            { label: 'Content live', value: 'live' },
            { label: 'Ranking (top 10)', value: 'ranking' },
          ],
          admin: { width: '25%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'searchVolume', type: 'number', admin: { width: '25%', description: 'Monthly, from SEMrush/Ahrefs.' } },
        { name: 'difficulty', type: 'number', min: 0, max: 100, admin: { width: '25%', description: 'KD %, 0–100.' } },
        { name: 'cpc', type: 'number', admin: { width: '25%', description: 'USD.' } },
        { name: 'currentPosition', type: 'number', admin: { width: '25%', description: 'From Search Console.' } },
      ],
    },
    {
      name: 'target',
      type: 'relationship',
      relationTo: ['pages', 'services', 'service-categories', 'industries', 'posts', 'case-studies'],
      admin: { description: 'The one page that should rank for this keyword.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'source',
          type: 'select',
          options: ['SEMrush', 'Ahrefs', 'Google Keyword Planner', 'Search Console', 'Manual'].map((s) => ({ label: s, value: s.toLowerCase().replace(/ /g, '-') })),
        },
        { name: 'lastChecked', type: 'date' },
      ],
    },
    { name: 'notes', type: 'textarea' },
  ],
}
