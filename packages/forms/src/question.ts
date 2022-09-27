import { Question } from './model'
import { uuid } from './utils'

export const createQuestion = (properties: Partial<Question> = {}): Question => ({
  created_on: new Date(),
  modified_on: new Date(),
  lang: 'en-US',
  nickname: '',
  typ: 'text',
  usage_limit: 'normal',
  uuid: uuid(),
  versions: [],
  ...properties
})