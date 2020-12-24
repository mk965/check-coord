/*
 * @Author: Mencre
 * @LastEditors: Mencre
 * @email: mencre@163.com
 * @Date: 2020-11-11 09:39:09
 * @LastEditTime: 2020-12-22 11:34:37
 * @Description: check-coord 
 */
module.exports = (inpCoord) => {
    if (!inpCoord) {
        throw Error('There is at least one parameter!')
    }
    if (Object.prototype.toString.call(inpCoord) !== '[object String]') {
        throw TypeError('Parameter should be of type "string"!')
    }
    inpCoord = inpCoord.replace(/\s/g, "");
    let result = { isTrue: true, type: 'spot', spots: [] }
    let coordArr = inpCoord.split(';');

    coordArr[coordArr.length - 1] === "" ? coordArr.pop() : '';

    coordArr.length === 2 ? result['type'] = 'line' : '';

    if (coordArr.length > 2) {
        result['type'] = 'region';
        result['regionSpot'] = coordArr.length;
    }

    let reg = /^[-\+]?((1[0-7][0-9](\.\d+)?)|([1-9][0-9](\.\d+)?)|([0-9](\.\d+)?)|180)\s*\,\s*[-\+]?(([1-8][0-9](\.\d+)?)|([0-9](\.\d+)?)|90)$/;
    coordArr.forEach(coordItem => {
        if (!coordItem.match(reg)) {
            console.log(coordItem)
            result['isTrue'] = false;
            result['message'] = 'Coordinate error.'
        }
        result['spots'].push({
            'lon': coordItem.split(',')[0],
            'lng': coordItem.split(',')[0],
            'lat': coordItem.split(',')[1]
        })
    });

    return result;
}