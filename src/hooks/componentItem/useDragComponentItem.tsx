import type { ComputedRef, SetupContext } from 'vue'

export function useDragComponentItem(containerRef: ComputedRef<HTMLDivElement | undefined>, currentComponent: { [props: string]: any } | null, ctx: SetupContext<'UpdateDataFunc'[]>) {
  const dragenter = (e: DragEvent) => {
    e.dataTransfer!.dropEffect = 'move'
  }
  const dragover = (e: DragEvent) => {
    e.preventDefault()
  }
  const dragleave = (e: DragEvent) => {
    e.dataTransfer!.dropEffect = 'none'
  }
  const drop = (e: DragEvent) => {
    const { offsetX, offsetY } = e
    ctx.emit('UpdateDataFunc', { top: offsetY, left: offsetX, key: currentComponent?.key, alignCenter: true })
    currentComponent = null
  }

  const dragestart = (_: MouseEvent, component: { key: string } | any) => {
    /* 拖拽进入主容器时触发 */
    containerRef.value?.addEventListener('dragenter', dragenter)
    // dragover 取消默认行为不然不会触发 dragenter
    containerRef.value?.addEventListener('dragover', dragover)
    containerRef.value?.addEventListener('dragleave', dragleave)
    // 放置元素触发，生成组件
    containerRef.value?.addEventListener('drop', drop)
    currentComponent = component
  }
  const dragend = (_: MouseEvent) => {
    containerRef.value?.removeEventListener('dragenter', dragenter)
    // dragover 取消默认行为不然不会触发 dragenter
    containerRef.value?.removeEventListener('dragover', dragover)
    containerRef.value?.removeEventListener('dragleave', dragleave)
    // 放置元素触发，生成组件
    containerRef.value?.removeEventListener('drop', drop)
  }
  return {
    dragestart,
    dragend,
  }
}
