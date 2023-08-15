/* The below JSON data is the xhr.response.
 Here it is an Array of objects conatining 
 title, source, image etc.  

let jsonData = fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=30`)
  .then((responseObj) => responseObj.json()); 
*/

const dropdownBox = document.querySelector('.news-sources');
const allOptions = document.querySelectorAll('option');
const newsPage = document.querySelector('.container');
let select = document.querySelector('select');
let allNews = [];

function displayOptions(allSources) {
  allSources.forEach((source) => {
    let option = document.createElement('option');
    option.innerText = source;
    option.value = source;
    select.append(option);
  });
}

// function createDropDownUI(data) {
//   console.log('Inside createDropDownUI now');
//   let listOfSources = data.map((eachObj) => eachObj.newsSite);

//   let listOfUniqueSources = listOfSources.filter((source, index, array) => {
//     return array.indexOf(source) === index;
//   });
//   //   console.log(listOfUniqueSources);
//   allOptions.forEach((option, index) => {
//     option.innerText = listOfUniqueSources[index];
//     // console.log(option.innerText);

//     //  Selecting any specific news source will display news
//     //   from that specific source only.
//     // console.log(data);
//   });
// }

/*
HTML to Recreate:

<div class="news-set flex jcc aic flex-48">
        <img src="../sample1.jpg" alt="Fox" />
        <div class="news-description flex-col">
          <h4 class="source">option-1</h4>
          <h2 class="title">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            eaque modi fugit, in assumenda dicta architecto at ipsum, a quas
            ratione deserunt obcaecati!
          </h2>
          <button class="read-more">Read More</button>
        </div>
      </div>

*/

/*
Data to take form the Obtained Json Array  of Object:

- imageUrl : The image of the news.
- newsSite : The news sources specified in the Drop-down box 
- title : Gives the title of the news.
- url : the Read More button redirects to this url.
*/

function createUI(data) {
  //   console.log(data);
  newsPage.innerHTML = '';
  data.forEach((spaceData, index) => {
    // news set 1
    let newsSet = document.createElement('div');
    let img = document.createElement('img');
    let newsDescription = document.createElement('div');
    let source = document.createElement('h4');
    let title = document.createElement('h2');
    let button = document.createElement('button');

    newsSet.classList.add('news-set', 'group-A', 'flex', 'jce', 'aic'); // Add 'flex-1' for equal space and side-by-side display
    newsDescription.classList.add('news-description', 'flex-col');
    source.classList.add('source');
    title.classList.add('title');
    button.classList.add('read-more');

    //Set Data for news set A
    img.src = spaceData.imageUrl;
    img.alt = spaceData.title;

    source.innerText = spaceData.newsSite;

    title.innerText = spaceData.title;

    button.innerText = `Read More`;
    //  Clicking on read me should take the user to the news url
    button.addEventListener('click', function () {
      window.open(spaceData.url, '_blank');
    });

    // Append data for news set A
    newsDescription.append(source, title, button);
    newsSet.append(img, newsDescription);
    newsPage.append(newsSet);
  });
}

let jsonData = fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=30`)
  .then((responseObj) => responseObj.json())
  .then((data) => {
    allNews = data; // Update the allNews Global array with all news. This will us Global access of the news `data` obtained here.
    createUI(data);
    let allSources = Array.from(
      new Set(data.map((eachNews) => eachNews.newsSite))
    );
    console.log(allSources);
    displayOptions(allSources);
  });

select.addEventListener('change', (event) => {
  let source = event.target.value.trim();

  //   i.e when you select the `Select News` option , draw from the default Global News data
  if (source) {
    var filteredData = allNews.filter((data) => data.newsSite === source);
  } else {
    filteredData = allNews;
  }

  createUI(filteredData);
});
