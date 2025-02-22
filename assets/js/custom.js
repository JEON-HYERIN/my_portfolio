// lenis
const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0);

// a태그 기본동작 방지
$(function () {
  $(document).on('click', 'a[href="#"]', function (e) {
    e.preventDefault();
  });
})

// 새로고침 시 사용자 스크롤 위치 저장하지 않음
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

const visualText = new SplitType('.section-visual__headline .word-wrapper', {types: 'words', tagName: 'span'});

// loading
// const loadingTl = gsap.timeline({
//   // paused: true,
//   defaults: {
//     duration: .6,
//   },
//   onStart: function() {
//     document.body.classList.add('is-loading');
//     lenis.stop();
//   },
//   onComplete: function() {
//     lenis.start();
//   }
// });
// loadingTl
// .to('.loading', {yPercent: -100, delay: .5, duration: .6, onUpdate: function() {document.body.classList.remove('is-loading');}}, 'a')
// .set('.loading', {display: 'none'}, 'b')
// .from('.section-visual__background img', {y: '12.5rem', opacity: 0}, 'b')
// .from('.section-visual__headline .word', {yPercent: 150, opacity: 0, duration: .8, stagger: .12}, 'b')
// .from('.header__logo a', {y: '3.75rem', opacity: 0}, 'b+=.6')
// .from('.section-visual__textbox', {y: '3.75rem', opacity: 0}, 'b+=.7')
// .from('.global-nav__link', {y: '3.75rem', opacity: 0, stagger: .1}, 'b+=.8')
// .from('.section-visual__scroll span', {y: '3.75rem', opacity: 0}, 'b+=.8')

// header
window.addEventListener('scroll', function() {
  const headerEl = document.querySelector('.header');
  const visual= document.querySelector('.section-visual');
  const visualOffset = visual.getBoundingClientRect().height;
  const CLASSNAME = 'is-scrolled';

  if(window.scrollY > visualOffset) {
    headerEl.classList.add(CLASSNAME);
  } else {
    headerEl.classList.remove(CLASSNAME);
  }
})

// nav
const navLinks = document.querySelectorAll('.global-nav__link');

navLinks.forEach(function(navLink) {
  const anchor = navLink.getAttribute('href');
  
  navLink.addEventListener('click', () => {
    lenis.scrollTo(anchor);
  });
});

// visual
// const visualTl = gsap.timeline({
//   defaults: {
//     delay: .5,
//   }
// });
// const visualTexts = document.querySelectorAll('.change-move__text');
// visualTexts.forEach(function(visualText, index) {
//   visualTl.to(visualText, {yPercent: -index * 100})
// });
const changeMoveEl = document.querySelector('.change-move');
const changeMoveHeight = changeMoveEl.getBoundingClientRect().height;
const changeMoveTl = gsap.timeline({
    defaults: {
    duration: .8,
    delay: .5,
    // ease: 'none'
  },
  repeat: -1
});
const changeMoveTexts = document.querySelectorAll('.change-move__text');
for(let i = 0; i < changeMoveTexts.length; i++) {
  changeMoveTl.to('.change-move__inner', {y: changeMoveHeight * -i})
}

// matchMedia
let mm = gsap.matchMedia();
mm.add("(min-width: 700px)", () => {
  gsap.from('.section-work__thumbnail *', {
    yPercent: -3.5,
    scale: 1.1,
    scrollTrigger: {
      trigger: '.section-work__list',
      start: 'top bottom',
      end: 'bottom center',
      scrub: 0,
      // markers: true
    }
  });
});
mm.add("(min-width: 1000px)", () => {
  gsap.from('.footer__inner', {
    yPercent: '-60',
    scrollTrigger: {
      trigger: '.section-work',
      start: 'bottom bottom',
      endTrigger: '.footer',
      end: '30% center',
      scrub: 0,
      // markers: true
    }
  })
})

// footer
// const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// const date = new Date();
// const year = date.getFullYear();
// const month = date.getMonth();
// const yearEl = document.querySelector('.footer__year');
// const monthEl = document.querySelector('.footer__month');

// yearEl.textContent = year;
// monthEl.textContent = monthNames[month].substring(0, 3);

// cursor
const cursor = document.querySelector('.cursor');
const anchorEls = document.querySelectorAll('a');
const CLASSNAME = 'is-hover';

window.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  
  cursor.style.cssText = `top: ${y}px; left: ${x}px;`;
});

anchorEls.forEach(function(el) {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add(CLASSNAME);
  })
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove(CLASSNAME);
  })
});