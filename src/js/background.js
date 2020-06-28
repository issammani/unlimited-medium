const MEDIUM_URL = /.*:\/\/.*medium.com\/.*/;

const handlePageActionClick = () => {
    // DO SOMETHING...
};

browser.tabs.onActivated.addListener( async activeInfo => {
    // Get active tab
    const tab = await browser.tabs.get(activeInfo.tabId);
        
    // Check if active tab matches medium url
    if(MEDIUM_URL.test(tab.url)){
        // Activate pageAction icon
        await browser.pageAction.show(tab.id);
        // Attach click event listener
        browser.pageAction.onClicked.addListener(handlePageActionClick);
    }
});