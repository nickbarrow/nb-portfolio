window.scrollTo({ top: 0 });
// Add smooth scroll after page load so that force scroll to top works.
document.querySelector('html').style.scrollBehavior = "smooth";

var $body = document.querySelector('body'),
    $sections = Array.from(document.querySelectorAll('section:not(.PersonalProjects)')).reverse(),
    $navItems = Array.from(document.querySelectorAll('.SidebarItem')).reverse(),
    sectionTops = $sections.map(section => section.getBoundingClientRect().y + document.documentElement.scrollTop);

clearActive($navItems);
clearActive($sections);

// Precise activation of element
// (will activate when element is OFFSET_OFFSET pixels from top of container).
const OFFSET_OFFSET = 200;

window.onscroll = function () {
  let currentScrollPos = window.scrollY;
  
  if (currentScrollPos > 0) $body.classList.add('Scrolled');
  else {
    $body.classList.remove('Scrolled');
    clearActive($navItems);
    clearActive($sections);
    return;
  }
  
  sectionTops.every((activationPoint, index) => {
    if (currentScrollPos >= activationPoint - OFFSET_OFFSET) {
      clearActive($navItems);
      clearActive($sections);
      $navItems[index].classList.add('Active');
      $sections[index].classList.add('Active');
      return false;
    }
    return true;
  });
}

function clearActive(e) {
  if (e.length > 1)
    e.forEach(element => {
      element.classList.remove('Active');
    });
  else e.classList.remove('Active');
}

$navItems.forEach($navItem => {
  $navItem.addEventListener('click', function (e) {
    let t = e.target.dataset.section;
    if (!t) return;
    else document.getElementById(t).scrollIntoView();
  });
});

document.querySelector('.ScrollHint').addEventListener('mouseover', function (e) {
  e.stopPropagation();
  e.target.classList.remove('ScrollHint');
});


// SVG Morph
if (typeof Snap !== undefined) {
  var svg = document.querySelector('.ContactIcon.Animated > svg'),
      messageIcon = Snap.select('#message'),
      phoneIcon = Snap.select('#phone');

  var messageIconPoints = messageIcon.node.getAttribute('d'),
      phoneIconPoints = phoneIcon.node.getAttribute('d');

  var toPhone = () => {
    messageIcon.animate({
      d: phoneIconPoints
    }, 1000, mina.backout, toMessage);
  }

  var toMessage = () => {
    messageIcon.animate({
      d: messageIconPoints
    }, 1000, mina.backout, toPhone);
  }
  
  // toMessage();
  // absolutely atrocious. come back later
}