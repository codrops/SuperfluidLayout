import SplitType from 'split-type';
import { wrapLines } from './utils';
import { gsap } from 'gsap';

export class ImgReveal {
    constructor(el) {
        this.DOM = {
            el: el,
            outerImages: el.querySelectorAll('.deco__img-wrap'),
            innerImages: el.querySelectorAll('.deco__img')
        };
    }
    in() {
        gsap.killTweensOf([this.DOM.innerImages,this.DOM.outerImages,this.DOM.el]);
        return gsap.timeline({defaults: {duration: 1.2, ease: 'expo'}})
        .set(this.DOM.el, {
            y: '10%'
        })
        .set(this.DOM.innerImages, {
            y: '-101%'
        })
        .set(this.DOM.outerImages, {
            y: '101%'
        })
        .to([this.DOM.innerImages,this.DOM.outerImages,this.DOM.el], {
            y: '0%'
        });
    }
    out() {
        gsap.killTweensOf([this.DOM.innerImages,this.DOM.outerImages,this.DOM.el]);
        return gsap.timeline({defaults: {duration: 0.7, ease: 'power2'}})
        .to([this.DOM.innerImages], {
            y: '101%'
        })
        .to([this.DOM.outerImages], {
            y: '-101%'
        }, 0)
        .to([this.DOM.el], {
            y: '-10%'
        }, 0);
    }
}