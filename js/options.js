document.addEventListener('DOMContentLoaded', function() {
    let selector = document.getElementById('export-format');

    chrome.storage.local.get(['exportFormat'], (result) => {
        if (result.exportFormat) {
            selector.value = result.exportFormat;
        }
    });

    selector.addEventListener('change', function() {
        let value = selector.value;
        chrome.storage.local.set({ exportFormat: value })
    });
});