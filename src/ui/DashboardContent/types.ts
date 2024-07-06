export type TNote = {
  id: number
  text: string
  date: string
  progress: string
}

export type TWorkspace = {
  id: number
  name: string
  notes: TNote[]
}
