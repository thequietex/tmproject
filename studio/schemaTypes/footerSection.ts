import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'footerSection',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'scripture',
      title: 'Scripture Quote',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'scriptureRef',
      title: 'Scripture Reference',
      type: 'string',
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Footer'}
    },
  },
})
