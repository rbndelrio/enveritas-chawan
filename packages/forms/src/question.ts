import { Question, QuestionVersion } from './model'
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

export const createQuestionVersion = (
  properties: Partial<QuestionVersion> = {},
  rootQuestion: Question,
  question = {},
  answer = {}
): QuestionVersion => ({
  version: 0,
  created_on: new Date(),
  modified_on: new Date(),
  content: { data: { answer, question } },
  question: rootQuestion || createQuestion(),
  uuid: uuid(),
  ...properties
})