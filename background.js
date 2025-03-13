chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    chrome.storage.sync.get(['swaps'], (result) => {
      const swaps = result.swaps || [];
      const currentUrl = tab.url;

      for (const swap of swaps) {
        if (currentUrl.startsWith(swap.from)) {
          const newUrl = currentUrl.replace(swap.from, swap.to);
          chrome.tabs.update(tabId, { url: newUrl });
          break;
        }
      }
    });
  }
});
