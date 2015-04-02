(function() {

    var _ = {};

    /*
     * DropZone
     */

    function DropZone(elem) {
        /**
         *
         */
        this.elem = elem;

        this._counter = 0;
        this._className = 'hover';
        this._dropFn = this._defaultDropFn;
        this._enterFn = this._defaultEnterFn;
        this._leaveFn = this._defaultLeaveFn;

        this.elem.addEventListener('dragenter', this._onEnter.bind(this));
        this.elem.addEventListener('dragleave', this._onLeave.bind(this));
        this.elem.addEventListener('drop', this._onDrop.bind(this));
        this.elem.addEventListener('dragover', this._onOver);
    }

    /*
     * Events
     */

    DropZone.prototype._onEnter = function() {
        /**
         *
         */
        if (++this._counter === 1) {
            this._enterFn();
        }
    };

    DropZone.prototype._onLeave = function() {
        /**
         *
         */
        if (--this._counter === 0) {
            this._leaveFn();
        }
    };

    DropZone.prototype._onOver = function(evt) {
        /**
         * Required to trigger drop event
         */
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy';
    };

    DropZone.prototype._onDrop = function(evt) {
        /**
         *
         */
        evt.preventDefault();
        this._counter = 0;
        this._leaveFn();
        this._dropFn(evt.dataTransfer);
    };

    /*
     * Default callbacks
     */

    DropZone.prototype._defaultEnterFn = function() {
        /**
         *
         */
        this.elem.classList.add(this._className);
    };

    DropZone.prototype._defaultLeaveFn = function() {
        /**
         *
         */
        this.elem.classList.remove(this._className);
    };

    DropZone.prototype._defaultDropFn = function() {
        /**
         * Do nothing by default
         */
    };

    /*
     * Public
     */

    DropZone.prototype.drop = function(fn) {
        /**
         *
         */
        this._dropFn = fn;
        return this;
    };

    DropZone.prototype.enter = function(fn) {
        /**
         *
         */
        this._enterFn = fn;
        return this;
    };

    DropZone.prototype.leave = function(fn) {
        /**
         *
         */
        this._leaveFn = fn;
        return this;
    };

    _.DropZone = DropZone;

    window.unity = _;

})();
