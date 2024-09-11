function tryto(func){
  return new Promise(async (resolve) => {
    try{
      var r = await func();
      resolve(r);
    } catch (e){
      resolve(e);
    }
  })
}

document.addEventListener('DOMContentLoaded', async function (event) {
  var func = async () => {
    var redirections = await fetch('https://samuellouf.github.io/api/samuellouf-website/v1/redirections.json').then((r) => r.json());
    const isURLCompatible = (origin) => {
      return window.location.href.startsWith(origin);
    }

    const getNewURL = (origin, redirection) => {
      return redirection + window.location.href.replace(origin, '') + (window.location.href.replace(origin, '')[1] != '/' ? '/' : '');
    }

    for (var url of redirections){
      if (isURLCompatible(url.origin)){
        window.location.href = getNewURL(url.origin, url.redirection);
      }
    }
  }
  tryto(func);
})
