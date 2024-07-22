/**
 * This file controls the page logic
 *
 * depends on jQuery>=1.7
 */
var pumpkin;
var rnd;
// locations of correct gender circles
var loc = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
// location of other gender which will give scratch further warning
var oloc = [[4,5,9],[1,2,7],[1,3,4],[3,5,8],[1,4,9],[1,2,7],[3,4,7],[1,2,6]];
var pct =new Array(9);
(function() {
    /**
     * Returns true if this browser supports canvas
     *
     * From http://diveintohtml5.info/
     */

    var color1 = '#ff95c8';
    var color2 = '#5194f8';
    var color3 ='#969696';
    var colortxt1 = '#F860AA';
    var colortxt2= '#7FB1ED';
    var colortxt3= '#000000';
    //Select the background color
    var color =color3;
    //Select the text color
    var colortxt = colortxt3;
    var gendertext1 = "It is a Girl!";
    var gendertext2 = "It is a Boy!";
    var gendertext3= "It is a Demo!";
    //Select the gender text
    var gendertext = gendertext3;
    var surname;
    var soundHandle = new Audio();
    var triggered=false;
    var nosound=true;
    var params = new URLSearchParams(window.location.search.slice(1));
    var pct1=0, pct2=0, pct3=0, pct4=0, pct5=0, pct6 = 0;

    function supportsCanvas() {
        return !!document.createElement('canvas').getContext;
    };
    
    
    /**
     * Handle scratch event on a scratcher
     */
    function checkpct() {
        var pct1 = pct[loc[rnd-1][0]-1];
        var pct2 = pct[loc[rnd-1][1]-1];
        var pct3 = pct[loc[rnd-1][2]-1];

        var pct4= pct[oloc[rnd-1][0]-1];
        var pct5= pct[oloc[rnd-1][1]-1];
        var pct6= pct[oloc[rnd-1][2]-1];

        if (!triggered) {
            if (pct1>0 && pct2>0 && pct3>0)  {
                if (pct1<15 || pct2<15 || pct<15)  {
                //document.getElementById("scratcher3Pct").innerHTML="Scratch MORE!";
                if (!CrispyToast.clearall()){
                    CrispyToast.success('Scratch MORE!',{ position: 'top-center' },{timeout: 3000});
                    }
                } 
            }
            if ((pct4>15 && pct5>15 && pct6>15)&&(pct1<15||pct2<15||pct3<15)) {
                if (!CrispyToast.clearall()&&!triggered){
                    CrispyToast.error('Scratch other circles. You havent find the gender yet!',{ position: 'top-center' },{timeout: 6000});
                    }
            } 

            if (pct1>15&& pct2>15 && pct3>15) {
                $('#tboy').show();
                $('#tboy').text(gendertext);
                $('#tboy').css('color',colortxt);
                $('#boy').hide();
                $('#or').hide();
                $('#girl').hide();
                document.getElementsByTagName("body")[0].style.backgroundColor = color;
                document.getElementsByTagName("body")[0].style.backgroundImage = 'none';
                //document.getElementById("H3").insertAdjacentHTML('afterend', "<h4 id='testtext' style='white-space:normal'> Depending on the product you buy, here it will say either <br> 'It is a Girl!' or 'It is a Boy! with pink or blue background.</h4>");

                $('#H3').hide();
                $('#H4').hide();
                $('#scratcher3Pct').hide();

                confetti_effect();
            }
        }
    };
    function scratcher1Changed(ev) {
        pct[0] = (this.fullAmount(40) * 100)|0;
        checkpct();
    };
    function scratcher2Changed(ev) {
        pct[1] = (this.fullAmount(40) * 100)|0;
        checkpct();
    };
    function scratcher3Changed(ev) {
        // Test every pixel. Very accurate, but might be slow on large
        // canvases on underpowered devices:
        //var pct = (scratcher.fullAmount() * 100)|0;
    
        // Only test every 32nd pixel. 32x faster, but might lead to
        // inaccuracy:

        pct[2] = (this.fullAmount(40) * 100)|0;
        checkpct();
        
    };
    function scratcher4Changed(ev) {
        pct[3] = (this.fullAmount(40) * 100)|0;
        checkpct();
    };
    function scratcher5Changed(ev) {
        pct[4] = (this.fullAmount(40) * 100)|0;
       checkpct();
    };
    function scratcher6Changed(ev) {
        pct[5]= (this.fullAmount(40) * 100)|0;
        checkpct();
    };
    function scratcher7Changed(ev) {
        pct[6] = (this.fullAmount(40) * 100)|0;
        checkpct();
    };
    function scratcher8Changed(ev) {
        pct[7] = (this.fullAmount(40) * 100)|0;
        checkpct();
    };
    function scratcher9Changed(ev) {
        pct[8] = (this.fullAmount(40) * 100)|0;
        checkpct();
    };
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    };
    function randomInRangeint(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    function confetti_effect() {
        if(triggered==true) {
            return;
        }
        if (!nosound) {
            soundHandle.volume=0.5;
            soundHandle.play();
        }
        triggered=true;
        // do this for 10 seconds
        var end = Date.now() + (5 * 1000);
        var colors = ['#ff912a', '#ffffff'];

        (function frame() {

            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                scalar: 0.6,
                shapes: [pumpkin],
                origin: { x: 0, y:1 },
                startVelocity: 150,
                colors: colors
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                startVelocity: 150,
                origin: { x: 1, y:1},
                colors: colors
            });


            // keep going until we are out of time
            if (Date.now() < end) {
                requestAnimationFrame(frame);

                return;
            }
            $("#resetbutton").show();

        }());
              
     };
    
    /**
     * Reset all scratchers
     */
    function onResetClicked(scratchers) {
        var i;
        pct = [];
        $("#scratcher3Pct").hide();
        $("#resetbutton").hide();
        for (i = 0; i < scratchers.length; i++) {
            scratchers[i].reset();
        }
       
        $('#tboy').hide();
        $('#boy').show();
        $('#or').show();
        $('#girl').show();

        document.getElementsByTagName("body")[0].style.backgroundImage = 'url(images/background.jpg)';

        $('#H3').show();
        $('#H4').show();
        triggered = false;
        soundHandle.pause();
        soundHandle.currentTime = 0;    
        return false;
    };
    
    /**
     * Assuming canvas works here, do all initial page setup
     */
    // function handleOrientationChange(mql) {
    //     if (mql.matches) {
    //         /* The viewport is currently in portrait orientation */
    //         if(window.innerHeight>900) {
    //             size=130}
    //         else {
    //             size=100;
    //         }
 
    //       } else {
    //         /* The viewport is not currently in portrait orientation, therefore landscape */
    //         console.log(window.innerHeight + " " + window.innerWidth);
    //         size=100;
    //         if (window.innerWidth>900 && window.innerWidth>window.innerHeight*1.2){
    //             console.log("yes");
    //             size = 130;
    //         }
    //       }
          
    //       $('#scratcher1').width(size);
    //       $('#scratcher1').css('width',size);

    
    //   }
    
    function initPage() {
        var scratcherLoadedCount = 0;
        var scratchers = [];
        var pct = [];
        var i, i1;
        
        // if (window.confirm('This scratch off contains sound when the gender is revealed. Do you want to continue with sound? (Ok:with sound, Cancel:without sound')) {
        //     nosound=false;
        //   } else {
        //     nosound=true;
        // }
        surname = params.get('surname');
        if (surname !=null && surname.replace(/\s/g, '').length) {
            $("#baby").text('baby ' + surname+'!');}
        else {
            $("#baby").text('the baby!');
            surname="the";
        }
        $(document).ready(function(){
            // function scope wavesurfer
            pumpkin = confetti.shapeFromPath({
                path: 'm 0,0 c -4.344,-5.021 -9.773,-9.184 -15.967,-12.31 -0.136,-2.089 -0.289,-4.164 -0.475,-6.252 -0.933,1.653 -1.832,3.336 -2.715,5.004 -3.648,-1.157 -7.33,-2.224 -11.046,-3.186 -0.56,-2.059 -1.119,-4.118 -1.68,-6.177 -0.984,1.743 -1.951,3.517 -3.054,5.2 -4.513,0.617 -9.213,-0.014 -13.794,0.331 -1.392,-2.765 -2.8,-5.516 -4.226,-8.266 -0.678,3.171 -1.459,6.327 -2.426,9.438 -2.307,0.436 -4.581,0.978 -6.906,1.323 -1.255,-1.353 -2.46,-2.72 -3.614,-4.148 -1.222,2.299 -0.56,5.816 -3.495,7.154 -4.972,2.736 -9.587,5.952 -13.473,9.845 2.037,-10.176 9.316,-18.923 19.309,-24.124 1.273,2.33 2.529,4.645 3.853,6.93 1.136,-3.097 1.934,-6.314 3.393,-9.304 3.58,-1.714 7.941,-1.759 11.86,-2.54 1.052,2.9 2.087,5.801 3.207,8.672 1.612,-2.841 3.258,-5.666 4.988,-8.462 4.921,0.811 9.757,1.984 14.423,3.638 -0.441,2.644 -0.916,5.275 -1.374,7.921 2.528,-1.414 4.53,-4.149 7.483,-4.54 C -6.736,-18.532 -0.95,-9.529 0,0 m -41.775,4.93 c -2.036,-4.749 -3.902,-9.559 -5.786,-14.369 3.886,0.015 7.771,0.03 11.657,0.09 -1.901,4.78 -3.784,9.575 -5.871,14.279 m 5.854,7.079 c -0.271,-5.967 4.48,-11.979 11.589,-12.174 12.302,-0.526 21.735,11.212 18.834,21.508 -9.536,-4.434 -19.513,-8.598 -30.423,-9.334 m -43.064,8.673 c -3.003,-10.898 8.246,-22.696 20.972,-20.832 6.6,0.721 10.707,6.132 11.487,11.618 -11.436,0.992 -22.533,4.073 -32.459,9.214 m 26.249,33.442 c -0.729,4.554 2.325,10.311 8.043,10.746 2.867,0.541 5.446,-1.548 7.042,-3.427 2.782,-4.433 1.475,-9.694 2.018,-14.534 8.823,1.458 17.409,6.508 26.589,4.088 14.1,-4.599 22.702,-17.329 24.738,-30.06 3.207,-14.655 0.204,-30.196 -7.77,-43.287 -8.908,-14.383 -27.607,-22.259 -45.695,-22.44 -16.187,-0.556 -33.816,2.976 -45.235,13.812 -18.953,18.022 -23.042,47.135 -9.146,68.569 4.751,7.094 12.607,13.331 22.211,14.158 8.382,0.436 16.306,-2.48 24.332,-4.209 2.189,3.607 6.057,9.56 0.831,12.476 -2.375,2.239 -4.954,-0.993 -5.701,-2.811 -1.307,-3.532 2.851,-2.826 5.209,-2.39 -2.308,-1.578 -5.107,-3.111 -7.466,-0.691',
                matrix: [0.35277776,0,0,-0.35277778,35.416827,22.91533]
              });
        });
        document.getElementById('intro').innerHTML= "This is a gender reveal scratch off for <strong>" + surname + "</strong> family. It contains sound when the gender is revealed. Do you want to continue with sound?";
        document.getElementById('id01').style.display='block';
        $('.nosoundbtn').on("click", function (e) {
            document.getElementById('id01').style.display='none';
            nosound=true;
        });
        $('.withsoundbtn').on("click", function (e) {
            document.getElementById('id01').style.display='none';
            nosound=false;
            if (soundHandle.currentTime!=0) {return;}
                soundHandle = document.getElementById('soundHandle');  
                soundHandle.autoplay = true;
                soundHandle.muted=false;
                soundHandle.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
                soundHandle.src = 'audio/celebrate.mp3';
                soundHandle.play();
                soundHandle.pause();
        });
        document.addEventListener(
            "visibilitychange",
             function(evt) {
                console.log("page hidden")
              if (document.visibilityState != "visible") {
                soundHandle.pause();
                soundHandle.currentTime=0;              }
            },
            false,
          );
        // const mediaQueryList = window.matchMedia("(orientation: portrait)");
        // mediaQueryList.addEventListener("change", handleOrientationChange);
        // handleOrientationChange(mediaQueryList);
        
           
        
        document.getElementById("resetbutton").style.backgroundColor = colortxt;

        // called each time a scratcher loads
        function onScratcherLoaded(ev) {
            
            scratcherLoadedCount++;
            $("table1").width($(window).width());
            if (scratcherLoadedCount == scratchers.length) {
                // all scratchers loaded!
    
                // bind the reset button to reset all scratchers
                $('#resetbutton').on('click', function() {
                        onResetClicked(scratchers);
                    });
    
                // hide loading text, show instructions text
                //$('#loading-text').hide();
                //$('#inst-text').show();
            }
        };
    
        // create new scratchers
        var scratchers = new Array(9);
        rnd = 2;
        if (rnd>8) {
            rnd=8;   
        }
        for (i = 0; i < scratchers.length; i++) {
            i1 = i + 1;
            scratchers[i] = new Scratcher('scratcher' + i1);
    
            // set up this listener before calling setImages():
            scratchers[i].addEventListener('imagesloaded', onScratcherLoaded);
    
            scratchers[i].setImages('images/' + rnd + '/s' + i1 + 'bg.jpg',
                'images/foreground.jpg');
        
        }
       
        // get notifications of this scratcher changing
        // (These aren't "real" event listeners; they're implemented on top
        // of Scratcher.)
        //scratchers[3].addEventListener('reset', scratchersChanged);
        scratchers[0].addEventListener('scratchesended', scratcher1Changed);
        scratchers[1].addEventListener('scratchesended', scratcher2Changed);
        scratchers[2].addEventListener('scratchesended', scratcher3Changed);

        scratchers[3].addEventListener('scratchesended', scratcher4Changed);
        //scratchers[4].addEventListener('reset', scratchersChanged);
        scratchers[4].addEventListener('scratchesended', scratcher5Changed);
        //scratchers[5].addEventListener('reset', scratchersChanged);
        scratchers[5].addEventListener('scratchesended', scratcher6Changed);
        scratchers[6].addEventListener('scratchesended', scratcher7Changed);
        scratchers[7].addEventListener('scratchesended', scratcher8Changed);
        scratchers[8].addEventListener('scratchesended', scratcher9Changed);

        var canvas = document.getElementById('scratcher1');
        canvas.onmousemove = null;
        // Or if you didn't want to do it every scratch (to save CPU), you
        // can just do it on 'scratchesended' instead of 'scratch':
        //scratchers[2].addEventListener('scratchesended', scratcher3Changed);
    };
    
    /**
     * Handle page load
     */
    $(function() {
        if (supportsCanvas()) {
            initPage();
        } else {
            $('#scratcher-box').hide();
            $('#lamebrowser').show();
        }
    });
    
    })();
    