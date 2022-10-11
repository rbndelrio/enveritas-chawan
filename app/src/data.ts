/** Static/Placeholder Data */

export const QUESTIONS = [
  'How long have you been farming?',
  'What was your annual revenue last year?',
  "Where can I get some good coffee around here?",
  'Tell me about your farm.'
]

export const LANGUAGE_OPTIONS = [
  { lang: 'en-US', name: 'English (U.S.)' },
  { lang: 'pt-BR', name: 'Portuguese (Brazil)' },
  { lang: 'jv-ID', name: 'Javanese (Indonesia)' },
  { lang: 'rw-RW', name: 'Kinyarwanda (Rwanda)' },
]

export const USERS = [
  { name: 'Unassigned', value: null },
  {
    name: 'Wade Cooper',
    value: 'wade-cooper',
    avatar: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Riau Team',
    value: 'central-riau',
  },
  // More items...
]

export const LABELS = [
  { name: 'Unlabelled', value: null },
  { name: 'Sample Frame', value: 'special' },
  { name: 'A-B Trial', value: 'super-special' },
  // More items...
]
export const DUE_DATES = [
  { name: 'No due date', value: null },
  { name: 'Today', value: 'today' },
  { name: 'Pre-Seed', value: 'soon' },
  { name: 'Post-Harvest', value: 'whenever' },
  // More items...
]

export const TYPES = [
  { name: 'Text', value: 'text' },
  { name: 'Choice', value: 'select' },
  { name: 'Multiple Choice', value: 'mselect' },
  { name: 'True/False', value: 'boolean' },
  { name: 'GPS Location', value: 'gps', disabled: true },
]