import  { initThreeScene , loadPcbModel, resizeRenderer } from './load_pcb.js';

(function() {
    let scene, camera, renderer;

    // load pcb
    document.addEventListener('DOMContentLoaded', function () {
        const initResult = initThreeScene('pcb-gltf-model');
        scene = initResult.scene;
        camera = initResult.camera;
        renderer = initResult.renderer;
        loadPcbModel(scene, camera, renderer);
    });

    // pcb canvas resize
    window.addEventListener('resize', function() {
        if (renderer && camera) {
            resizeRenderer(renderer, camera, 'pcb-gltf-model');
        }
    });
})();

// navbar listener
document.addEventListener('DOMContentLoaded', function () {
    var navbar = document.getElementById('navbar');
    var sticky = navbar.offsetTop;


    function makeSticky() {
      if (window.scrollY >= sticky) {
        navbar.classList.add('sticky');
        navbar.classList.remove('rounded-5');

      } else {
        navbar.classList.remove('sticky');
        navbar.classList.add('rounded-5');
      }
    }
    // 監聽滾動事件
    window.addEventListener('scroll', makeSticky);
  });

  // scroll bias
  document.addEventListener('DOMContentLoaded', function() {
    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    var navbarHeight = document.getElementById('navbar').offsetHeight;
  
    anchorLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
  
        var targetId = this.getAttribute('href');
        var targetElement = document.querySelector(targetId);
  
        if (targetId !== "#top") {
          window.scrollTo({
            top: targetElement.offsetTop - navbarHeight,
            behavior: 'smooth'
          });
        } else {
          window.scroll({
            top: 0,
            behavior: 'smooth'
          });
        }
      });
    });
  });

// img related
const fadeInClass = 'animate-in';

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add(fadeInClass);
    } else {
      entry.target.classList.remove(fadeInClass);
    }
  });
}, {
  // trigger when 70% target got into view point
  threshold: 0.7
});

document.querySelectorAll('img.img-fluid').forEach(img => {
  observer.observe(img);
});
