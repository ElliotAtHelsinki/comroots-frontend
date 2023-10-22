export interface Message {
  id: string
  createdAt: Date
  updatedAt: Date
  type: 'text' | 'image' | 'video' | 'audio' | 'file'
  content: string
  senderId: number
}
