//background.js
console.log('bg script loaded');

browser.runtime.onInstalled.addListener(() => {
    console.log('ext installed')
    browser.storage.local.set({ visitedSites: [] });
});

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('recieved message:', message);

    if (message.type === 'checkSite'){
        browser.storage.local.get('visitedSites', (data) => {
            const visitedSites = data.visitedSites || [];
            const isVisited = visitedSites.includes(message.url);
            console.log('Site check:', message.url, 'isVisited:', isVisited);

            if (!isVisited) {
                visitedSites.push(message.url);
                browser.storage.local.set({ visitedSites });
            }

            sendResponse({ isVisited });
        });
        return true;
    }
});