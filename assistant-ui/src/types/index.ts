export interface Reference {
  title: string
  score: string
  text: string
}

export interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  refs?: Reference[]
}

export interface JiraTicket {
  key: string
  summary: string
  assignee: string
}
