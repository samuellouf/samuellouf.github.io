function if_then_else_return(condition, then_return, else_return){
  if (condition) {
    return then_return;
  } else {
    return else_return;
  }
}

function getTags(tags){
  var taglist = '';
  for (var tag in tags){
    taglist = taglist + '[' + tags[tag] + '] ';
  }
  return taglist;
}

function setParam(key, value) {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.replaceState(null, null, url);
}

async function loadPages(){
  try {
    var api = await fetch('https://samuellouf.github.io/api/samuellouf-website/v1/samuellouf-website.json').then(r => r.text());
  } catch (e) {
    var api = await fetch('https://raw.githubusercontent.com/samuellouf/api/main/samuellouf-website/v1/samuellouf-website.json').then(r => r.text());
  }

  api = JSON.parse(api);

  var i = 0;

  for (i in api.pages){
    var li = document.createElement('li');
    li.innerHTML = `<div>
    <h1>${api.pages[i].name}</h1>
    <h2>${api.pages[i].short_description}</h2>
    <br>
    <p>${api.pages[i].description}</p>
    <br>
    <div class="links">
      <a href="${api.pages[i].url}"><button>Open page</button></a>
      ${if_then_else_return(api.pages[i].isWebApp, '<a href="' + api.pages[i].webAppURL + '"><button>Open webapp</button></a>', '')}
      ${if_then_else_return(api.pages[i].isDownloadableApp, '<a href="' + api.pages[i].downloadURL + '"><button>Download</button></a>', '')}
    </div>
    <span class="tag">${getTags(api.pages[i].tags)}</span>
    <span class="tag">${if_then_else_return(api.pages[i].isProject, '#projects', '')}</span>
  </div>`;
    document.querySelector('ul#searchItems').appendChild(li);
  }
}

function refreshSearchResults() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('searchInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("searchItems");
  li = ul.getElementsByTagName('li');

  document.title = 'Search' + if_then_else_return(input.value == '', '', ' - ') + input.value;

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("div")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

async function main(){
  const url = new URL(window.location.href);
    
  if ((url.searchParams.get('q') != '') && (url.searchParams.get('q') != null)){
    document.getElementById('searchInput').value = url.searchParams.get('q');
  }

  await loadPages();

  refreshSearchResults();
}

window.onload = main();