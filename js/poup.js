document.addEventListener('DOMContentLoaded',function() {
    let button = document.getElementById('save-all');
    button.addEventListener('click', function() {
        chrome.storage.local.get(['savedTexts'], (result) => {
            let items = result.savedTexts || [];

            let markdown = items.map(item => {
                return `### ${item.date}\n**URL:** ${item.url}\n\n${item.text}`;
            }).join('\n---\n');

            let blob = new Blob([markdown], { type: 'text/markdown' });
            let url = URL.createObjectURL(blob);
    
            chrome.downloads.download({
                url: url,
                filename: 'saved-notes.md'
            }, () => {
                URL.revokeObjectURL(url);
            });
        });
    })
});