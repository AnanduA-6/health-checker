console.log('hey')
const apiKey = 'AIzaSyBFylvdGnaiX4X3rlUi1dY6Wfir8-qv1SI';
let url;
let strategy;
const category = 'BEST_PRACTICES&category=SEO&category=ACCESSIBILITY&category=PERFORMANCE';


function fetchFunction(apiUrl){

  console.log(apiUrl)
  fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
      console.log(data)
      document.querySelector('.pageTested').textContent=data.id
      document.querySelector('.op').textContent=data.lighthouseResult.categories.performance.score
      document.querySelector('.si').textContent = data.lighthouseResult.audits['speed-index'].score;
      document.querySelector('.fcp').textContent=data.lighthouseResult.audits['first-contentful-paint'].score
      document.querySelector('.fmp').textContent=data.lighthouseResult.audits['first-meaningful-paint'].score
      document.querySelector('.lcp').textContent=data.lighthouseResult.audits['largest-contentful-paint'].score
      document.querySelector('.cls').textContent=data.lighthouseResult.audits['cumulative-layout-shift'].score
      document.querySelector('.srt').textContent=data.	lighthouseResult.audits['server-response-time'].numericValue
      document.querySelector('.srs').textContent=data.	lighthouseResult.audits['server-response-time'].score
      document.querySelector('.dss').textContent=data.lighthouseResult.audits['dom-size'].score
      document.querySelector('.tws').textContent=data.lighthouseResult.audits['total-byte-weight'].score
  
  });
}


function setUpQuery() {
    const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
    const parameters = {
      url: encodeURIComponent(url),
      key: apiKey,
      strategy: strategy,
      category:category
    };
    let query = `${api}?`;
    for (key in parameters) {
      query += `${key}=${parameters[key]}&`; // Add '&' to separate query parameters
    }
    // Remove the trailing '&' from the query string
    query = query.slice(0, -1);
    return query;
}

document.querySelector('#analyzeBtn').addEventListener('click',()=>{
  strategy=document.querySelector('input[name="strategy"]:checked').value;
  url=document.querySelector('#url').value
  const apiUrl = setUpQuery()
  fetchFunction(apiUrl)
})