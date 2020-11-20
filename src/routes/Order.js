import React, { Component } from "react"
import * as firebase from "firebase"
import { connect } from "react-redux"
import { Checkbox, Button } from "semantic-ui-react"

class Order extends Component {
  state = {
    order: null,
    dokum: true,
    tasdizim: false,
    atolye: false
  }

  componentWillMount() {
    const { id } = this.props.match.params
    firebase
      .database()
      .ref(`/orders/${id}`)
      .once("value")
      .then(snap => this.setState({ order: snap.val() }))
  }

  renderSpace = (type, index) => {
    if (index === 0 || index === 1) return null
    if (type === "atolye") {
      if (index % 10 === 0 || index % 10 === 1) return "5rem"
    } else {
      if (index % 12 === 0 || index % 12 === 1) return "5rem"
    }
  }

  render() {
    const { _colors, _covers, _patterns, imageSize, tableSize } = this.props
    const { dokum, tasdizim, atolye } = this.state
    if (this.state.order && _colors && _covers && _patterns) {
      const products = Object.values(this.state.order.products)
      const _neededPatterns = calculateNeededPatterns(this.state.order.products, _patterns)
      const neededPatterns = slicePatterns(_neededPatterns)
      const _neededPatternsWithColor = calculateNeededPatternsWithColors(this.state.order.products, _patterns)
      return (
        <div>
          <div className='order-printing'>
            {/* Döküm */}
            {dokum && (
              <div className='flex flex-row wrap'>
                {neededPatterns.map(nPatterns => (
                  <table style={{ transform: `scale(${tableSize})` }} className='dokum-table'>
                    <thead>
                      <tr>
                        <th>Kod</th>
                        <th>Adet</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nPatterns.map(({ id, count }) => (
                        <tr key={id}>
                          <td>{id}</td>
                          <td>{count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ))}
              </div>
            )}
            {/* Taş Dizim */}
            {tasdizim && (
              <div className='flex flex-row wrap tasdizim'>
                {_neededPatternsWithColor.map(({ id, patternImage, colors }, index) => (
                  <div
                    style={{
                      marginBottom: this.renderSpace("tasdizim", index)
                      // width: "33.3%"
                    }}
                    className='products flex flex-row'
                    key={id}
                  >
                    <div className='flex flex-col'>
                      <span className='text-center low-scale-text'>Kod: {id}</span>
                      <img
                        src={patternImage}
                        style={{
                          height: `${(imageSize * 5) / 4}rem`
                        }}
                      />
                    </div>
                    <div className='flex flex-col'>
                      <table style={{ transform: `scale(${tableSize})` }} className='dizim-table ml-1'>
                        <thead>
                          <tr>
                            <th>Renk</th>
                            <th>Adet</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.values(colors).map(({ color, count }) => (
                            <tr key={color}>
                              <td>{_colors[color].name}</td>
                              <td>{count}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* Atölye */}
            {atolye && (
              <div className='flex flex-row wrap atolye'>
                {products.map((prod, index) => {
                  if (!prod.type) {
                    const tableColors = getProductsAllColors(prod)
                    const tableCovers = getProductsAllCovers(prod)
                    return (
                      <div
                        style={{
                          marginBottom: this.renderSpace("atolye", index)
                        }}
                        className='products'
                        key={prod.code}
                      >
                        <div className='flex flex-col'>
                          <span className='text-center low-scale-text'>
                            {prod.totalUnit} Adet {prod.code}
                          </span>
                          <img
                            src={prod.productImage}
                            style={{
                              height: `${(imageSize * 5) / 4}rem`
                            }}
                          />
                        </div>
                        <table style={{ transform: `scale(${tableSize})` }} className='ml-1'>
                          <thead>
                            <tr>
                              <th>Taş Rengi</th>
                              <th colSpan={tableCovers.length}>Kaplama</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th></th>
                              {tableCovers.map(cover => (
                                <th key={cover}>{_covers[cover].name}</th>
                              ))}
                            </tr>
                            {tableColors.map(color => (
                              <tr key={color}>
                                <th>{_colors[color].name}</th>
                                {tableCovers.map(cover => (
                                  <td key={cover + 1}>{detectColorCoverUnit(prod, color, cover)}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )
                  } else {
                    return (
                      <div
                        style={{
                          marginBottom: this.renderSpace("atolye", index)
                        }}
                        className='products'
                        key={prod.code}
                      >
                        <div className='flex flex-col'>
                          <span className='text-center low-scale-text'>
                            {prod.totalUnit} Adet {prod.code}
                          </span>
                          <img
                            src={prod.productImage}
                            style={{
                              height: `${(imageSize * 5) / 4}rem`
                            }}
                          />
                        </div>
                        <table style={{ transform: `scale(${tableSize})` }} className='ml-1'>
                          <thead>
                            <tr>
                              <th>Kaplama</th>
                              <th>Adet</th>
                            </tr>
                          </thead>
                          <tbody>
                            {prod.covers.map(({ cover, unit }) => (
                              <tr>
                                <th>{cover}</th>
                                <td>{unit}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )
                  }
                })}
              </div>
            )}
            <div className='print flex flex-row p-1'>
              {/* <Checkbox className="p-1" checked={dokum} label="Döküm" onChange={(e, data) => this.setState({ dokum: data.checked })} />
              <Checkbox
                className="p-1"
                checked={tasdizim}
                label="Taş Dizim"
                onChange={(e, data) => this.setState({ tasdizim: data.checked })}
              />
              <Checkbox className="p-1" checked={atolye} label="Atölye" onChange={(e, data) => this.setState({ atolye: data.checked })} /> */}
              <Button primary basic={!dokum} onClick={() => this.handlePrintButtonsClick("dokum")}>
                Döküm
              </Button>
              <Button primary basic={!tasdizim} onClick={() => this.handlePrintButtonsClick("tasdizim")}>
                Taş Dizim
              </Button>
              <Button primary basic={!atolye} onClick={() => this.handlePrintButtonsClick("atolye")}>
                Atölye
              </Button>
              <Button onClick={() => window.print()} color='orange'>
                Yazdır
              </Button>
            </div>
          </div>
        </div>
      )
    } else return <h2>Yükleniyor..</h2>
  }
  handlePrintButtonsClick = clickedOne =>
    this.setState({
      dokum: false,
      tasdizim: false,
      atolye: false,
      [clickedOne]: true
    })
}

const mapStateToProps = ({ general: { _colors, _covers, _products, _patterns, imageSize, tableSize } }) => ({
  _colors,
  _covers,
  _products,
  _patterns,
  imageSize,
  tableSize
})

export default connect(mapStateToProps)(Order)

// Taş Dizim Fonksiyonları
const calculateNeededPatternsWithColors = (products, _patterns) => {
  let result = {}
  const productsArr = Object.values(products)
  productsArr.forEach(({ totalUnit, neededPatterns, colors, type, covers }) => {
    // const prodUnit = parseInt(totalUnit)
    if (!type) {
      neededPatterns.forEach(({ id: patternId, pieces: neededPieces }) => {
        const piecePerStick = parseInt(_patterns[patternId].pieces)
        const patternImage = _patterns[patternId].patternImage
        colors.forEach(({ color, covers }) => {
          let colorUnit = 0
          covers.forEach(({ unit }) => {
            colorUnit += parseInt(unit)
          })

          const totalNeededPieces = colorUnit * parseInt(neededPieces)
          const neededSticks = Math.ceil(totalNeededPieces / piecePerStick)
          if (!_patterns[patternId].type) {
            if (result[patternId]) {
              if (result[patternId].colors[color]) {
                result[patternId].colors = {
                  ...result[patternId].colors,
                  [color]: { color, count: result[patternId].colors[color].count + neededSticks }
                }
              } else {
                result[patternId].colors = {
                  ...result[patternId].colors,
                  [color]: { color, count: neededSticks }
                }
              }
            } else {
              result[patternId] = {
                id: patternId,
                patternImage,
                colors: { [color]: { color, count: neededSticks } }
              }
            }
          }
        })
      })
    } else {
      neededPatterns.forEach(({ id: patternId, pieces: neededPieces, color }) => {
        const piecePerStick = parseInt(_patterns[patternId].pieces)
        const patternImage = _patterns[patternId].patternImage
        let colorUnit = 0
        covers.forEach(({ unit }) => {
          colorUnit += parseInt(unit)
        })

        const totalNeededPieces = colorUnit * parseInt(neededPieces)
        const neededSticks = Math.ceil(totalNeededPieces / piecePerStick)

        if (result[patternId]) {
          if (result[patternId].colors[color]) {
            result[patternId].colors = {
              ...result[patternId].colors,
              [color]: { color, count: result[patternId].colors[color].count + neededSticks }
            }
          } else {
            result[patternId].colors = {
              ...result[patternId].colors,
              [color]: { color, count: neededSticks }
            }
          }
        } else {
          result[patternId] = {
            id: patternId,
            patternImage,
            colors: { [color]: { color, count: neededSticks } }
          }
        }
      })
    }
  })
  return Object.values(result)
}

// Döküm Fonksiyonları

const calculateNeededPatterns = (products, _patterns) => {
  let result = {}
  const productsArr = Object.values(products)
  productsArr.forEach(({ totalUnit, neededPatterns }) => {
    const prodUnit = parseInt(totalUnit)
    neededPatterns.forEach(({ id: patternId, pieces: neededPieces }) => {
      const piecePerStick = parseInt(_patterns[patternId].pieces)
      const totalNeededPieces = prodUnit * parseInt(neededPieces)
      const neededSticks = Math.ceil(totalNeededPieces / piecePerStick)
      if (result[patternId]) {
        result[patternId].count += neededSticks
      } else {
        result[patternId] = {
          id: patternId,
          count: neededSticks
        }
      }
    })
  })
  return Object.values(result)
}

const slicePatterns = patterns => {
  let result = []
  let maxLength = 5

  for (let i = 0; i < patterns.length; i++) {
    const pattern = patterns[i]
    if (i % maxLength === 0) {
      const temp = patterns.slice(i, i + maxLength)
      result = [...result, temp]
    }
  }
  return result
}

// Atölye Fonksiyonları
const detectColorCoverUnit = ({ colors }, selectedColor, selectedCover) => {
  let result = ""
  colors.forEach(({ color, covers }) => {
    if (color == selectedColor) {
      covers.forEach(({ cover, unit }) => {
        if (cover == selectedCover) result = unit
      })
    }
  })
  return result
}

const getProductsAllCovers = ({ colors }) => {
  let result = {}
  colors.forEach(({ covers }) => {
    covers.forEach(({ cover }) => {
      result[cover] = cover
    })
  })
  return Object.values(result)
}

const getProductsAllColors = ({ colors }) => {
  let result = {}
  colors.forEach(({ color }) => {
    result[color] = color
  })
  return Object.values(result)
}
