/* eslint-disable vue/no-mutating-props */
/* eslint-disable react/no-unknown-property */

import type { CSSProperties } from 'vue'
import type { BlockState } from '../type'
import { useComponets } from '~/hooks/platform/useComponent'

/* eslint-disable react/display-name */
export default defineComponent({
  name: 'Block',
  props: {
    block: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const blockRef = ref<HTMLDivElement | null>(null)
    const block = computed((): BlockState => props.block as BlockState)
    const { componentMap } = useComponets()
    const blockStyle = computed((): CSSProperties => {
      const { top, left, zIndex } = props.block
      return {
        top: `${top}px`,
        left: `${left}px`,
        zIndex,
      }
    })
    onMounted(() => {
      const { offsetHeight, offsetWidth } = blockRef.value!
      if (props.block.alignCenter) {
        props.block.top = `${block.value.top + offsetHeight}px`
        props.block.left = `${block.value.left + offsetWidth}px`
      }
      props.block.width = offsetWidth
      props.block.height = offsetHeight
    })
    return () => {
      return <div class="block-item" style={blockStyle.value} ref={blockRef}>{componentMap[block.value.key]}</div>
    }
  },
})
