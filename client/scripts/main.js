import oHoverable from 'o-hoverable';

var minWidth = 800;
var minHeight = 400;
var fixed = false;

// make hover effects work on touch devices
oHoverable.init();

function scrollToAnchor () {
  var loc = location.href;
  var anchor = loc.split('#')[1];
  if (location.hash) {

    var node = document.getElementById(anchor);
    var yourHeight = 50;

    // scroll to your element
    node.scrollIntoView(true);

    // now account for fixed header
    var scrolledY = window.scrollY;

    if(scrolledY){
      window.scroll(0, scrolledY - yourHeight);
    } 
  }
}

function checkSticky() {
  var stickyTop = document.getElementById('main-title').getBoundingClientRect().top;
  if (!fixed && stickyTop <= -66) {
    fixed = true;
    document.querySelector('.ft-header__left').classList.add('sticky');
    document.querySelector('.ft-header__center-title').classList.add('sticky');
    document.querySelector('.o-ft-icons-icon--brand-ft-masthead').classList.add('sticky');
  } else if (fixed && stickyTop > -66) {
    fixed = false;
    document.querySelector('.ft-header__left').classList.remove('sticky');
    document.querySelector('.ft-header__center-title').classList.remove('sticky');
    document.querySelector('.o-ft-icons-icon--brand-ft-masthead').classList.remove('sticky');
  }
}

document.querySelector('.ft-header-button').addEventListener('click', function() {
  document.querySelector('.ft-header__sections').classList.toggle('menuon');
});

document.querySelector('.ft-header__sections').addEventListener('click', function() {
  event.currentTarget.classList.remove('menuon');
});

window.onscroll = checkSticky;
setTimeout(function(){ scrollToAnchor() }, 500);
