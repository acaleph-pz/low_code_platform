export interface BlockState {
  top: number
  zIndex: number
  key: string
  left: number
  height?: number
  width?: number
}

export interface CommonState {
  container: { width: number; height: number }
  blocks: BlockState[]
}
