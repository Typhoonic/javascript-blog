'use strict';

function removeActiveLinks() {
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }
}

function removeActiveArticles() {
    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }
}

function addActiveToClickedLink(event) {
    console.log('test');
}

function titleClickHandler(event) {
    console.log('Link was clicked');

    console.log(event);

    removeActiveLinks();
    removeActiveArticles();

    // addActiveToClickedLink(event)

    /* add class 'active' to the clicked link */

    /* get 'href' attribute from the clicked link */

    /* find the correct article using the selector (value of 'href' attribute) */

    /* add class 'active' to the correct article */
}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}