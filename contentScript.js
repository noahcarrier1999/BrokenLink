

function selectHeaderHREFs(){

  let PageUrlArray = [];
  let divs = document.querySelectorAll('div.result');
  

  //console.log(divs);

  let linksAmmount = Array.from(divs).map(div => {
      let links = div.querySelectorAll('a'); 
      let count = links.length - 1;
      //console.log(count)

      if (count > 1){

          let headings = document.querySelector('.result h2 > a');
          let link = headings.getAttribute('href');

          for (let i = 0; i <= count - 1; i++){
              
              //console.log(link);
              PageUrlArray.push(link);
              
          }      
      }
      else 
      {
          //console.log(links[0].getAttribute("href"));
          PageUrlArray.push(links[0].getAttribute("href"));
      }

      //console.log(PageUrlArray);
      
  });

  return PageUrlArray;

  
};



// function selectHeaderHREFs() {
//     // Select all <a> elements that are children of <h2> within .result
//     const links = document.querySelectorAll('.result h2 > a');

//     // Map over the NodeList to extract the href attributes
//     const hrefs = Array.from(links).map(link => link.getAttribute('href'));

//     return hrefs;
// }

function selectLinksHREFs() {
    // Select all <a> elements that are children of <h2> within .result
    const links = document.querySelectorAll('.result ul > li > a');

    // Map over the NodeList to extract the href attributes
    const hrefs = Array.from(links).map(link => link.getAttribute('href'));

    return hrefs;
}

function selectAllTitles()
{
  const titles = document.querySelectorAll('.result ul > li > a');
  //console.log(titles);
  const titlesArray = Array.from(titles).map(title => title.textContent);

  return titlesArray;
}


// chrome.runtime.sendMessage({ action: 'openNewPopup' }, function(response) {
//     if (response.success) {
//       console.log('New popup opened successfully');
//     } else {
//       console.error('Failed to open the new popup');
//     }
//   });



function scrape() {
    // Execute the content script in the active tab
    console.log("Received 'startScraping' message");

    // This code runs in the context of the active tab

    let arrayOfPageUrls = selectHeaderHREFs();
    console.log('Pages:');
    console.log(arrayOfPageUrls);

    let arrayOfBrokenLinks = selectLinksHREFs();
    console.log('broken:');
    console.log(arrayOfBrokenLinks);
    
    let arrayOfLinkTitles = selectAllTitles();
    console.log('link text');
    console.log(arrayOfLinkTitles);

    if (arrayOfPageUrls && arrayOfBrokenLinks && arrayOfLinkTitles){
        console.log("Data retrieved Successfully");
        chrome.runtime.sendMessage({
          action: "sendArraysToBackground", 
          array1:arrayOfPageUrls, 
          array2:arrayOfBrokenLinks, 
          array3:arrayOfLinkTitles});
    
    } else {
        console.log("Data retrival failed.")
    }


    
}


  
  scrape();



// chrome.extension.onMessage.addListener(function (message, sender, callback) {
//     if (message.functiontoInvoke == "copyAllBroken") {
//         console.log("Message Received: " + sender.tab.id);
//         scrape();
//     }
// });





