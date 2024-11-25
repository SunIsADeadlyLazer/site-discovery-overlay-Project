// popup/popup.js
document.addEventListener('DOMContentLoaded', () => {

    const sitesList = document.getElementById('sitesList');
    const clearButton = document.getElementById('clearHistory');
  
    function updateSitesList() {
      browser.storage.local.get('visitedSites', (data) => {
        sitesList.innerHTML = '';
        const sites = data.visitedSites || [];
        sites.forEach(site => {
          const div = document.createElement('div');
          div.className = 'site-entry';
          div.textContent = site;
          sitesList.appendChild(div);
        });
      });
    }
  
    clearButton.addEventListener('click', () => {
      browser.storage.local.set({ visitedSites: [] }, () => {
        updateSitesList();
      });
    });
  
    updateSitesList();
  });
  