/* eslint-disable react/no-unknown-property */
/* eslint-disable react/display-name */
import type { CSSProperties } from 'vue'
import './platform.less'
import Block from './components/block'
import type { BlockState } from './type'
import ComponentItem from './components/componentItem'
import { useComponets } from '~/hooks/platform/useComponent'

export default defineComponent({
  name: 'Platform',
  components: { ComponentItem },
  props: {
    modelValue: { type: Object, required: true },
    root: { type: Object, required: false },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    provide('root', props.root)

    const containerStyle = computed((): CSSProperties => {
      const { width, height } = props.modelValue.container
      return {
        height: `${height}px`,
        width: `${width}px`,
      }
    })
    const blocks = computed({
      get(): BlockState[] {
        return props.modelValue.blocks
      },
      set(newValue) {
        ctx.emit('update:modelValue', { container: props.modelValue.container, blocks: newValue })
      },
    })
    const { componentList } = useComponets()

    const updateData = (component: BlockState) => {
      blocks.value = [...blocks.value, component]
    }

    const containerRef = ref(null)
    return () => {
      return <div class="platform">
          <div class="platform-header">

          </div>
          <div class="platform-left">
            {
              componentList.map((componet, index) => { return <componentItem onUpdateDataFunc={updateData} key={index} component={componet} parentRef={containerRef}/> })
            }
          </div>
          <div class="platform-container">
            <div class="platform-container-canvas">
              <div class="platform-container-content" ref={containerRef} style={containerStyle.value}>
                {
                  blocks.value.map((block, index) => {
                    return <Block key={index} block={block}/>
                  })
                }
              </div>
            </div>
          </div>
          <div class="platform-right"></div>
      </div>
    }
  },
})
