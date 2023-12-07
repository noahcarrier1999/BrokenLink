

import { copyAllBrokenLinks } from './backgroundScripts/copyAllBrokenLinks.js';


/********************************
 *
 * Adds right-click menu option to
 * Alphabetically organize the disabled
 * nav items on the settings of a course.
 *
   ********************************/


    copyAllBrokenLinks();

    chrome.runtime.onMessage.addListener(function (request) {
    if (request.action === "sendArraysToBackground") {
      console.log("Page Url Array received in the background");
      let PageUrls = request.array1;
      let BrokenLinks = request.array2;
      let Titles = request.array3;


        chrome.storage.local.set({
            brokenLinksPageUrls: PageUrls,
            brokenLinksURLS: BrokenLinks,
            brokenLinksTitles: Titles
        }, function() {
            chrome.windows.create({
                type: 'popup',
                url: './contextMenu.html',
                width: 630,
                height: 325
            });
        });

    }
    });






//}});
  




