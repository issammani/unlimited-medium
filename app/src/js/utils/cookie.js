import browser from "webextension-polyfill";

// Clear all cookies associated with domain
// This is how medium keeps track of the monthly counter
const clearAllCookiesFromDomain = async (domain, url) => {
    const cookies = await browser.cookies.getAll({ domain });
    for (let cookie of cookies) {
        await browser.cookies.remove({ name: cookie.name, url });
    }
};

export default clearAllCookiesFromDomain;