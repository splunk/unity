'use strict';
var postcss = require('postcss');

function init(opts) {
    opts = opts || [];
    return function (css) {
        const mqs = [];

        // add '-up' and '-down'
        const len = opts.length - 2;
        for (let i = 1; i <= len; i++) {
            const key = opts[i];
            opts.push(`${key}-up`, `${key}-down`)
        }

        // clone and add to media query
        opts.forEach(function(key) {

            const mq = postcss.parse(`@media (--${key}){}`);
            mqs.push(mq);

            css.walkRules(function(node) {
                const clone = node.clone();
                clone.selector = clone.selector.replace(/\.[a-z]+(-?[a-z0-9_]+)*/gi, `$&@${key}`);
                mq.first.append(clone);
            });

        });


        css.append(mqs);
        return css;
    };
}

module.exports = postcss.plugin('postcss-make-responsive', init);
