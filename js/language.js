

function changeLanguage(language) {
    if (language === 'cn') {
        language = 'zh-CN';
    } else if (['en', 'ar', 'es', 'id', 'pt', 'ru', 'zh-CN', 'zh-TW'].indexOf(language) === -1) {
        language = 'en';
    }
    localStorage.setItem('language', language);

    document.dispatchEvent(new Event('languageChange'));
}

function loadTranslations() {

    let language = localStorage.getItem('language');
    if (language === 'cn') {
        language = 'zh-CN';
    } else if (['en', 'ar', 'es', 'id', 'pt', 'ru', 'zh-CN', 'zh-TW'].indexOf(language) === -1) {
        language = 'en';
    }
    

    // console.log("loadTranslations - language = ",language);
    fetch(`translations/${language}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => applyTranslations(data))
        .catch(error => console.error('Error loading translations:', error));
}

function applyTranslations(translations) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[key]) {
            element.innerHTML = translations[key];
        }
    });
}

async function fetchTranslations() {
    let language = localStorage.getItem('language');
    if (language === 'cn') {
        language = 'zh-CN';
    } else if (['en', 'ar', 'es', 'id', 'pt', 'ru', 'zh-CN', 'zh-TW'].indexOf(language) === -1) {
        language = 'en';
    }

    try {
        const response = await fetch(`translations/${language}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading translations:', error);
        return {};
    }
}
