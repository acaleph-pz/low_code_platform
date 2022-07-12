export interface ComponentItemState {
  key: string
  render: () => void
  perview: () => void
  text: string
}

export function useComponets() {
  const componentList: ComponentItemState[] = [
  ]
  const componentMap: { [props: string]: any } = {}
  const register = (component: ComponentItemState) => {
    componentList.push(component)
    componentMap[component.key] = component.render()
  }
  register({
    key: 'header',
    render: () => 'header',
    perview: () => 'header',
    text: '店铺头部区域',
  })
  register({
    key: 'banner',
    render: () => <div>banner</div>,
    perview: () => <div>banner</div>,
    text: '轮播图',
  })
  register({
    key: 'image',
    render: () => <div>images</div>,
    perview: () => <div>images</div>,
    text: '图片',
  })
  return {
    componentList,
    componentMap,
  }
}
