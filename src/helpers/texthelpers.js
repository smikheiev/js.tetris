export default class TextHelpers {
    // Public
    static getTextStyle(fontSize = 12, fontFamily = 'Verdana', fill = 0xffffff) {
        return {
            fontSize: fontSize,
            fontFamily: fontFamily,
            fill: fill
        }
    }
}
