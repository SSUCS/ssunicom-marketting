import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateGlobal } from '@/hooks/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  admin: { group: 'Settings', description: 'Company details, default SEO, tracking codes and the cookie banner.' },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Company',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'siteName', type: 'text', required: true, defaultValue: 'SS Unicom' },
                { name: 'legalName', type: 'text', required: true, defaultValue: 'SS Universal Communication Services Pvt Ltd' },
              ],
            },
            { name: 'tagline', type: 'text' },
            {
              type: 'row',
              fields: [
                { name: 'phone', type: 'text', required: true },
                { name: 'whatsapp', type: 'text', admin: { description: 'Digits only with country code, e.g. 919794774773' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'email', type: 'email', required: true },
                { name: 'careersEmail', type: 'email' },
              ],
            },
            {
              name: 'address',
              type: 'group',
              fields: [
                { name: 'street', type: 'text' },
                {
                  type: 'row',
                  fields: [
                    { name: 'locality', type: 'text', defaultValue: 'Kanpur' },
                    { name: 'region', type: 'text', defaultValue: 'Uttar Pradesh' },
                    { name: 'postalCode', type: 'text' },
                    { name: 'country', type: 'text', defaultValue: 'IN', admin: { description: 'ISO code' } },
                  ],
                },
                { name: 'mapUrl', type: 'text', admin: { description: 'Google Maps link to your Business Profile.' } },
              ],
            },
            { name: 'hours', type: 'text' },
            { name: 'foundingYear', type: 'number' },
            {
              name: 'socials',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'platform',
                      type: 'select',
                      required: true,
                      options: ['linkedin', 'facebook', 'instagram', 'x', 'youtube'].map((p) => ({ label: p, value: p })),
                    },
                    { name: 'url', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'SEO defaults',
          fields: [
            { name: 'titleTemplate', type: 'text', defaultValue: '%s | SS Unicom', admin: { description: '%s is replaced by the page title.' } },
            { name: 'defaultTitle', type: 'text', required: true },
            { name: 'defaultDescription', type: 'textarea', required: true },
            { name: 'defaultOgImage', type: 'upload', relationTo: 'media', admin: { description: '1200×630. A generated image is used when empty.' } },
            {
              name: 'areaServed',
              type: 'text',
              hasMany: true,
              admin: { description: 'Countries for Organization schema, e.g. United States, United Kingdom, India.' },
            },
            {
              type: 'row',
              fields: [
                { name: 'googleSiteVerification', type: 'text', admin: { description: 'Search Console HTML-tag content value.' } },
                { name: 'bingSiteVerification', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Analytics & tracking',
          description: 'Scripts load only after the visitor accepts cookies (Google Consent Mode v2).',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'gtmId', label: 'Google Tag Manager ID', type: 'text', admin: { description: 'GTM-XXXXXXX. Preferred: manage everything else inside GTM.' } },
                { name: 'ga4Id', label: 'GA4 measurement ID', type: 'text', admin: { description: 'G-XXXXXXXXXX. Only if not using GTM.' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'linkedinPartnerId', label: 'LinkedIn Insight partner ID', type: 'text' },
                { name: 'metaPixelId', label: 'Meta Pixel ID', type: 'text' },
                { name: 'clarityId', label: 'Microsoft Clarity ID', type: 'text' },
              ],
            },
            { name: 'cookieBanner', type: 'checkbox', defaultValue: true, label: 'Show cookie consent banner' },
            { name: 'cookieText', type: 'textarea' },
          ],
        },
        {
          label: 'Announcement',
          fields: [
            { name: 'announcementEnabled', type: 'checkbox', label: 'Show announcement bar' },
            { name: 'announcementText', type: 'text' },
            { ...link({ name: 'announcementLink', appearances: false, required: false }) },
          ],
        },
      ],
    },
  ],
  hooks: { afterChange: [revalidateGlobal] },
}
