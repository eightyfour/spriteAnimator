spriteAnimator
==============

TODO: remove Jquery from script. 

``` html 

  <style type="text/css"> 
        #animatorDiv{ 
            background: url('useYourOwnSprite.png');  
        } 
    </style>

  <div id="animatorDiv"></div>

  <script src="Animator.js"></script>
  <script src="positionJSONExample.js"></script>
  
  <script>
   var animateSprite = new Animator(positionJSONExample);
            ladyBugSmall.run( $('#animatorDiv'),['blink','blinkAndWatch','jump','win'],function(){
                console.log('success animation');
            } );
  </script>
```
