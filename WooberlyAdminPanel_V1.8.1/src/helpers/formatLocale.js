export function formatLocale(locale) {
    const localeDict = {
        'en-US': 'English',
        'es': 'Español',
        'fr-FR': 'Français',
        'ru-RU': 'Pусский',
        'ja-JP': '日本人',
        'id-ID': 'Indonesia',
        'hr-HR': 'Croatian',
        'zh-CN': '中文',
        'sv-SE': 'Svenska'
    };

    return localeDict[locale] || 'English';
}