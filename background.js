'use strict';




/********************************
 *
 * Adds right-click menu option to
 * Alphabetically organize the disabled
 * nav items on the settings of a course.
 *
   ********************************/
// chrome.runtime.onInstalled.addListener(function(){
//   function copyAllBrokenLinksCM() {
//     chrome.contextMenus.create({
//         id: "copy-all-broken",
//         title: "Copy All Broken Links",
//         contexts: ["page"],
//         documentUrlPatterns: ["https://*.instructure.com/courses/*/link_validator"]
//     });
  

    chrome.contextMenus.onClicked.addListener(function(info, tab) {
        if (info.menuItemId == "copy-all-broken") {
            chrome.tabs.query({
                "active": true,
                "currentWindow": true
            }, function (tabs) {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['contentScript.js']
                });
            });
        }
    });
//}






// let PageUrls = [];
// let BrokenLinks = [];
// let Titles = [];


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


  
       function copyAllBrokenLinksCM() {
       chrome.contextMenus.create({
             id: "copy-all-broken",
             title: "Copy All Broken Links",
             contexts: ["page"],
             documentUrlPatterns: ["https://*.instructure.com/courses/*/link_validator"]
         });
        }



// Initialize context menus
copyAllBrokenLinksCM();




//}});
  




