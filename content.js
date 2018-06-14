const url = window.location.href;

const base = 'https://camelcamelcamel.com//product/'
const path = url.match(/dp\/\w*/)[0].slice(3);
const chart = `https://charts.camelcamelcamel.com/us/${path}/amazon.png?force=1&zero=0&w=400&h=243&desired=false&legend=1&ilt=1&tp=all&fo=0&lang=en`;
const itemTitle = document.getElementById('productTitle').innerHTML.trim();
const itemSlug = itemTitle.replace(/[^a-zA-Z0-9 \-.]/g, '').replace(/[ .]/g, '-').replace(/-+/g,'-').toLowerCase();

chrome.runtime.sendMessage({location: chart, itemSlug}, (response) => { });
