/**
 * Coordinate Validator
 * @Author: Mencre
 * @Description: Coordinate format validation and parsing
 */

class CoordinateValidator {
    constructor() {
        // Longitude range: -180 to 180
        this.LONGITUDE_REGEX = /^[-+]?((1[0-7][0-9](\.\d+)?)|([1-9][0-9](\.\d+)?)|([0-9](\.\d+)?)|180)$/;
        // Latitude range: -90 to 90  
        this.LATITUDE_REGEX = /^[-+]?(([1-8][0-9](\.\d+)?)|([0-9](\.\d+)?)|90)$/;
    }

    /**
     * Validate single coordinate point
     * @param {string} coordStr - Coordinate string in format: "longitude,latitude"
     * @returns {object} Validation result
     */
    validateSingleCoordinate(coordStr) {
        if (!coordStr || typeof coordStr !== 'string') {
            return {
                isValid: false,
                error: 'Coordinate cannot be empty and must be a string'
            };
        }

        const parts = coordStr.split(',');
        if (parts.length !== 2) {
            return {
                isValid: false,
                error: 'Invalid coordinate format, should be "longitude,latitude"'
            };
        }

        const [lonStr, latStr] = parts.map(p => p.trim());
        const longitude = parseFloat(lonStr);
        const latitude = parseFloat(latStr);

        // Validate longitude
        if (!this.LONGITUDE_REGEX.test(lonStr) || isNaN(longitude)) {
            return {
                isValid: false,
                error: `Invalid longitude format: ${lonStr}, should be between -180 and 180`
            };
        }

        // Validate latitude
        if (!this.LATITUDE_REGEX.test(latStr) || isNaN(latitude)) {
            return {
                isValid: false,
                error: `Invalid latitude format: ${latStr}, should be between -90 and 90`
            };
        }

        return {
            isValid: true,
            coordinate: {
                longitude: longitude,
                latitude: latitude,
                // Keep backward compatibility
                lng: longitude,
                lat: latitude
            }
        };
    }

    /**
     * Validate coordinate string
     * @param {string} inputCoord - Input coordinate string
     * @returns {object} Validation result
     */
    validate(inputCoord) {
        if (!inputCoord) {
            throw new Error('At least one parameter is required!');
        }

        if (typeof inputCoord !== 'string') {
            throw new TypeError('Parameter should be of type "string"!');
        }

        // Clean whitespace and split coordinates
        const cleanCoord = inputCoord.replace(/\s/g, '');
        let coordArray = cleanCoord.split(';');

        // Remove empty strings
        coordArray = coordArray.filter(coord => coord.length > 0);

        if (coordArray.length === 0) {
            return {
                isTrue: false,
                message: 'No valid coordinate data found'
            };
        }

        const result = {
            isTrue: true,
            type: this.getCoordinateType(coordArray.length),
            spots: []
        };

        if (result.type === 'region') {
            result.regionSpot = coordArray.length;
        }

        // Validate each coordinate point
        for (let i = 0; i < coordArray.length; i++) {
            const validation = this.validateSingleCoordinate(coordArray[i]);
            
            if (!validation.isValid) {
                return {
                    isTrue: false,
                    message: `Error in coordinate point ${i + 1}: ${validation.error}`,
                    errorIndex: i,
                    errorCoordinate: coordArray[i]
                };
            }

            result.spots.push(validation.coordinate);
        }

        return result;
    }

    /**
     * Determine coordinate type based on point count
     * @private
     */
    getCoordinateType(count) {
        if (count === 1) return 'spot';
        if (count === 2) return 'line';
        return 'region';
    }
}

module.exports = CoordinateValidator;