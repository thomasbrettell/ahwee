import * as ScrollMagic from "scrollmagic";
import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap'
import gsap from 'gsap'
import $ from 'jquery'

console.log($)
console.log(ScrollMagic)
console.log(gsap)

const dotPath = {
  curviness: 1.25,
  values: [
    {x: window.innerWidth, y: 0}
  ]
}

const oneTween = new TimelineLite()

oneTween.add(
  TweenLite.to('.one .dot', 1, {
    bezier: dotPath,
    ease: Power1.easeInOut
  })
)

const twoTween = new TimelineLite()

twoTween.add(
  TweenLite.to('.two .dot', 1, {
    bezier: dotPath,
  })
)


const controller = new ScrollMagic.Controller()

const scene = new ScrollMagic.Scene({
  triggerElement: '.one',
  duration: 3000,
  triggerHook: .25
})
.setTween(oneTween)
.addIndicators()
.setPin('.one')
.addTo(controller)

const sceneTwo = new ScrollMagic.Scene({
  triggerElement: '.two',
  duration: 3000,
  triggerHook: .25
})
.setTween(twoTween)
.addIndicators()
.setPin('.two')
.addTo(controller)