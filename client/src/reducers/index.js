import { combineReducers } from 'redux'

import layout from './layout'
import home from './home'
import product from './product'
import category from './category'
import dashboard from './dashboard'
import order from './order'

export default combineReducers({ layout, home, product, category, dashboard, order })