function loadTexts() {
    chrome.storage.local.get(['savedTexts'], (result) => {
        const textarea = document.getElementById('text-area');
        let items = result.savedTexts || [];
            
        let markdown = items.map(item => {
            return `### ${item.date}\n**URL:** ${item.url}\n\n${item.text}`;
        }).join('\n---\n');
    
        if (result.savedTexts) {
            textarea.value = markdown;
        } else {
            textarea.value = '';
        };
    });
};

document.addEventListener('DOMContentLoaded', loadTexts);

chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local' && changes.savedTexts) {
        loadTexts();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    function insertMarkdown(before, after = '') {
        let textarea = document.getElementById('text-area');
        let start = textarea.selectionStart;
        let end = textarea.selectionEnd;
        let text = textarea.value;
        
        let selected = text.slice(start, end);
        let replacement = before + selected + after;
        
        textarea.setRangeText(replacement, start, end, 'end');
        textarea.focus();
    }
    
    document.querySelectorAll('[data-format]').forEach(button => {
        button.addEventListener('click', () => {
            let format = button.getAttribute('data-format');
            
            if (format === 'bold') {
                insertMarkdown('**', '**');
            } else if (format === 'italic') {
                insertMarkdown('*', '*');
            } else if (format === 'list') {
                // пока заглушка
                console.log('list пока не работает');
            }
        });
    });
});