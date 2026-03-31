import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About / Vision',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Section Label',
      type: 'string',
      initialValue: 'Our Vision',
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'text',
      rows: 2,
      description: 'Use <br> for line breaks',
    }),
    defineField({
      name: 'body',
      title: 'Body Paragraphs',
      type: 'array',
      of: [{type: 'text', rows: 3}],
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'visualText',
      title: 'Visual Placeholder Text',
      type: 'string',
      description: 'Shown when no image is uploaded',
      initialValue: 'Your logo & group photo here',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'About / Vision'}
    },
  },
})
