import { CollectionConfig } from 'payload'

export const PagesCollection: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      // set `index: true` on fields
      // that you will query on frequently
      index: true,
      unique: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'public', // required property
      type: 'checkbox', // required property
      label: 'Public',
      defaultValue: true,
    },
    {
      name: 'content',
      type: 'richText',
    },
  ],
}
