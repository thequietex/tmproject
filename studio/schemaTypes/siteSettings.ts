import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'journeyLabel',
      title: 'Journey Section Label',
      type: 'string',
      initialValue: 'The Path',
    }),
    defineField({
      name: 'journeyTitle',
      title: 'Journey Section Title',
      type: 'string',
      initialValue: 'Stages of Growth',
    }),
    defineField({
      name: 'commissionsLabel',
      title: 'Commissions Section Label',
      type: 'string',
      initialValue: 'Godly Commissions',
    }),
    defineField({
      name: 'commissionsTitle',
      title: 'Commissions Section Title',
      type: 'string',
      initialValue: 'Called to Serve',
    }),
    defineField({
      name: 'commissionsBody',
      title: 'Commissions Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'membersLabel',
      title: 'Members Section Label',
      type: 'string',
      initialValue: 'Our People',
    }),
    defineField({
      name: 'membersTitle',
      title: 'Members Section Title',
      type: 'string',
      initialValue: '40 Members, One Purpose',
    }),
    defineField({
      name: 'scheduleLabel',
      title: 'Schedule Section Label',
      type: 'string',
      initialValue: 'Study Calendar',
    }),
    defineField({
      name: 'scheduleTitle',
      title: 'Schedule Section Title',
      type: 'string',
    }),
    defineField({
      name: 'scheduleBody',
      title: 'Schedule Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'leadershipLabel',
      title: 'Leadership Section Label',
      type: 'string',
      initialValue: 'Leadership',
    }),
    defineField({
      name: 'leadershipTitle',
      title: 'Leadership Section Title',
      type: 'string',
      initialValue: 'Guided by Servant Hearts',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
