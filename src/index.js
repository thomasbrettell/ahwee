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
    {x: 100, y: -120},
    {x: 300, y: 10},
    {x: 500, y: 100},
    {x: 750, y: -100},
    {x: 350, y: -50},
    {x: 600, y: 100},
    {x: 800, y: 0},
    {x: window.innerWidth, y: -250}
  ]
}

const tween = new TimelineLite()

tween.add(
  TweenLite.to('.dot', 1, {
    bezier: dotPath,
    ease: Power1.easeInOut
  })
)

console.log(tween)

const controller = new ScrollMagic.Controller()

const scene = new ScrollMagic.Scene({
  triggerElement: 'section',
  duration: 5000,
  triggerHook: 0
})
.setTween(tween)
.addIndicators()
.setPin('section')
.addTo(controller)