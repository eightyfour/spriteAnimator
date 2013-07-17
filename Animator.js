/**
 * eightyfour:
 *
 */
function Animator(positionObj){
    var _frames = positionObj.frames,stop,immediatelyStop,
    _runConfig = {repeat:false,duration:1000},
    _conf = {
        $animationNode : {},
        frameRate : 1000/33 // TODO made framerate configurable
    },
    _mergeObject = function(toObj,fromObj){
        for (var attrname in fromObj) {
            toObj[attrname] = fromObj[attrname];
        }
        return toObj;
    },
    _getCSS =  function(pos){
        return {
            'background-position' : '-'+_frames['position_'+pos].frame.x+'px '+'-'+_frames['position_'+pos].frame.y+'px',
            width : _frames['position_'+pos].frame.w,
            height : _frames['position_'+pos].frame.h
        }
    },
    /**
     * action could also passed as duration in milliseconds
     */
    _runAnimation = function(action,cb){
        var cb = cb || function(){},
        pos = positionObj.frames.animations[action],
        itar = 0,
        runNext = function(){
            if(immediatelyStop || itar >= pos.length){
                cb(); // end
            }else{
                _conf.$animationNode.css( _getCSS(pos[itar]) )
                setTimeout(function(){
                    itar++;
                    runNext();
                },_conf.frameRate);
            }
        };
        if(!isNaN(action)){
            setTimeout(function(){cb();},action);
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
    this.run = function($node,animateListNames,config,finishCallback){
        var finishCb = finishCallback || function(){},
        listNames = animateListNames,
        animationIndex = 0,
        iterateAnimation = function(){
            var name;
            if(!stop && animationIndex < listNames.length){
                name = listNames[animationIndex++];
                _runAnimation(name,function(){
                    iterateAnimation();
                });
            } else {
                if(_runConfig.repeat && !stop){
                    animationIndex=0;
                    setTimeout(function(){
                        iterateAnimation();
                    },_runConfig.duration)
                } else {
                    finishCb();
                }
            }
        };
        stop = false; // reset stop flag
        immediatelyStop = false; // reset immediately flag
        _runConfig = _mergeObject(_runConfig,config);
        _conf.$animationNode = $node;
        // start animation
        iterateAnimation();
    };
    /**
     * Wait for end of current animation and stops. If you pass true the animation will stop immediately.
     * @param immediately
     */
    this.stop = function(immediately){
        immediatelyStop = immediately || false;
        stop = true;
    };
}
