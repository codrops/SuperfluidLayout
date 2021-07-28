import { TextReveal } from './textReveal';
import { TextLinesReveal } from './textLinesReveal';
import gsap from 'gsap';

export class Details {
    constructor(el, closeDetailsCtrl) {
        this.DOM = {
            el: el,
            images: el.querySelectorAll('.panel > .panel__img'),
            title: el.querySelector('.details__content > .details__content-title'),
            text: el.querySelector('.details__content > .details__content-text'),
            link: el.querySelector('.details__content > .details__content-link'),
            closeDetailsCtrl: closeDetailsCtrl
        };
        
        // textLinesReveal obj (this.DOM.text animation)
        this.textLinesReveal = new TextLinesReveal(this.DOM.text);
        // TextReveal obj (this.DOM.title and this.DOM.link animation)
        this.textReveal = new TextReveal([this.DOM.title, this.DOM.link, this.DOM.closeDetailsCtrl]);
    }
    open() {
        this.DOM.el.classList.add('details--open');
        document.body.classList.add('state-details');

        this.textLinesReveal.in();
        this.textReveal.in();
        
        gsap.killTweensOf(this.DOM.images);
        gsap.timeline({defaults: {duration: 2, ease: 'expo'}})
        .set(this.DOM.images, {
            opacity: 0,
            y: '150%'
        })
        .to(this.DOM.images, {
            opacity: 1,
            y: '0%',
            stagger: 0.02
        });
    }
    close() {
        this.textLinesReveal.out();
        this.textReveal.out();
        
        gsap.killTweensOf(this.DOM.images);
        gsap.timeline({
            defaults: {duration: 0.5, ease: 'power2'},
            onComplete: () => {
                this.DOM.el.classList.remove('details--open');
                document.body.classList.remove('state-details');
            }
        })
        .to(this.DOM.images, {
            opacity: 0,
            y: '-150%',
            stagger: 0.01
        });
    }
}