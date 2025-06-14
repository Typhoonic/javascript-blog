'use strict';

const optArticleSelector = '.posts article',
    optArticleActiveSelector = '.posts article.active',
    optTitleActiveSelector = '.titles a.active',
    optTitlesSelector = '.titles a',
    optTitleListSelector = '.titles';

function removeActiveLinks() {
    const activeLinks = document.querySelectorAll(optTitleActiveSelector);

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }
}

function removeActiveArticles() {
    const activeArticles = document.querySelectorAll(optArticleActiveSelector);

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

// PART 2
function clearLinks(links) {
    for (let link of links) {
        link.remove();
    }
}

function fillLinkArticleTitle(linkHTML) {
    const listTitles = document.querySelector(optTitleListSelector)
    listTitles.innerHTML = listTitles.innerHTML + linkHTML;
}

function generateTitleLinks(event) {
    // clearLinks(links);
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
        const articleId = article.id;
        const htmlPostTitle = article.querySelector('h3').getHTML();
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + htmlPostTitle + '</span></a></li>';
        fillLinkArticleTitle(linkHTML);
    }
}

generateTitleLinks();

const links = document.querySelectorAll(optTitlesSelector);

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}


function generateTags() {
    const articles = document.querySelectorAll(optArticleSelector)
    const tagList = document.querySelector('.sidebar .tags');
    let htmlVar = '';

    for (let article of articles) {
        const dataTagsArticle = article.getAttribute('data-tags');
        const dataTagsSplitted = dataTagsArticle.split(' ')

        for (let dataTag of dataTagsSplitted) {
            // <li><a href="#">design</a> <span>(6)</span></li>
            htmlVar = '<li><a href="#">' + dataTag + '</a></li>\n';
            tagList.innerHTML += htmlVar;
        }
    }
}

generateTags();