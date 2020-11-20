import {
  ADD_PRODUCT_TO_ORDER,
  REMOVE_PRODUCT_FROM_ORDER,
  CATEGORY_CHANGED,
  ADD_PRODUCT_EDIT_ITEM,
  EDIT_ITEM_COLOR_CHANGED,
  EDIT_ITEM_COVER_CHANGED,
  EDIT_ITEM_COVER_UNIT_CHANGED,
  ADD_EDIT_ITEM_COVER,
  CHECK_SEND_AVAILABLE,
  SEND_ORDER,
  SEND_ORDER_FAIL,
  SEND_ORDER_SUCCESS,
  SET_DEFAULT,
  REMOVE_PRODUCT_EDIT_ITEM,
  SEARCHTEXT_CHANGED,
  REMOVE_EDIT_ITEM_COVER
} from '../actions/types'
import { calculateTotalUnit, checkSendAvailable } from '../../helpers'

const initialState = {
  products: {},
  parentCategory: '',
  subCategory: '',
  removedProducts: {},
  sendAvailable: false,
  pending: false,
  sendingFinished: false,
  sendStatus: '',
  searchText: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_ORDER:
      const p = { ...action.payload } // p stands for product
      if (!state.removedProducts[p.code])
        if (p.type) {
          return {
            ...state,
            products: {
              ...state.products,
              [p.code]: {
                code: p.code,
                totalUnit: 0,
                covers: [{ cover: '', unit: '' }],
                neededPatterns: p.patterns,
                productImage: p.productImage,
                type: p.type
              }
            }
          }
        } else {
          return {
            ...state,
            products: {
              ...state.products,
              [p.code]: {
                code: p.code,
                totalUnit: 0,
                colors: [{ color: '', covers: [{ cover: '', unit: '' }] }],
                neededPatterns: p.patterns,
                productImage: p.productImage,
                type: p.type
              }
            }
          }
        }
      else
        return {
          ...state,
          products: {
            ...state.products,
            [p.code]: {
              ...state.removedProducts[p.code]
            }
          }
        }

    case REMOVE_PRODUCT_FROM_ORDER:
      const prods = { ...state.products }
      const removedProduct = Object.assign({}, prods[action.payload])
      delete prods[action.payload]
      return {
        ...state,
        products: prods,
        removedProducts: { ...state.removedProducts, [action.payload]: { ...removedProduct } }
      }

    case CATEGORY_CHANGED:
      const name = action.payload.name
      const oldName = state.parentCategory
      if (name === 'parentCategory') {
        if (oldName !== name) return { ...state, parentCategory: action.payload.value, subCategory: '' }
        else return { ...state, sendAvailable: checkSendAvailable(state.products) }
      } else {
        if (oldName !== name) return { ...state, subCategory: action.payload.value }
        else return { ...state, sendAvailable: checkSendAvailable(state.products) }
      }

    case ADD_PRODUCT_EDIT_ITEM:
      return {
        ...state,
        products: {
          ...state.products,
          [action.payload]: {
            ...state.products[action.payload],
            colors: [...state.products[action.payload].colors, { color: '', covers: [{ cover: '', unit: '' }] }]
          }
        }
      }

    case REMOVE_PRODUCT_EDIT_ITEM:
      let newActiveColors = [...state.products[action.payload.productCode].colors]
      newActiveColors.splice(action.payload.index, 1)
      return {
        ...state,
        products: {
          ...state.products,
          [action.payload.productCode]: {
            ...state.products[action.payload.productCode],
            colors: newActiveColors
          }
        }
      }

    case EDIT_ITEM_COLOR_CHANGED:
      let activeColors = [...state.products[action.payload.productCode].colors]
      activeColors[action.payload.index].color = action.payload.value
      return {
        ...state,
        products: {
          ...state.products,
          [action.payload.productCode]: {
            ...state.products[action.payload.productCode],
            colors: activeColors
          }
        }
      }

    case EDIT_ITEM_COVER_CHANGED:
      const { productCode, parentIndex, index, value, type } = action.payload
      if (!type) {
        let colors = [...state.products[productCode].colors]
        colors[parentIndex].covers[index].cover = value
        return {
          ...state,
          products: { ...state.products, [productCode]: { ...state.products[productCode], colors } }
        }
      } else {
        let covers = [...state.products[productCode].covers]
        covers[index].cover = value
        return {
          ...state,
          products: { ...state.products, [productCode]: { ...state.products[productCode], covers } }
        }
      }

    case EDIT_ITEM_COVER_UNIT_CHANGED:
      const { productCode: pCode, parentIndex: pIndex, index: i, value: v, type: t } = action.payload
      if (!t) {
        let c = [...state.products[pCode].colors]
        c[pIndex].covers[i].unit = v
        return {
          ...state,
          products: {
            ...state.products,
            [pCode]: { ...state.products[pCode], totalUnit: calculateTotalUnit(state.products[pCode]), colors: c }
          }
        }
      } else {
        let c = [...state.products[pCode].covers]
        c[i].unit = v
        return {
          ...state,
          products: {
            ...state.products,
            [pCode]: { ...state.products[pCode], totalUnit: calculateTotalUnit(state.products[pCode]), covers: c }
          }
        }
      }

    case ADD_EDIT_ITEM_COVER:
      if (!action.payload.type) {
        let newColors = [...state.products[action.payload.productCode].colors]
        newColors[action.payload.parentIndex].covers = [...newColors[action.payload.parentIndex].covers, { cover: '', unit: '' }]
        return {
          ...state,
          products: {
            ...state.products,
            [action.payload.productCode]: {
              ...state.products[action.payload.productCode],
              colors: newColors
            }
          }
        }
      } else {
        return {
          ...state,
          products: {
            ...state.products,
            [action.payload.productCode]: {
              ...state.products[action.payload.productCode],
              covers: [...state.products[action.payload.productCode].covers, { cover: 2, unit: '' }]
            }
          }
        }
      }

    case REMOVE_EDIT_ITEM_COVER:
      if (!action.payload.type) {
        let nColors = [...state.products[action.payload.productCode].colors]
        nColors[action.payload.parentIndex].covers = nColors[action.payload.parentIndex].covers.filter(
          (coverr, i) => i != action.payload.index
        )
        return {
          ...state,
          products: {
            ...state.products,
            [action.payload.productCode]: {
              ...state.products[action.payload.productCode],
              colors: nColors
            }
          }
        }
      } else {
        return {
          ...state,
          products: {
            ...state.products,
            [action.payload.productCode]: {
              ...state.products[action.payload.productCode],
              covers: state.products[action.payload.productCode].covers.filter((coverr, i) => i != action.payload.index)
            }
          }
        }
      }

    case CHECK_SEND_AVAILABLE:
      return { ...state, sendAvailable: checkSendAvailable(state.products) }

    case SEND_ORDER:
      return { ...state, pending: true }

    case SEND_ORDER_SUCCESS:
      return { ...state, pending: false, sendingFinished: true, sendStatus: 'success' }

    case SEND_ORDER_FAIL:
      return { ...state, pending: false, sendingFinished: true, sendStatus: 'fail' }

    case SET_DEFAULT:
      return {
        products: {},
        parentCategory: '',
        subCategory: '',
        removedProducts: {},
        sendAvailable: false,
        pending: false,
        sendingFinished: false,
        sendStatus: ''
      }

    case SEARCHTEXT_CHANGED:
      return { ...state, searchText: action.payload }
    default:
      return { ...state }
  }
}
