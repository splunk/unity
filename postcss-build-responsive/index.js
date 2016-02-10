'use strict';
const postcss = require('postcss');

function mqFirst(key, stop) {
   return `@custom-media --${key} screen and (max-width: ${stop});
           @media (--${key})`;
}

function mqLast(key, start) {
   return `@custom-media --${key} screen and (min-width: ${start});
           @media (--${key})`;
}

function mqMiddle(key, start, stop) {
    return `@custom-media --${key} screen and (min-width: ${start}) and (max-width: ${stop});
            @media (--${key}){}
            @custom-media --${key}-up screen and (min-width: ${start});
            @media (--${key}-up){}
            @custom-media --${key}-down screen and (max-width: ${stop});
            @media (--${key}-down){}`;
}

function init(opts) {
    return function (css) {
        const last = opts.length - 1;
        opts.forEach(function(item, i) {
            if (i === 0) {
                css.append(mqFirst(item[0], item[1]));
            } else if (i === last) {
                css.append(mqLast(item[0], opts[i - 1][1]));
            } else {
                css.append(mqMiddle(item[0], opts[i - 1][1], item[1]));
            }
        });
        return css;
    };
}

module.exports = postcss.plugin('postcss-make-responsive', init);
