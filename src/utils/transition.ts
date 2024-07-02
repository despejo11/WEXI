import gsap from 'gsap'

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export const animatePageIn = () => {
  const bannerOne = document.getElementById('bannerOne')
  const bannerTwo = document.getElementById('bannerTwo')
  const bannerThree = document.getElementById('bannerThree')
  const bannerFour = document.getElementById('bannerFour')

  if (bannerOne && bannerTwo && bannerThree && bannerFour) {
    const tl = gsap.timeline()

    tl.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 0,
    }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 100,
      stagger: 0.2,
    })
  }
}

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const bannerOne = document.getElementById('bannerOne')
  const bannerTwo = document.getElementById('bannerTwo')
  const bannerThree = document.getElementById('bannerThree')
  const bannerFour = document.getElementById('bannerFour')

  if (bannerOne && bannerTwo && bannerThree && bannerFour) {
    const tl = gsap.timeline()

    tl.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: -100,
    }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 0,
      stagger: 0.2,

      onComplete: () => {
        router.push(href)
      },
    })
  }
}
