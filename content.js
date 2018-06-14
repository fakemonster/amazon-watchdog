let url = window.location.href;
url = url.slice(0, url.indexOf('?'));
url = encodeURIComponent(url)
// const target = `https://www.fakespot.com/analyze?utf8=%E2%9C%93&url=${url}`;
const target = 'https://www.fakespot.com/product/dewalt-dwfp55126-6-gallon-165-psi-pancake-compressor';
console.log(target);
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    console.log('hey!');
    console.log(xhr.responseText);
  }
}
xhr.open('GET', target, true);
xhr.send();
