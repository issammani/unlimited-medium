const MEDIUM_URL = /.*:\/\/.*medium.com\/.*/;

let CURRENT_TAB = {url: '', id: 0};

// Clear all cookies associated with domain
// This is how medium keeps track of the monthly counter
const clearAllCookiesFromDomain = async domain => {
    const cookies = await browser.cookies.getAll({domain: '.medium.com'});
    for(let cookie of cookies){
        console.log(cookie);
        await browser.cookies.remove({name: cookie.name, url: CURRENT_TAB.url});
    }
};

const handlePageActionClick = async () => {
    console.log('Clicky');
    await clearAllCookiesFromDomain('.medium');
    await browser.tabs.reload(CURRENT_TAB.id);
};

const handleActivated = async activeInfo => {
    // Get active tab
    const tab = await browser.tabs.get(activeInfo.tabId);

    // Check if active tab matches medium url
    if(MEDIUM_URL.test(tab.url)){
        // Keep track of the current tab
        CURRENT_TAB.url = tab.url;
        CURRENT_TAB.id = tab.id;
        // Activate pageAction icon
        await browser.pageAction.show(tab.id);
        // Attach click event listener
        browser.pageAction.onClicked.addListener(handlePageActionClick);
    }
};

// Listen for activeTab is changed
browser.tabs.onActivated.addListener(handleActivated);