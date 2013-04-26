/**
 * eightyfour:
 *
 */
function Animator(positionObj){
    var _frames = positionObj.frames,
            _conf = {
                $animationNode : {},
                frameRate : 1000/33 // TODO made framerate configurable
            },
            _getCSS =  function(pos){
                return {
                    'background-position' : '-'+_frames['position_'+pos].frame.x+'px '+'-'+_frames['position_'+pos].frame.y+'px',
                    width : _frames['position_'+pos].frame.w,
                    height : _frames['position_'+pos].frame.h
                }
            },
            _runAnimation = function(name,cb){
                var cb = cb || function(){},
                        pos = positionObj.frames.animations[name],
                        itar = 0,
                        runNext = function(){
                            if(itar >= pos.length){
                                cb(); // end
                            }else{
                                _conf.$animationNode.css( _getCSS(pos[itar])  )
                                setTimeout(function(){
                                    itar++;
                                    runNext();
                                },_conf.frameRate);
                            }
                        }
                runNext();
            },
            fc = {
                run : function($node,animateListNames,readyCB){
                    var cb = readyCB || function(){},
                            listNames = animateListNames,

                            iterateAnimation = function(){
                                var name;
                                if(listNames.length > 0){
                                    name = listNames.shift();
                                    _runAnimation(name,function(){
                                        iterateAnimation();
                                    });
                                } else {
                                    cb();
                                }
                            }
                    _conf.$animationNode = $node;
                    iterateAnimation();
                }
            }
    return fc;
}
