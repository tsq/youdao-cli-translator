exports.stringify = obj => {
    const arr = [];
    for (let key in obj) {
        const val = obj[key];
        const str = `${key}=${val}`;
        arr.push(str);
    }
    return arr.join('&');
}