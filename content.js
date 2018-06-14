let url = window.location.href;
// url = url.slice(0, url.indexOf('?'));
// url = encodeURIComponent(url)
// const target = `https://www.fakespot.com/analyze?utf8=%E2%9C%93&url=${url}`;
// const target = 'https://www.fakespot.com/product/dewalt-dwfp55126-6-gallon-165-psi-pancake-compressor';
// console.log(target);

const base = 'https://camelcamelcamel.com//product/'
const path = url.match(/dp\/\w*/)[0].slice(3);
const chart = `https://charts.camelcamelcamel.com/us/${path}/amazon.png?force=1&zero=0&w=400&h=243&desired=false&legend=1&ilt=1&tp=all&fo=0&lang=en`;
const itemTitle = document.getElementById('productTitle').innerHTML.trim();
const itemSlug = itemTitle.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '-').toLowerCase();

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    console.log('hey!');
    console.log(xhr.responseText);
  }
}
xhr.open('GET', base+path, true);
xhr.send();


chrome.runtime.sendMessage({location: chart, itemSlug}, (response) => {
});