/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
// Sections Node List
const sections = document.querySelectorAll('section');
// Variable hold active class section
let activeClass = document.querySelector('.your-active-class');
// Variable hold active class nav menu
let activeClassNav;
// variable for navigation menu list
const ulList = document.querySelector('ul');
// object for IntersectionObserver
const Option = {
    rootMargin: "-250px 0px 0px 0px",
    threshold: 0.25
};

// variable for menu navigation button
const divButton = document.querySelector('#button');
// boolean to know if navigation menu is opened
let menuOpened = false;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/** Create the Navigation Menu function
    * Loop for every section
    * Create li element
    * Add every element to the fragment
    */
function createNavMenu() {
    const fragment = document.createDocumentFragment();
    for (const section of sections) {
        const navElement = document.createElement('li');
        const navElementContent = `<a href= "#${section.id}" class = "menu__link">${section.dataset.nav}</a>`;
        navElement.innerHTML = navElementContent;
        fragment.appendChild(navElement);
    }
    // Add the fragment to nav-menu
    ulList.appendChild(fragment);
    // ensure that page is loaded and the navigation menu is created => 
    // Start intersection
    startIntersection();

};


/** Begin Events
 * 
*/

/**
 * Build navigation menu
 * Add event listener when the DOM Loaded and pass the create Navigation menu function
 * 
*/
document.addEventListener('DOMContentLoaded', createNavMenu);
/** Scroll smooth to section
 * Add event listener to the UL List
 * call the listener and pass the create Navigation menu function
 * Prevent default action to avoid href going directly to the link
 * use the href attribute to get the clicked section
 * close the navigation menu if it is opened
*/
ulList.addEventListener('click', function (event) {
    // ensure that the click in one of the sestions not on the bar
    if (event.target.id !== 'navbar__list') {
        event.preventDefault();
        const section = document.getElementById(event.target.getAttribute('href').substring(1));
        section.scrollIntoView({ behavior: "smooth", block: "center" });
        if (menuOpened) {
            ulList.classList.remove('menu__click');
            menuOpened = false;
        }
    };

});

/**Set sections as active
 * when section entering the viewport
* remove active class from the previous section and nav
* set the active class variable to the viewport section and nav
* set the active class to the viewport section and nav
*/

const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        // if the section leaving the viewport => do nothing
        if (!entry.isIntersecting) {
            return;
        }

        else {
            activeClass.classList.remove('your-active-class');
            activeClassNav.classList.remove('your-active-class-nav');
            activeClass = entry.target;
            activeClassNav = document.querySelector(`[href="#${entry.target.id}"]`);
            activeClass.classList.add('your-active-class');
            activeClassNav.classList.add('your-active-class-nav');
        };
    });
}, Option);
// Intersaction Function
function startIntersection() {
    // give activeClassNav variable initial value
    activeClassNav = document.querySelector('li');
    sections.forEach(section => {
        observer.observe(section);
    });
};


/** Menu button
     * Add event listener when clicking the menu button
     * Add/remove class thet show/hide the menu
     * 
     */
//  
divButton.addEventListener('click', function () {
    // if the menu already opened => close it
    if (menuOpened) {
        menuOpened = false;
        ulList.classList.remove('menu__click');

    } // else => open the menu
    else {
        ulList.classList.add('menu__click');
        menuOpened = true;
    };

});



