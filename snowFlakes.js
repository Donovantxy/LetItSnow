
window.addEvent("domready", function(){
    (function($){

        letItSnow(40, 12, 6, 80, 8);

    })(document.id);
});

var __wW =  window.innerWidth;
var __wH = window.innerHeight;

var __flakeType = ["A","B","C","F","G","H","I","L","M","N","O","P","Q","S","U","Z","a","e","q"];
var __shapeType = ["B","C","D","E","F","G","H","I","M","O","P","T","J","K"];
var __colors = ["#fff","#0cc","#00a487","#37a5dd","#3e736f","#4aecff"];

var __flake = new Element("div",{});

function letItSnow(nflakes, nshapes, nGoHenry, maxSize, maxDuration){
    var nTot = nflakes + nshapes + nGoHenry;
    for(var i=0; i<nTot; i++){

        type = i < nflakes ? "flake" : ( i < nflakes+nshapes ? "shape" : "gohenry" );
        clone = __flake.clone().addClass(type);

        if( i < nflakes+nshapes ){
            arrType = eval("__"+type+"Type");
            clone.set("html", arrType[Math.round( Math.random()*(arrType.length-1) )]);
            if(i < nflakes){  }
        }
        else{ clone.set("html", "Fulvio"); }

        var fontSize = (15 + Math.round(Math.random()*(maxSize-15) ));
        var duration = 2 + Math.random()*(maxDuration-2);

        setUpFlake(clone, maxSize, maxDuration);

        clone.addEventListener("transitionend", function(){
            setUpFlake(this, maxSize, maxDuration);
        });

    }
}

function setUpFlake(flake, maxSize, maxDuration){
    var fontSize = 15 + Math.round(Math.random()*(maxSize-15));
    var duration = 2 + Math.random()*(maxDuration-2);
    var flakeDisposed = flake.dispose();

    switch( flake.get("class") ){
        case "flake" :
                flake.setStyle( "color", __colors[ Math.round(Math.random()*(__colors.length-1)) ] );
                flake.set( "html", __flakeType[Math.round( Math.random()*(__flakeType.length-1) )] );
        break;
        case "shape" :
                flake.set( "html", __shapeType[Math.round( Math.random()*(__shapeType.length-1) )] );
        break;
    }


    flake.setStyles({
        "color":__colors[ Math.round(Math.random()*(__colors.length-1)) ],
        "top":-fontSize+"px",
        "left":Math.round(Math.random()*(__wW - fontSize))+"px",
        "font-size":fontSize+"px",
        "color": Math.round(Math.random()*(__colors.length-1)),
        "opacity":0.25+Math.random(),
        "z-index":10 + Math.round(Math.random()*100),
        "transition-duration": duration+"s",
        "-webkit-transition-duration": duration+"s",
        "-moz-transition-duration": duration+"s"
    }).inject( $(document.body) );

    (function(){ animation(this); }).delay(100, flake);

}

function animation(flake){
    var coords = flake.getCoordinates();
    var longestHeight = flake.get("class") == "flake" ? Math.sqrt( Math.pow(coords.width,2) + Math.pow(coords.height,2) ) : coords.height;
    //console.log( coords.width, coords.height , Math.sqrt( Math.pow(coords.width,2) + Math.pow(coords.height,2) ) );

    flake.setStyles({
        "top": (__wH - (longestHeight + flake.getStyle("font-size").toInt()) ) + "px",
        "opacity": 0.10
    });

    if( flake.get("class")=="flake" ){
        var deg = 120+(Math.random()*360);
        flake.setStyles({
            "transform": "rotate("+deg+"deg)",
            "-webkit-transform": "rotate("+deg+"deg)",
            "-moz-transform": "rotate("+deg+"deg)"
        });
    }
}
