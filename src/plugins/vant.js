import Vue from 'vue'
// 导入样式文件
import 'vant/lib/index.css'

import { Button, NavBar, Tabbar, TabbarItem,Tab,Tabs,Image, Lazyload,ImagePreview,Cell,List,CellGroup,Field,Row,Col} from 'vant'

Vue.use(Button).use(NavBar).use(Tabbar).use(TabbarItem).use(Tab).use(Tabs).use(Image)
.use(ImagePreview).use(Cell).use(List).use(CellGroup).use(Field).use(Row).use(Col)
Vue.use(Lazyload);
