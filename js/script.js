'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTag: Handlebars.compile(document.querySelector('#template-tag-article-link').innerHTML),
  authorTag: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-all-tags').innerHTML)
};

const optArticleSelector = '.posts article',
  optArticleActiveSelector = '.posts article.active',
  optTitleActiveSelector = '.titles a.active',
  optTitlesSelector = '.titles a',
  optTitleListSelector = '.titles',
  optPostTagsList = '.post-tags .list',
  optPostTagListItems = '.post-tags .list a',
  optPostAuthor = '.post-author',
  optSideBarAuthor = '.sidebar .authors',
  optDataTags = 'data-tags',
  optSidebarTags = '.sidebar .tags',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';

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
  listTitles.innerHTML += linkHTML;
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
    const linkHTMLData = { id: articleId, title: htmlPostTitle };
    const linkHTML = templates.articleLink(linkHTMLData);
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
  let articleTags = [];
  const tagList = article.querySelector(optPostTagsList);
  for (let dataTag of dataTagsArray) {
    const linkHtmlData = { id: 'tag-' + dataTag, dataTag: dataTag };
    htmlVar = templates.articleTag(linkHtmlData);
    tagList.innerHTML += htmlVar;
    articleTags.push(htmlVar);
  }
  return articleTags;
}

function generateItterateMapObject(arrayElements) {
  let iterrateMap = {};
  for (let elementList of arrayElements) {
    for (let element of elementList) {
      if (!iterrateMap.hasOwnProperty(element)) {
        iterrateMap[element] = 1;
      } else {
        iterrateMap[element]++;
      }
    }
  }

  return iterrateMap;
}

function calculateTagsParams(tagsMap) {
  let tagsParams = {};

  for (let tag in tagsMap) {
    if (!tagsParams.hasOwnProperty('min') && !tagsParams.hasOwnProperty('max')) {
      tagsParams['min'] = tagsMap[tag];
      tagsParams['max'] = tagsMap[tag];
    } else {
      tagsParams['min'] = tagsMap[tag] < tagsParams['min'] ? tagsMap[tag] : tagsParams['min'];
      tagsParams['max'] = tagsMap[tag] > tagsParams['max'] ? tagsMap[tag] : tagsParams['max'];
    }
  }

  return tagsParams;
}

function calculateTagClass(count, params) {
  const classNumber = Math.floor(((count - params.min) / (params.max - params.min + 1)) * optCloudClassCount + 1);
  return classNumber;
}

function fillSidebarTags(tagsMap) {
  const allTagsData = { tags: [] };
  const tagsParams = calculateTagsParams(tagsMap);
  const tagList = document.querySelector(optSidebarTags);

  for (let tag in tagsMap) {
    const match = tag.match(/<a[^>]*>([^<]+)<\/a>/);
    const tagValue = match ? match[1] : null;

    allTagsData.tags.push({
      tag: tagValue,
      id: 'tag-' + tagValue,
      class: optCloudClassPrefix + calculateTagClass(tagsMap[tag], tagsParams)
    });
  }
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}

function generateTags() {
  let allTags = [];
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const dataTags = article.getAttribute(optDataTags);
    const dataTagsArray = dataTags.split(' ');

    let articleTags = fillArticleByTags(article, dataTagsArray);
    allTags.push(articleTags);
  }

  const tagsMap = generateItterateMapObject(allTags);
  fillSidebarTags(tagsMap);
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

//PART 4 - authors
function fillSidebarAuthors(authorsMap) {
  const tagsParams = calculateTagsParams(authorsMap);
  const tagList = document.querySelector(optSideBarAuthor);

  for (let author in authorsMap) {
    const classNumber = calculateTagClass(authorsMap[author], tagsParams);
    const linkHtmlData = { class: optCloudClassPrefix + classNumber, id: 'tag-' + author, author: author };
    const linkHtml = templates.authorTag(linkHtmlData);
    tagList.innerHTML += linkHtml;
  }
}

function generateAuthors() {
  let allAuthors = [];
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    let author = [];
    const postAuthor = article.querySelector(optPostAuthor).innerHTML;

    author.push(postAuthor.replace('by ', ''));
    allAuthors.push(author);
  }

  const authorsMap = generateItterateMapObject(allAuthors);
  fillSidebarAuthors(authorsMap);
}

generateAuthors();
