$(document).ready(function() {
    $('nav a[href*="#"]').on('click', function() {
        $('html, body').animate( {
            scrollTop: $($(this).attr('href')).offset().top-100
        }, 2000);
    });
});

//hamburger menu - responsive 

const bodyElement = document.querySelector('body');
const menuToggle = document.querySelector('.hamburger-menu');
const heroElement = document.querySelector('.hero');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('click', function () {
    bodyElement.classList.toggle('is-open');
    heroElement.classList.add('is-open');
});

navList.addEventListener('click', function (e) {
    let clickedElement = e.target;

    if(clickedElement.classList[0] === "nav-link") {
        bodyElement.classList.remove('is-open');
    }
});

//add eventListener to window object to close nav when we click outside

window.addEventListener('click', function (e) {
    let clickedElement = e.target;

    if (clickedElement.matches('.is-open')) {
        bodyElement.classList.remove('is-open');
        heroElement.classList.remove('is-open');

    }
});

// Typewriter effect 

class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = "";
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.type();
      this.isDeleting = false;
    }
  
    type() {
      // Current index of word
      const current = this.wordIndex % this.words.length;
      // Get full text of current word
      const fullTxt = this.words[current];
  
      // Check if deleting
      if (this.isDeleting) {
        // Remove characters
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        // Add charaters
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
  
      // Insert txt into element
      this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  
      // Initial Type Speed
      let typeSpeed = 80;
  
      if (this.isDeleting) {
        // Increase speed by half when deleting
        typeSpeed /= 2;
      }
  
      // If word is complete
      if (!this.isDeleting && this.txt === fullTxt) {
        // Make pause at end
        typeSpeed = this.wait;
        // Set delete to true
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 500;
      }
  
      setTimeout(() => this.type(), typeSpeed);
    }
  }
  
  // Init On DOM Load
  document.addEventListener("DOMContentLoaded", init);
  
  // Init App
  function init() {
    const txtElement = document.querySelector(".txt-type");
    const words = JSON.parse(txtElement.getAttribute("data-words"));
    const wait = txtElement.getAttribute("data-wait");
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
  }