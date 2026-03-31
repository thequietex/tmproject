import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'stage',
  title: 'Journey Stage',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Stage Number',
      type: 'string',
      description: 'e.g. 01, 02, 03',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
    }),
  ],
  orderings: [
    {title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'number'},
  },
})
