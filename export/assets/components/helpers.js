export const importStyle = function(href) {
    const el = document.createElement('style');
    el.innerHTML = `@import url('${encodeURI(href)}')`
    return el;
}

export const linkStyle = function(href) {
    const el = document.createElement('link');
    el.href = href;
    el.rel = 'stylesheet';
    return el;
}