/*
 * @Author: Mencre
 * @LastEditors: Mencre
 * @email: mencre@163.com
 * @Date: 2020-11-11 09:39:09
 * @LastEditTime: 2024-01-15 10:00:00
 * @Description: check-coord - Coordinate format validation tool
 */

const CoordinateValidator = require('./src/validator');

// Create validator instance
const validator = new CoordinateValidator();

/**
 * Check if coordinate format is correct
 * @param {string} inpCoord - Input coordinate string
 * @returns {object} Validation result
 */
module.exports = (inpCoord) => {
    return validator.validate(inpCoord);
};

// Export validator class for advanced users
module.exports.CoordinateValidator = CoordinateValidator;