import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'connectSection',
  title: 'Connect / CTA',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Section Label',
      type: 'string',
      initialValue: 'Join Us',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Get In Touch',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Connect / CTA'}
    },
  },
})
