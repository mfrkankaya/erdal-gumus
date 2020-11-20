import s from 'slugify'

export const orderAlphabetically = (data, prop) =>
  data.sort((a, b) => {
    if (a[prop] < b[prop]) return -1
    if (a[prop] > b[prop]) return 1
    return 0
  })

export const orderByNumber = (data, prop) => data.sort((a, b) => b[prop] - a[prop])

export const capitalize = s => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const slugify = str =>
  s(str, {
    replacement: '_', // replace spaces with replacement
    remove: null, // regex to remove characters
    lower: true // result in lower case
  })

export const calculateTotalUnit = ({ colors, type, covers }) => {
  let result = 0
  if (!type) {
    colors.forEach(({ covers }) => {
      covers.forEach(({ unit }) => {
        if (parseInt(unit)) result += parseInt(unit)
      })
    })
  } else {
    covers.forEach(({ unit }) => {
      if (parseInt(unit)) result += parseInt(unit)
    })
  }
  return result
}

export const checkSendAvailable = products => {
  let result = true
  const _products = Object.values(products)
  if (_products.length === 0) return false
  _products.forEach(product => {
    const { type } = product
    if (!type) {
      const { code, totalUnit, colors, neededPatterns, productImage } = product
      if (!code || !totalUnit || !colors || !neededPatterns || !productImage) result = false
      colors.forEach(({ color, covers }) => {
        if (!color || !covers) result = false
        covers.forEach(({ cover, unit }) => {
          if (!cover || !unit) result = false
        })
      })
    } else {
      const { code, totalUnit, covers, neededPatterns, productImage } = product
      if (!code || !totalUnit || !covers || !neededPatterns || !productImage) result = false
      covers.forEach(({ cover, unit }) => {
        if (!cover || !unit) result = false
      })
    }
  })

  return result
}
