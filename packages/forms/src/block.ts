// import { DbBlock, DbPerson, DbQuestion } from './inferred';

type SchemaDomNode = {
  el: string
  attrs: string
  children?: string | Array<SchemaNode>
}
type SchemaComponent = {
  c: string | any
  props?: Record<string, any>
  children?: string | Array<SchemaNode>
}
type SchemaTextNode = string
type SchemaNode = SchemaDomNode | SchemaComponent | SchemaTextNode

type NodeType = 'input' | 'list' | 'group'
type BaseNode<T = any> = {
  type: NodeType
  name: string
  index: number
  parent?: BaseNode<any>
  readonly value: T
  input: (value: T) => T
  schema: SchemaNode
}

export type InputNode = BaseNode & {
  type: 'input'
}

export type ListNode<T = any, U = any> = BaseNode<Array<T>> & {
  type: 'list'
  children: Array<BaseNode<U>>
}

export type GroupNode = BaseNode<Record<string, any>> & {
  type: 'list'
  children: Record<string, any>
}
export type CNode = InputNode | ListNode | GroupNode


type AtomicInputNode = {
  Text: { input: string, output: string },
  Boolean: { input: Boolean, output: Boolean },
  Number: { input: Number, output: Number },
  File: { input: Blob, output: string }
}

type AtomicInput = {
  text: { base: AtomicInputNode['Text'], interface: 'text', display: 'text' },
  boolean: { base: AtomicInputNode['Boolean'], interface: 'checkbox', display: 'boolean' },
  number: { base: AtomicInputNode['Number'], interface: 'number', display: 'number' },
  file: { base: AtomicInputNode['File'], interface: 'file', display: 'file' },
}

// literally does nothing of value lol
// type Input<T extends keyof AtomicInput = 'text'> = {
//   [K in keyof AtomicInput[T]]: AtomicInput[T][K]
// }

export type CompositeType = {
  text: AtomicInputNode['Text']
  barcode_text: AtomicInputNode['Text'] & {
    interface: 'barcode',
    display: 'file',
  }
  boolean: AtomicInputNode['Boolean']
  date: AtomicInputNode['Text'] & {
    interface: 'datepicker',
    display: 'date',
  }
  email: AtomicInputNode['Text'] & {
    interface: 'email',
    display: 'text',
  }
  phone_number: AtomicInputNode['Text'] & {
    interface: 'email',
    display: 'text',
  }
  select: AtomicInputNode['Text'] & {
    interface: 'select',
    display: string,
  }
  mselect: AtomicInputNode['Text'] & {
    interface: 'multiselect',
    display: 'list',
  }
  float: AtomicInputNode['Number']
  integer: AtomicInputNode['Number']
  // time: {
  //   interface: string,
  //   display: string,
  // }
  // timestamp: {
  //   interface: string,
  //   display: string,
  // }
  // gps: {
  //   interface: string,
  //   display: string,
  // }
  // photo: {
  //   interface: string,
  //   display: string,
  // }
}

export const InputTypes = {
  barcode_text: '',
  boolean: '',
  date: '',
  email: '',
  float: '',
  gps: '',
  integer: '',
  mselect: '',
  phone_number: '',
  photo: '',
  select: '',
  text: '',
  time: '',
  timestamp: '',
}