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

function addActiveToClickedLink(clickedElement) {
    clickedElement.classList.add('active')
}

function addActiveToClickedArticle(hrefAttribute) {
    const articleToActive = document.getElementById(hrefAttribute.replace('#', ''))
    articleToActive.classList.add('active')
}

function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;

    removeActiveLinks();
    removeActiveArticles();
    addActiveToClickedLink(clickedElement);

    const hrefAttribute = clickedElement.getAttribute('href');
    addActiveToClickedArticle(hrefAttribute);
}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}