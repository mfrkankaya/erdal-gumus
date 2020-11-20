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
} from './types'
import * as firebase from 'firebase'
import { orderByNumber } from '../../helpers'

export const fetchCategories = () => dispatch => {
  firebase
    .database()
    .ref('/categories')
    .on('value', snap => {
      if (snap.val()) dispatch({ type: FETCH_CATEGORIES, payload: Object.values(snap.val()) })
      else dispatch({ type: FETCH_CATEGORIES, payload: [] })
    })
}

export const fetchSubCategories = () => dispatch => {
  firebase
    .database()
    .ref('/subCategories')
    .on('value', snap => {
      if (snap.val()) dispatch({ type: FETCH_SUBCATEGORIES, payload: Object.values(snap.val()) })
      else dispatch({ type: FETCH_SUBCATEGORIES, payload: [] })
    })
}

export const fetchColors = () => dispatch => {
  firebase
    .database()
    .ref('/colors')
    .on('value', snap => {
      if (snap.val()) dispatch({ type: FETCH_COLORS, payload: snap.val() })
      else dispatch({ type: FETCH_COLORS, payload: [] })
    })
}

export const fetchCovers = () => dispatch => {
  firebase
    .database()
    .ref('/covers')
    .on('value', snap => {
      if (snap.val()) dispatch({ type: FETCH_COVERS, payload: snap.val() })
      else dispatch({ type: FETCH_COVERS, payload: [] })
    })
}

export const fetchPatterns = () => dispatch => {
  firebase
    .database()
    .ref('/patterns')
    .on('value', snap => {
      if (snap.val()) dispatch({ type: FETCH_PATTERNS, payload: snap.val() })
      else dispatch({ type: FETCH_PATTERNS, payload: {} })
    })
}

export const fetchProducts = () => dispatch => {
  firebase
    .database()
    .ref('/products')
    .on('value', snap => {
      if (snap.val()) dispatch({ type: FETCH_PRODUCTS, payload: snap.val() })
      else dispatch({ type: FETCH_PRODUCTS, payload: {} })
    })
}

export const fetchOrders = () => dispatch => {
  firebase
    .database()
    .ref('/orders')
    .on('value', snap => {
      if (snap.val()) dispatch({ type: FETCH_ORDERS, payload: snap.val() })
      else dispatch({ type: FETCH_ORDERS, payload: {} })
    })
}

export const fetchImageSize = () => dispatch => {
  firebase
    .database()
    .ref('/imageSize')
    .on('value', snap => {
      if (snap.val()) dispatch({ type: FETCH_IMAGE_SIZE, payload: snap.val() })
      else dispatch({ type: FETCH_IMAGE_SIZE, payload: 10 })
    })
}

export const fetchTableSize = () => dispatch => {
  firebase
    .database()
    .ref('/tableSize')
    .on('value', snap => {
      if (snap.val()) dispatch({ type: FETCH_TABLE_SIZE, payload: snap.val() })
      else dispatch({ type: FETCH_TABLE_SIZE, payload: 0.85 })
    })
}

export const fetchLastProductNumber = () => dispatch => {
  firebase
    .database()
    .ref('/lastProductNumber')
    .on('value', snap => {
      if (snap.val()) dispatch({ type: FETCH_LAST_PRODUCT_NUMBER, payload: snap.val() })
      else dispatch({ type: FETCH_LAST_PRODUCT_NUMBER, payload: null })
    })
}
