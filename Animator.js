/*jslint browser: true */
/**
 * eightyfour:
 *
 * Animates a sprite.
 *
 * @param positionObj
 * @return {{run: Function,stop: Function}}
 * @constructor
 */
function Animator(positionObj) {
    "use strict";
    var frames = positionObj.frames, stop, immediatelyStop,
        runConfig = {repeat : false, duration : 1000},
        conf = {
            $animationNode : {},
            frameRate : 1000 / 33 // TODO made framerate configurable
        },
        mergeObject = function (toObj, fromObj) {
            var attrname;
            for (attrname in fromObj) {
                if (fromObj.hasOwnProperty(attrname)) {
                    toObj[attrname] = fromObj[attrname];
                }
            }
            return toObj;
        },
        getCSS =  function (pos) {
            return {
                'background-position' : '-' + frames['position_' + pos].frame.x + 'px ' + '-' + frames['position_' + pos].frame.y + 'px',
                width : frames['position_' + pos].frame.w,
                height : frames['position_' + pos].frame.h
            };
        },
        /**
         * action could also passed as duration in milliseconds
         */
        runAnimation = function (action, callbackFc) {
            var cb = callbackFc || function () {},
                pos = positionObj.frames.animations[action],
                itar = 0,
                runNext = function () {
                    if (immediatelyStop || itar >= pos.length) {
                        cb(); // end
                    } else {
                        conf.$animationNode.css(getCSS(pos[itar]));
                        setTimeout(function () {
                            itar++;
                            runNext();
                        }, conf.frameRate);
                    }
                };
            if (!isNaN(action)) {
                setTimeout(function () {cb(); }, action);
            } else {
                runNext();
            }
        };
    /**
     *
     * @param $node
     * @param animateListNames
     * @param config
     * @param finishCallback
     */
    this.run = function ($node, animateListNames, config, finishCallback) {
        var finishCb = finishCallback || function () {},
            listNames = animateListNames,
            animationIndex = 0,
            iterateAnimation = function () {
                var name;
                if (!stop && animationIndex < listNames.length) {
                    name = listNames[animationIndex++];
                    runAnimation(name, function () {
                        iterateAnimation();
                    });
                } else {
                    if (runConfig.repeat && !stop) {
                        animationIndex = 0;
                        setTimeout(function () {
                            iterateAnimation();
                        }, runConfig.duration);
                    } else {
                        finishCb();
                    }
                }
            };
        stop = false; // reset stop flag
        immediatelyStop = false; // reset immediately flag
        runConfig = mergeObject(runConfig, config);
        conf.$animationNode = $node;
        // start animation
        iterateAnimation();
    };
    /**
     * Wait for end of current animation and stops. If you pass true the animation will stop immediately.
     * @param immediately
     */
    this.stop = function (immediately) {
        immediatelyStop = immediately || false;
        stop = true;
    };
}
