import PropTypes from 'prop-types'
import React, { Component } from 'react'
import SignaturePad from 'signature_pad'
import trimCanvas from 'trim-canvas'

export default class SignatureCanvas extends Component {

  static propTypes = {
    // props specific to the React wrapper
    canvasProps: PropTypes.object,
    clearOnResize: PropTypes.bool
  }

  static defaultProps = {
    clearOnResize: true
  }

  _sigPad = null

  _excludeOurProps = () => {
    let {canvasProps, clearOnResize, ...sigPadProps} = this.props
    return sigPadProps
  }

  componentDidMount () {
    this._sigPad = new SignaturePad(this._canvas, this._excludeOurProps())
    this._resizeCanvas()
    this.on()
  }

  componentWillUnmount () {
    this.off()
  }

  // propagate prop updates to SignaturePad
  componentDidUpdate () {
    Object.assign(this._sigPad, this._excludeOurProps())
  }

  // return the canvas ref for operations like toDataURL
  getCanvas = () => {
    return this._canvas
  }

  // return a trimmed copy of the canvas
  getTrimmedCanvas = () => {
    // copy the canvas
    let copy = document.createElement('canvas')
    copy.width = this._canvas.width
    copy.height = this._canvas.height
    copy.getContext('2d').drawImage(this._canvas, 0, 0)
    // then trim it
    return trimCanvas(copy)
  }

  // return the internal SignaturePad reference
  getSignaturePad = () => {
    return this._sigPad
  }

  _checkClearOnResize = () => {
    if (!this.props.clearOnResize) {
      return
    }
    this._resizeCanvas()
  }

  _resizeCanvas = () => {
    let canvasProps = this.props.canvasProps || {}
    let {width, height} = canvasProps
    // don't resize if the canvas has fixed width and height
    if (width && height) {
      return
    }

    let canvas = this._canvas
    /* When zoomed out to less than 100%, for some very strange reason,
      some browsers report devicePixelRatio as less than 1
      and only part of the canvas is cleared then. */
    let ratio = Math.max(window.devicePixelRatio || 1, 1)

    if (!width) {
      canvas.width = canvas.offsetWidth * ratio
    }
    if (!height) {
      canvas.height = canvas.offsetHeight * ratio
    }
    canvas.getContext('2d').scale(ratio, ratio)
    this.clear()
  }

  render () {
    let {canvasProps} = this.props
    return(
      <div>
      <canvas ref={(ref) => { this._canvas = ref }} {...canvasProps} />
      </div>
    );
  }

  // all wrapper functions below render
  //
  on = () => {
    window.addEventListener('resize', this._checkClearOnResize)
    return this._sigPad.on()
  }

  off = () => {
    window.removeEventListener('resize', this._checkClearOnResize)
    return this._sigPad.off()
  }

  clear = () => {
    return this._sigPad.clear()
  }

  isEmpty = () => {
    return this._sigPad.isEmpty()
  }

  fromDataURL = (dataURL, options) => {
    return this._sigPad.fromDataURL(dataURL, options)
  }

  toDataURL = (type, encoderOptions) => {
    return this._sigPad.toDataURL(type, encoderOptions)
  }

  fromData = (pointGroups) => {
    return this._sigPad.fromData(pointGroups)
  }

  toData = () => {
    return this._sigPad.toData()
  }
}
