import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'scheduleEvent',
  title: 'Schedule Event',
  type: 'document',
  fields: [
    defineField({
      name: 'day',
      title: 'Day',
      type: 'string',
      description: 'e.g. 05, 12, 19',
    }),
    defineField({
      name: 'month',
      title: 'Month',
      type: 'string',
      description: 'e.g. Apr, May, Jun',
    }),
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
    }),
    defineField({
      name: 'details',
      title: 'Event Details',
      type: 'string',
      description: 'e.g. Saturday · 10:00 AM · Main Hall',
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
    select: {title: 'title', day: 'day', month: 'month'},
    prepare({title, day, month}) {
      return {title, subtitle: `${day || ''} ${month || ''}`}
    },
  },
})
