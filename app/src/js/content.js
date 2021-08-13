import browser from "webextension-polyfill";

// Wait for page to load
window.addEventListener("load", () => {
    // The three websites I tested on, all loaded js files from
    // either https://cdn-static-1.medium.com/*
    // or https://cdn-client.medium.com/*
    // Other extensions keep track of all self hosted blogs
    // I find this solution to be more robust, general and requires less oversight

    // The site:
    // https://betterprogramming.pub/software-engineers-avoid-being-the-critical-person-on-your-team-b94494f28154
    // loads from https://cdn.optimizely.com/js/16180790160.js
    // so added a quick regex modification to capture the pattern

    const SCRIPT_SRC_REGEX = /https?:\/\/cdn-(?:static|client)(?:-\d)?\.medium\.com\/|https?:\/\/cdn.optimizely\.com\/js\/\d+\.js/;
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
        console.log("Is a medium blog !");
        browser.runtime.sendMessage({
            type: "medium-blog",
            data: { domain: window.location.host, url: window.location.origin },
        });
    } else {
        console.log("Not a medium blog :( ");
        browser.runtime.sendMessage({ type: "not-medium-blog" });
    }
});
