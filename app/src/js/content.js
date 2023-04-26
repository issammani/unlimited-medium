import browser from "webextension-polyfill";

// Wait for page to load
window.addEventListener("load", () => {
    // The three websites I tested on, all loaded js files from
    // either https://cdn-static-1.medium.com/*
    // or https://cdn-client.medium.com/*
    // Other extensions keep track of all self hosted blogs
    // I find this solution to be more robust, general and requires less oversight

    const SCRIPT_SRC_REGEX = /https?:\/\/cdn-(?:static|client)(?:-\d)?\.medium\.com\//;
    // const MEDIUM_URL = /.*:\/\/.*medium.com\/.*/;
    // Get all scripts
    const scripts = document.querySelectorAll("script");

    // Filter out only the ones we need
    const mediumScripts = [...scripts].filter((script) =>
        SCRIPT_SRC_REGEX.test(script.src)
    );

    // Send message to backend if such a script is found
    if (
        mediumScripts.length > 0 ||
        SCRIPT_SRC_REGEX.test(window.location.hostname)
    ) {
        browser.runtime.sendMessage({
            type: "medium-blog",
            data: { domain: window.location.host, url: window.location.origin },
        });
    } else {
        browser.runtime.sendMessage({ type: "not-medium-blog" });
    }
});
