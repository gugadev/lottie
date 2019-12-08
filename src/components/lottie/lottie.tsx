/**
 * @author Gustavo Garzaki
 * @license MIT
 * 
 * This source file was written with StencilJS. Lottie
 * is a web component that bootstraps lottie-web library
 * from airbnb to use it on any framework out there.
 */

import { Component, Prop, State, h, Method, Watch } from '@stencil/core'
import uuid from 'uuid'
import lottie, { AnimationItem } from 'lottie-web'

@Component({
  tag: 'x-lottie',
  styleUrl: './lottie.scss'
})
export class Lottie {
  @Prop() data: string = ''
  @Prop() infinite: boolean = true
  @Prop() autoplay: boolean = true
  @Prop() progressive: boolean = false
  @Prop({ attribute: 'aspectratio' }) aspectRatio: string = ''
  @State() private key: string = uuid.v4()
  private lottieAnimation: AnimationItem = null

  constructor() {
    this.mountAnimation = this.mountAnimation.bind(this)
  }

  componentDidLoad() {
    this.parseJsonData().then(this.mountAnimation)
  }

  @Watch('data')
  onDataChange(newPath: string) {
    this.parseJsonData(newPath).then(this.mountAnimation)
  }

  private parseJsonData(newPath?: string): Promise<Record<string, any>> {
    if (!this.data) {
      return
    }
    return fetch(newPath || this.data).then(res => res.json())
  }

  private mountAnimation(animationData: Record<string, any>): void {
    if (this.lottieAnimation) {
      this.lottieAnimation.destroy()
    }
    const container = document.querySelector(`[data-key="${this.key}"]`)
    const configuration = {
      container,
      renderer: 'svg',
      loop: this.infinite,
      autoplay: this.autoplay,
      animationData,
      renderSettings: {
        progressiveLoad: this.progressive,
        preserveAspectRatio: this.aspectRatio
      }
    }
    this.lottieAnimation = lottie.loadAnimation(configuration as any)
  }

  @Method()
  async destroy(): Promise<void> {
    this.lottieAnimation.destroy()
  }

  @Method()
  async pause(): Promise<void> {
    this.lottieAnimation.pause()
  }

  @Method()
  async resume(): Promise<void> {
    this.lottieAnimation.play()
  }

  render() {
    return <div class="lottie-draw" data-key={this.key} />
  }
}