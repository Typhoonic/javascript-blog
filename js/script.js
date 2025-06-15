'use strict';

const optArticleSelector = '.posts article',
  optArticleActiveSelector = '.posts article.active',
  optTitleActiveSelector = '.titles a.active',
  optTitlesSelector = '.titles a',
  optTitleListSelector = '.titles',
  optPostTagsList = '.post-tags .list',
  optPostTagListItems = '.post-tags .list a';

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
  clickedElement.classList.add('active');
}

function addActiveToClickedArticle(hrefAttribute) {
  const articleToActive = document.getElementById(hrefAttribute.replace('#', ''));
  articleToActive.classList.add('active');
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
function fillLinkArticleTitle(linkHTML) {
  const listTitles = document.querySelector(optTitleListSelector);
  listTitles.innerHTML = listTitles.innerHTML + linkHTML;
}

function removeListTitles() {
  const listTitles = document.querySelectorAll(optTitleListSelector);
  for (let listTitle of listTitles) {
    listTitle.innerHTML = '';
  }
}

function generateTitleLinks(customSelector) {
  removeListTitles();
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for (let article of articles) {
    const articleId = article.id;
    const htmlPostTitle = article.querySelector('h3').innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + htmlPostTitle + '</span></a></li>';
    fillLinkArticleTitle(linkHTML);
  }

  const links = document.querySelectorAll(optTitlesSelector);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks('');

//PART3

function fillArticleByTags(article, dataTagsArray) {
  let htmlVar = '';
  const tagList = article.querySelector(optPostTagsList);
  for (let dataTag of dataTagsArray) {
    htmlVar = '<li><a href="tag-' + dataTag + '">' + dataTag + '</a></li>\n';
    tagList.innerHTML += htmlVar;
  }
}

function generateTags() {
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const dataTags = article.getAttribute('data-tags');
    const dataTagsArray = dataTags.split(' ');

    fillArticleByTags(article, dataTagsArray);
  }
}

generateTags();

function tagClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replaceAll('tag-', '');

  const activeArticles = document.querySelectorAll('a.active[href^="#tag-"]');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  const hrefLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let hrefLink of hrefLinks) {
    hrefLink.classList.add('active');
  }

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  const tagListItems = document.querySelectorAll(optPostTagListItems);

  for (let tagListItem of tagListItems) {
    tagListItem.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();


/*function generateTags() {
  const articles = document.querySelectorAll(optArticleSelector);
  const tagList = document.querySelector('.sidebar .tags');
  let htmlVar = '';

  for (let article of articles) {
    const dataTagsArticle = article.getAttribute('data-tags');
    const dataTagsSplitted = dataTagsArticle.split(' ');

    for (let dataTag of dataTagsSplitted) {
      // <li><a href="#">design</a> <span>(6)</span></li>
      htmlVar = '<li><a href="#">' + dataTag + '</a></li>\n';
      tagList.innerHTML += htmlVar;
    }
  }
}

generateTags();*/
