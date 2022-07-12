/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/display-name */
import { useDragComponentItem } from '~/hooks/componentItem/useDragComponentItem'
export default defineComponent({
  name: 'ComponentItem',
  props: {
    component: {
      type: Object,
      required: true,
    },
    parentRef: { type: Object },
  },
  emits: ['UpdateDataFunc'],
  setup(props, ctx) {
    const { isDrag } = inject('root') as { isDrag: boolean }

    const currentComponent: { key: string } | null = null

    const containerRef = computed((): HTMLDivElement | undefined => props.parentRef!.value as HTMLDivElement | undefined)

    const { dragend, dragestart } = useDragComponentItem(containerRef, currentComponent, ctx)

    const events = isDrag
      ? {
          onDragstart: (e: MouseEvent) => dragestart(e, props.component),
          onDragend: (e: MouseEvent) => dragend(e),
        }
      : {}

    return () => {
      return <div class="component-item" draggable={isDrag} {...events}>
        <span class="component-item-tip" title={props.component.text}>{props.component.text}</span>
        <div>{props.component.perview()}</div>
      </div>
    }
  },
})
