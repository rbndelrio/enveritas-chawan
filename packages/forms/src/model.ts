// Types interpreted and abbreviated from Jebena's API docs

export interface Base<
  Creator extends Person = Person,
  Editor extends Person = Person
  > {
  uuid: string

  created_on: Date
  created_person?: Creator
  created_person_id?: Creator['id']

  modified_on: Date
  modified_person?: Editor
  modified_person_id?: Editor['id']

  deleted?: boolean
}

export interface Project extends Base {
  id: number
  description: string
  name: string

  parent_project?: Project
  child_projects?: Array<Project>
  usage_limit: EnumValue<typeof UsageLimit>

  questions: Array<Question>
}

export interface Block extends Base {
  id: number
  description: string
  nickname: string

  parent_block?: Block
  child_blocks?: Array<Block>
  usage_limit: EnumValue<typeof UsageLimit>
  project: Project

  versions: Array<BlockVersion>
}
export interface BlockVersion extends Base {
  version: number
  block: Block
}

export interface Person extends Base {
  id: number
  name: string
}

export interface Question extends Base {
  lang: string // IETF BCP 47: en-US
  nickname: string
  child_questions?: Array<Question>
  parent_question?: Question
  usage_limit: EnumValue<typeof UsageLimit>
  versions: QuestionVersion[]
  typ: string
}

export interface QuestionVersion extends Base {
  version: number
  content: QuestionContent
  question: Question
  blockVersions: Block
}

// TODO: Lot of really rough guesswork here
export interface QuestionContent {
  data: {
    question: {
      val?: string
      instruction?: string
      type?: string
    },
    answer: {
      choices?: Array<string>|Array<boolean>
    }
  }
}

// export interface Survey extends Base {
//   usage_limit: EnumValue<typeof UsageLimit>
// }

export type EnumValue<T> = T[keyof T];

export const UsageLimit = {
  Normal: 'normal',
  Abstract: 'abstract',
  NonCloneable: 'non_cloneable',
  Private: 'private',
  Protected: 'protected',
  Revoked: 'revoked',
} as const