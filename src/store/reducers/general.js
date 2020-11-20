import {
  FETCH_CATEGORIES,
  FETCH_SUBCATEGORIES,
  FETCH_PATTERNS,
  FETCH_PRODUCTS,
  FETCH_COLORS,
  FETCH_COVERS,
  FETCH_ORDERS,
  FETCH_IMAGE_SIZE,
  FETCH_LAST_PRODUCT_NUMBER,
  FETCH_TABLE_SIZE
} from '../actions/types'
import { orderByNumber } from '../../helpers'

const initialState = {
  categories: [],
  subCategories: [],
  colors: [],
  _colors: null,
  covers: [],
  _covers: null,
  preparedCovers: [],
  preparedColors: [],
  patterns: [],
  _patterns: null,
  products: [],
  _products: {},
  orders: [],
  _orders: {},
  imageSize: 10,
  tableSize: 0.85,
  lastProductNumber: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return { ...state, categories: action.payload }
    case FETCH_SUBCATEGORIES:
      return { ...state, subCategories: action.payload }
    case FETCH_COLORS:
      return {
        ...state,
        colors: Object.values(action.payload),
        preparedColors: Object.values(action.payload).map(item => ({ text: item.name, key: item.id, value: item.id })),
        _colors: action.payload
      }
    case FETCH_COVERS:
      return {
        ...state,
        covers: Object.values(action.payload),
        preparedCovers: Object.values(action.payload).map(item => ({ text: item.name, key: item.id, value: item.id })),
        _covers: action.payload
      }
    case FETCH_PATTERNS:
      return { ...state, patterns: Object.values(action.payload), _patterns: action.payload }
    case FETCH_PRODUCTS:
      return { ...state, products: Object.values(action.payload), _products: action.payload }
    case FETCH_ORDERS:
      return { ...state, orders: orderByNumber(Object.values(action.payload), 'date'), _orders: action.payload }
    case FETCH_IMAGE_SIZE:
      return { ...state, imageSize: parseInt(action.payload) }
    case FETCH_TABLE_SIZE:
      return { ...state, tableSize: parseFloat(action.payload) }
    case FETCH_LAST_PRODUCT_NUMBER:
      return { ...state, lastProductNumber: parseInt(action.payload) }
    default:
      return state
  }
}
