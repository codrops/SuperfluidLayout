import { TextReveal } from './textReveal';
import { Details } from './details';

export class Menu {
    constructor(el) {
        this.DOM = {
            el: el,
            items: [...el.querySelectorAll('.menu__item')],
            links: [...el.querySelectorAll('.menu__item-link')],
            closeCtrl: el.querySelector('.close--menu'),
            // .details HTML elements (one per menu item)
            detailsEl: [...el.querySelectorAll('.menu__item-link')].map(item => document.querySelector(item.href.substring(item.href.indexOf('#')))),
            // close details/images page
            closeDetailsCtrl: document.querySelector('.details-wrap > .close--details')
        };
        // text reveal animations (both the close control and the menu items will slide in/out)
        this.textReveal = new TextReveal([this.DOM.closeCtrl,...this.DOM.items]);
        // Details instances
        this.detailsInstances = [];
        this.DOM.detailsEl.forEach(detailsEl => this.detailsInstances.push(new Details(detailsEl, this.DOM.closeDetailsCtrl)));
        this.initEvents();
    }
    // open the menu (animate the menu items in)
    open() {
        this.DOM.el.classList.add('menu--open');
        // show menu items and show close ctrl
        this.textReveal.in();
    }
    // close the menu (animate the menu items out)
    close() {
        this.textReveal.out().then(() => this.DOM.el.classList.remove('menu--open'));
    }
    initEvents() {
        // clicking a menu link will open the gallery
        this.DOM.links.forEach((link, pos) => {
            link.addEventListener('click', ev => {
                ev.preventDefault();
                this.openDetails(pos);
            });
        });

        this.DOM.closeDetailsCtrl.addEventListener('click', () => this.closeDetails());
    }
    openDetails(pos) {
        // save position
        this.menuItemCurrent = pos;

        // show the details
        this.detailsInstances[this.menuItemCurrent].open();

        // close the menu (animate the menu items out)
        this.close();
    }
    closeDetails() {
        if ( this.menuItemCurrent === -1 ) return;
        
        // open the menu (animate the menu items in)
        this.open();

        this.detailsInstances[this.menuItemCurrent].close();

        // reset
        this.menuItemCurrent = -1;
    }
}