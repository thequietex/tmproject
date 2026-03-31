import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'leader',
  title: 'Leader',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'gradient',
      title: 'Photo Gradient',
      type: 'string',
      options: {
        list: [
          {title: 'Sage', value: 'sage-to-sage-light'},
          {title: 'Blue', value: 'blue-muted-to-blue-light'},
          {title: 'Sage to Blue', value: 'sage-to-blue-muted'},
          {title: 'Sage to Gold', value: 'sage-to-gold-soft'},
          {title: 'Blue to Gold', value: 'blue-muted-to-gold-soft'},
        ],
      },
      initialValue: 'sage-to-sage-light',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
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
    select: {title: 'name', subtitle: 'role', media: 'photo'},
  },
})
