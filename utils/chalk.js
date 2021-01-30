// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
const colorMap = {
    cyan: 36,
    green: 32,
    magenta: 35,
    yellow: 33,
    white: 37,
    blue: 34,
    red: 31,
    gray: 90
};

module.exports = color => {
    const result = `\x1b[${colorMap[color]}m`;
    return result;
}