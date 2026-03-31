import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      initialValue: 'A Bible Study Fellowship',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'text',
      rows: 2,
      description: 'Use <br> for line breaks and <em>text</em> for emphasis',
      initialValue: 'Growing into the<br><em>fullness of Christ</em>',
    }),
    defineField({
      name: 'scripture',
      title: 'Scripture Quote',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'scriptureRef',
      title: 'Scripture Reference',
      type: 'string',
      initialValue: '— Ephesians 4:13',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Begin the Journey',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Hero Section'}
    },
  },
})
