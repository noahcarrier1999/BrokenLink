

export function copyAllBrokenLinks () {


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

}