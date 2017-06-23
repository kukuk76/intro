  var AJS = {"host":"http://locahost:3000"};
  var x = window.location.href;

  $.fn.reverse = [].reverse;


// DETECT DEVICE  ==============================================================

var device = (function(){

  var isIE = IEVersion = false
      md = new MobileDetect(window.navigator.userAgent);

  var init = function(){
    bindEvents();
  }

  var bindEvents = function(){
    $('body').on('mousemove', 'img', function(){
      return false;
    });
  };

  var isSmartPhone = function(){
    // return ($(window).width()  < 768);
      return window.matchMedia("('max-width: 767px')").matches;
  }

  // Is that an IOS ?
  var isIOS = function(){
    // https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    return isIOS;
  }

  var isTablet = function(){
    // return ($(window).width() > 992 &&  $(window).width() < 768);
      return window.matchMedia("(min-width: 768) and (max-width: 1219px)").matches;
  }


  // Is that a Desktop ?
  var isDesktop = function(){
    // return ($(window).width()  >= 992);
    return window.matchMedia("(min-width: 1220px)").matches;
  }

  // Get internet explorer version https://gist.github.com/Macagare/4044440
  var getInternetExplorerVersion = function(){
    var rv = -1; // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer')
    {
      var ua = navigator.userAgent;
      var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
        rv = parseFloat( RegExp.$1 );
    }
    if (rv != -1) {
      isIE = true;
    }
      return rv;
   }

  var isMobile = function(){
    return $('html').hasClass('is-handled');
  }

  var lightVersion = function(){
    IEVersion = getInternetExplorerVersion();
    if (isMobile() || !isDesktop() || (isIE && IEVersion < 10 )) {
      return true;
    } else {
      return false;
    }
  }

  return {
    init: init,
    isIOS: isIOS,
    isTablet: isTablet,
    isDesktop: isDesktop,
    lightVersion: lightVersion
  }

})();

// END DETECT DEVICE  ==========================================================

var globalSite = (function(){

   var waitToggle = false,
       siteIsloading = true,
       globalLoader = $('.global--loader');

   var init = function(){
     bindEvents();
     contentLoading();
   }

   var bindEvents = function(){

   }

   var siteLoaded = function(){
     siteIsloading = false;
     $(window).trigger('resize');
   }

   var contentLoading = function(){
     var container = $('.page__container').first(),
         pageLoaded = true,
         images  = container.find('img'),
         imagesToLoad =  images.length - 1;
     container.imagesLoaded().fail(function(){
       pageLoaded = false;
     }).done(function(){
       pageLoaded = true;
       images.addClass('is__loaded');
     }).progress(function(instance,image){
       loadProgress(imagesLoaded, image);
     });
     if (!pageLoaded) {
       setTimeout(contentLoading,100);
     } else {
       hidePreLoader();
      //  setImageBackground();
     }
   }

  var showPreLoader = function(){
     var introWrapper = globalLoader.find('.intro--wrapper'),
         introMask = introWrapper.find('.intro--mask'),
         square = globalLoader.find('.square'),
         mask = square.find('.mask'),
         welcome = globalLoader.find('.intro--welcome'),
         welcomeText = welcome.find('h1 span.text'),
         welcomeMask = welcome.find('h1 span.mask'),
         loading = globalLoader.find('.loading--wrapper'),
         squareWidth = square.width(),
         doors = globalLoader.find('.doors .door');

     square.hide();

     mask.css( {
       width:0
     });

     square.find('.text--overflow p').css({
       opacity:0
     });

     loading.find('p').css({
       opacity:0
     });

     welcomeMask.css({
       right:"100%"
     });

     welcomeText.css({
       opacity:0
     });

     introMask.css({
       right:"100%"
     });

     $(window).on('load', siteLoaded);

     var tl = new TimelineLite();
     tl.pause();

     tl.set(square, {
       display:'',
       margin:'0 0 0 -2px',
       width:4,
       height:0
     });

     tl.fromTo(introMask, .6, {
       right:"100%"
     },{
       right:0,
       ease:Expo.easeOut
     },0.6);

     tl.fromTo(introMask, .6, {
       left:0,
     },{
       left:"100%",
       ease:Expo.easeOut
     },1);

     tl.to(square, .5, {
       marginTop: -squareWidth / 2,
       height: squareWidth,
       ease:Expo.easeOut
     },1.1);

     tl.to(square, .5, {
       marginLeft: -squareWidth / 2,
       width: squareWidth,
       ease:Expo.easeOut
     },'=-0.2');

     tl.to(square, .6, {
       y:-180,
       ease:Expo.easeOut
     },'-=0.1');

     tl.fromTo(square.find('.text--overflow p'), .5, {
       opacity:0,
       y:16
     },{
       opacity:1,
       y:0,
       ease:Expo.easeOut
     },'+=0');

    tl.fromTo(welcomeMask, .6, {
      right: "100%"
     },{
      right:0,
      ease:Expo.easeOut
    },'-=0.8');

    tl.fromTo(welcomeMask, .6, {
      left: 0
     },{
      left:"100%",
      ease:Expo.easeOut
    },'-=0.3');

    tl.fromTo(welcomeText, .6, {
      opacity:0,
      x:-6
    },{
      opacity:1,
      x:0,
      ease:Expo.easeOut
    },'-=0.5');

    tl.fromTo(loading.find('p'), .6, {
      opacity:0,
      y:10
    },{
      opacity:1,
      y:0,
      ease:Expo.easeOut
    },'-=0.40');

    tl.call(function(){

      setTimeout(function(){
        init();
      },2000);

      welcomeMask.css({
        right:"100%",
        left:0
      });
    });

     tl.play();
  }

  var hidePreLoader = function(){
    var introWrapper = globalLoader.find('.intro--wrapper'),
        introMask = introWrapper.find('.intro--mask'),
        square = globalLoader.find('.square'),
        mask = square.find('.mask'),
        welcome = globalLoader.find('.intro--welcome'),
        welcomeText = welcome.find('h1 span.text'),
        welcomeMask = welcome.find('h1 span.mask'),
        loading = globalLoader.find('.loading--wrapper'),
        squareWidth = square.width(),
        doors = globalLoader.find('.doors .door');

     var tl = new TimelineLite();
     tl.pause();

     tl.staggerFromTo(mask,.5,{
       width:0
     },{
       width:"50%",
       ease:Expo.easeOut
     },0);

     tl.to(square, .1,{
       opacity:0
     },'+=.5');

     tl.to(loading.find('p'),.4, {
       y:10,
       opacity:0,
       ease:Power2.easeIn
     },0);

     tl.fromTo(welcomeMask, .6, {
       right: "100%"
      },{
       right:0,
       ease:Expo.easeOut
     },'-=0.2');

     tl.to(welcomeText, .2, {
       opacity:0
     },'-=0.4');

     tl.fromTo(welcomeMask, .6, {
       left: 0
      },{
       left:"100%",
       ease:Expo.easeOut
     },'-=0.2');

     tl.staggerTo(doors, .6, {
       scaleY:0,
       ease:Expo.easeOut
     },0.2,'+=0.2');

     tl.call(function(){
       globalLoader.remove();
       intro();
     });

     tl.play();
  }


  var intro = function(){
    
  }



   return {
     showPreLoader: showPreLoader,
     init: init
   }

})();

globalSite.showPreLoader();
