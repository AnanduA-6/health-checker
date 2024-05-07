
function run(value) {
    loading(1)
  const url = setUpQuery(value);
  fetch(url)
    .then(response => response.json())
    .then(json => {
        loading(0)
        console.log('hgh',json);

      // See https://developers.google.com/speed/docs/insights/v5/reference/pagespeedapi/runpagespeed#response
      // to learn more about each of the properties in the response object.
      showInitialContent(json.id);
      const cruxMetrics = {
        "First Contentful Paint": json.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.category,
        "First Input Delay": json.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.category
      };
      showCruxContent(cruxMetrics);
      const lighthouse = json.lighthouseResult;
      const lighthouseMetrics = {
        'First Contentful Paint': lighthouse.audits['first-contentful-paint'].displayValue,
        'Speed Index': lighthouse.audits['speed-index'].displayValue,
        'Time To Interactive': lighthouse.audits['interactive'].displayValue,
        'First Meaningful Paint': lighthouse.audits['first-meaningful-paint'].displayValue,
        // 'First CPU Idle': lighthouse.audits['first-cpu-idle'].displayValue,
        // 'Estimated Input Latency': lighthouse.audits['estimated-input-latency'].displayValue
      };
      showLighthouseContent(lighthouseMetrics);
    });
}

function setUpQuery(value) {
  const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
  const parameters = {
    url: encodeURIComponent(value)
  };
  let query = `${api}?`;
  for (key in parameters) {
    query += `${key}=${parameters[key]}`;
  }
  return query;
}

function showInitialContent(id) {
  const title = document.createElement('h1');
  title.textContent = 'PageSpeed Insights API Demo';
  document.body.appendChild(title);
  const page = document.createElement('p');
  page.textContent = `Page tested: ${id}`;
  document.body.appendChild(page);
}

function showCruxContent(cruxMetrics) {
  const cruxHeader = document.createElement('h2');
  cruxHeader.textContent = "Chrome User Experience Report Results";
  document.body.appendChild(cruxHeader);
  for (key in cruxMetrics) {
    const p = document.createElement('p');
    p.textContent = `${key}: ${cruxMetrics[key]}`;
    document.body.appendChild(p);
  }
}

function showLighthouseContent(lighthouseMetrics) {
  const lighthouseHeader = document.createElement('h2');
  lighthouseHeader.textContent = "Lighthouse Results";
  document.body.appendChild(lighthouseHeader);
  for (key in lighthouseMetrics) {
    const p = document.createElement('p');
    p.textContent = `${key}: ${lighthouseMetrics[key]}`;
    document.body.appendChild(p);
  }
}

let analyzeBtn=document.getElementById("analyzeBtn");
analyzeBtn.addEventListener("click", function(){
    let urlInput=document.getElementById("url").value;
    console.log(urlInput)
    run(urlInput);
})
function loading(val){
    if(val==true){
        document.querySelector('#loadingOvrlay').style.display='flex'
    }else{
        document.querySelector('#loadingOvrlay').style.display='none'
    }
}