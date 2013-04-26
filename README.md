spriteAnimator
==============

Simple js which animates some graphics on a sprite

``` html 

  <style type="text/css"> 
        #animatorDiv { 
            background: url('useYourOwnSprite.png');  
        } 
    </style>

  <div id="animatorDiv"></div>

  <script src="Animator.js"></script>
  <script src="positionJSONExample.js"></script>
  
  <script>
      var animateSprite = new Animator(positionJSONExample);
      animateSprite.run( $('#animatorDiv'),['blink','blinkAndWatch','jump','win'],function(){
          console.log('success animation');
      } );
  </script>
```

TODO: remove jQuery 
