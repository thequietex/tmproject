import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'member',
  title: 'Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'color',
      title: 'Avatar Color',
      type: 'string',
      options: {
        list: [
          {title: 'Sage', value: 'sage'},
          {title: 'Sage Light', value: 'sage-light'},
          {title: 'Blue', value: 'blue-muted'},
          {title: 'Blue Light', value: 'blue-light'},
          {title: 'Gold', value: 'gold-soft'},
        ],
      },
      initialValue: 'sage',
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
    }),
  ],
  orderings: [
    {title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]},
    {title: 'Name', name: 'name', by: [{field: 'name', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'name', subtitle: 'color'},
  },
})
