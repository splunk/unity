/**
 * Package:     PostCSS Media Pseudo Class
 * Developer:   Kellen Green
 * Date:        2016/04/05
 * Version:     0.9.0
 */

'use strict';
const postcss = require('postcss');

function parseSelector(selector) {
    /**
     *
     */
    const needle = ':media(';
    if (selector.startsWith(needle)) {
        let index = needle.length;
        let parentheses = 0;
        for (; index < selector.length; index++) {
            let char = selector.substr(index, 1);
            if (char === '(') {
                parentheses++;
            } else if (char === ')') {
                if (parentheses === 0) {
                    break;
                } else {
                    parentheses--;
                }
            }
        }

        index += 1;

        // check for errors
        if (parentheses !== 0) {
            throw 'Mismatched parentheses';
        } else if (needle.length === index) {
            throw 'Empty media query';
        }  else if (selector.length === index) {
            throw 'Empty selector';
        }

        return {
            params: selector.substring(needle.length - 1, index),
            selector: selector.substring(index)
        }
    }
}

function postcssMpc(css, result) {
    /**
     *
     */
    css.walkRules(function(rule) {

        const selectorsMatched = [];
        const selectorsSkipped = [];

        rule.selectors.forEach(function(selector) {
            let match;

            // parse selector
            try {
                match = parseSelector(selector);
            } catch(e) {
                result.warn(e, {node: rule});
            }

            // save result
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
