import { App } from 'vue'
import { Button, Menu, Slider, Space } from 'ant-design-vue'
// 按需引入导航菜单后部分样式不生效，导致子菜单无法正常显示，需要手动引入 css 格式的样式文件
import 'ant-design-vue/lib/menu/style/index.css'

// 组件列表
const components = [
  // 按钮：https://2x.antdv.com/components/button-cn
  Button,
  // 间距：https://2x.antdv.com/components/space-cn
  Space,
  // 滑动输入条：https://2x.antdv.com/components/slider-cn
  Slider,
  // 导航菜单：https://2x.antdv.com/components/menu-cn
  Menu,
  Menu.Item,
  Menu.Divider,
  Menu.SubMenu,
  Menu.ItemGroup
]

export default (app: App<Element>): void => {
  // 按需引入组件，不能在此处引入图标，否则打包之后无法正常显示，需要在对应的组件中直接进行引用
  for (const component of components) {
    app.component(component.name, component)
  }
}
