/**
 * Package: Media Pseudo Class
 * Developer: Kellen Green
 * Date: 2016/03/31
 */

'use strict';
const postcss = require('postcss');

function parseSelector(selector) {
    /**
     *
     */
    const needle = ':media(';
    if (selector.startsWith(needle)) {
        let i = needle.length;

        for (let parentheses = 0; i < selector.length; i++) {
            let char = selector.substr(i, 1);
            if (char === '(') {
                parentheses++;
            } else if (char === ')') {
                if (parentheses !== 0) {
                    parentheses--;
                } else {
                    break;
                }
            }
        }

        return {
            params: selector.substring(needle.length - 1, i + 1),
            selector: selector.substring(i + 1)
        }
    }
}

function postcssMpc(css) {
    /**
     *
     */
    css.walkRules(function(rule) {

        const selectorsMatched = [];
        const selectorsSkipped = [];

        rule.selectors.forEach(function(selector) {
            const match = parseSelector(selector);
            if (match) {
                selectorsMatched.push(match);
            } else {
                selectorsSkipped.push(selector);
            }
        });

        if (selectorsMatched.length) {

            selectorsMatched.forEach(function(match) {

                // create rule
                const mediaRule = rule.clone();
                mediaRule.selector = match.selector;

                // create at-rule
                const mediaAtRule = postcss.atRule({name: 'media'});
                mediaAtRule.params = match.params;
                mediaAtRule.append(mediaRule);

                // save and insert
                css.insertBefore(rule, mediaAtRule);
            });

            // cleanup old node
            if (selectorsSkipped.length) {
                rule.selectors = selectorsSkipped;
            } else {
                rule.remove();
            }
        }
    });
    return css;
}

module.exports = postcss.plugin('postcss-mpc', function() {
    return postcssMpc;
});
