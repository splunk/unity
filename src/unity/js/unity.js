'use strict';
const u = {};

/**
 * u.Element
 */

u.Element = class extends HTMLElement {
    createdCallback() {
    }
    attachedCallback() {
    }
    detachedCallback() {
    }
    attributeChangedCallback(attr, oldVal, newVal) {
    }
    static register(name) {
        document.registerElement(name, {prototype: this.prototype});
    }
};

/**
 * u.ParentElement
 */

u.ParentElement = class extends u.Element {
    createdCallback() {
        super.createdCallback();
        this.$parent = null;
    }
    attachedCallback() {
        super.attachedCallback();
        const selector = `[u-id="${this.getAttribute('u-for')}"]`;
        this.$parent = document.querySelector(selector);
        if (this.$parent === null) {
            throw `Element ${selector} was not found`;
        }
    }
};

/**
 * u-carousel
 */

u.Carousel = class extends u.Element {
    attachedCallback() {
        this._index = 0;
        this._container = this.firstElementChild;
        this._length = this._container.childElementCount;
    }

    $moveTo(query) {
        if (query.startsWith('+')) {
            this._index += parseInt(query.substr(1));
        } else if (query.startsWith('-')) {
            this._index -= parseInt(query.substr(1));
        } else {
            this._index = parseInt(query);
        }
        this._index %= this._length;
        if (this._index < 0) {
            this._index += this._length;
        }
        const percent = this._index * -100;
        this._container.style.transform = `translateX(${percent}%)`;
    }

    addListener(elem) {
        this._listeners.push(elem);
    }
};

u.Carousel.register('u-carousel');

/**
 * u-carousel-move
 */

u.CarouselMove = class extends u.ParentElement {
    createdCallback() {
        super.createdCallback();
        this._query = null;
        
        this._onClick = function() {
            this.$parent.$moveTo(this._query);
        }.bind(this);
    }

    attachedCallback() {
        super.attachedCallback();
        this._query = this.getAttribute('u-to');
        this.addEventListener('click', this._onClick);
    }

    detachedCallback() {
        super.detachedCallback();
        this.removeEventListener('click', this._onClick);
    }

};

u.CarouselMove.register('u-carousel-move');

/**
 * u-tooltip
 */

u.Tooltip = class extends u.Element {
    createdCallback() {
        this._title = null;
    }

    attachedCallback() {
        this._title = this.getAttribute('u-title');
        this.addEventListener('mouseenter', function() {

        }.bind(this));
        
        this.addEventListener('mouseleave', function() {

        }.bind(this));
    }

    _open() {

    }
};

u.Tooltip.register('u-tooltip');

/**
 * u-drawer
 */

u.Drawer = class extends u.Element {

    createdCallback() {
        super.attachedCallback();

        this._onClick = function(evt) {
            let parent = evt.target;
            while (parent) {
                if (parent === this) {
                    return;
                }
                parent = parent.parentElement;
            }
            this.$close();
        }.bind(this);

        this._onKeyUp = function(evt) {
            if (evt.keyCode === 27) {
                this.$close();
            }
        }.bind(this);
    }

    $open() {
        document.addEventListener('click', this._onClick);
        document.addEventListener('keyup', this._onKeyUp);
        document.body.style.overflowY = 'hidden';
        this.classList.add('open');
    }

    $close() {
        document.removeEventListener('click', this._onClick);
        document.removeEventListener('keyup', this._onKeyUp);
        document.body.style.overflowY = 'inherit';
        this.classList.remove('open');
    }
};

u.Drawer.register('u-drawer');

/**
 * u-drawer-toggle
 */

u.DrawerToggle = class extends u.ParentElement {

    createdCallback() {
        super.attachedCallback();

        this._onClick = function(evt) {
            evt.stopPropagation();
            this.$parent.$open();
        }.bind(this);
    }

    attachedCallback() {
        super.attachedCallback();
        this.addEventListener('click', this._onClick);
    }

    detachedCallback() {
        super.detachedCallback();
        this.removeEventListener('click', this._onClick);
    }
};

u.DrawerToggle.register('u-drawer-toggle');