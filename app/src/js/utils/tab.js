import browser from "webextension-polyfill";

// Reload all tabs that match a certain domain, if they exist
// This solves two problems:
// - You can't directly query tabs from domain name
// - You can't rely on tabIds because they will change
const reloadTabsIfExist = async (tabDomains) => {
    // Get all open tabs
    let tabs = await browser.tabs.query({});

    // Filter out only the ones specified by our domains
    tabs = tabs.filter((tab) =>
        tabDomains.some((tabDomain) => tab.url.includes(tabDomain))
    );
    // Reload resulting tabs
    tabs.forEach((tab) => browser.tabs.reload(tab.id));
};

export default reloadTabsIfExist;
