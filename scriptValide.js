function regxpText() {
    let str = document.querySelector('.text').value;
    let regexpAllPoints = new RegExp(/[\'\‘\’]/, 'gm');
    let regexpReturn = /\b\"\b/gm;
    let newstr = str.replace(regexpAllPoints, '"');
    newstr = newstr.replace(regexpReturn, '\'');
    document.querySelector('.text-done').value = newstr;
}
document.querySelector('.text').addEventListener("keyup", regxpText);