import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'commission',
  title: 'Commission',
  type: 'document',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon (emoji)',
      type: 'string',
      description: 'Paste an emoji character',
    }),
    defineField({
      name: 'iconColor',
      title: 'Icon Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'Sage', value: 'sage'},
          {title: 'Blue', value: 'blue'},
        ],
      },
      initialValue: 'sage',
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
      rows: 3,
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
    select: {title: 'title', subtitle: 'icon'},
    prepare({title, subtitle}) {
      return {title: `${subtitle || ''} ${title || ''}`}
    },
  },
})
