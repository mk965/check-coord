/**
 * Extended API - Provides additional coordinate processing features
 */

const CoordinateValidator = require('./validator');
const CoordinateConverter = require('./converter');

class ExtendedCoordinateAPI {
    constructor() {
        this.validator = new CoordinateValidator();
    }

    /**
     * Validate and analyze coordinates
     * @param {string} coords - Coordinate string
     * @returns {object} Detailed validation and analysis result
     */
    analyzeCoordinates(coords) {
        const validation = this.validator.validate(coords);
        
        if (!validation.isTrue) {
            return validation;
        }

        const result = { ...validation };
        
        // Add format conversion
        result.dmsFormat = result.spots.map(spot => ({
            longitude: CoordinateConverter.decimalToDMS(spot.lng, true),
            latitude: CoordinateConverter.decimalToDMS(spot.lat, false)
        }));

        // If it's a line, calculate distance
        if (result.type === 'line') {
            result.distance = CoordinateConverter.calculateDistance(
                result.spots[0], 
                result.spots[1]
            );
            result.distanceFormatted = this.formatDistance(result.distance);
        }

        // If it's a region, calculate area and perimeter
        if (result.type === 'region') {
            result.area = CoordinateConverter.calculatePolygonArea(result.spots);
            result.areaFormatted = this.formatArea(result.area);
            
            // Calculate perimeter
            result.perimeter = this.calculatePerimeter(result.spots);
            result.perimeterFormatted = this.formatDistance(result.perimeter);
        }

        return result;
    }

    /**
     * Batch validate coordinates
     * @param {Array} coordsList - Array of coordinate strings
     * @returns {Array} Array of validation results
     */
    validateBatch(coordsList) {
        if (!Array.isArray(coordsList)) {
            throw new Error('Input must be an array');
        }

        return coordsList.map((coords, index) => {
            try {
                return {
                    index,
                    input: coords,
                    result: this.validator.validate(coords)
                };
            } catch (error) {
                return {
                    index,
                    input: coords,
                    result: {
                        isTrue: false,
                        message: error.message
                    }
                };
            }
        });
    }

    /**
     * Check if point is within specified region
     * @param {string} pointCoords - Point coordinate string
     * @param {string} regionCoords - Region coordinate string
     * @returns {object} Check result
     */
    isPointInRegion(pointCoords, regionCoords) {
        const pointResult = this.validator.validate(pointCoords);
        const regionResult = this.validator.validate(regionCoords);

        if (!pointResult.isTrue) {
            return {
                isValid: false,
                error: `Invalid point coordinates: ${pointResult.message}`
            };
        }

        if (!regionResult.isTrue) {
            return {
                isValid: false,
                error: `Invalid region coordinates: ${regionResult.message}`
            };
        }

        if (pointResult.type !== 'spot') {
            return {
                isValid: false,
                error: 'First parameter must be a single point coordinate'
            };
        }

        if (regionResult.type !== 'region') {
            return {
                isValid: false,
                error: 'Second parameter must be region coordinates'
            };
        }

        const isInside = CoordinateConverter.isPointInPolygon(
            pointResult.spots[0],
            regionResult.spots
        );

        return {
            isValid: true,
            isInside,
            point: pointResult.spots[0],
            region: regionResult.spots
        };
    }

    /**
     * Calculate polygon perimeter
     * @private
     */
    calculatePerimeter(coordinates) {
        let perimeter = 0;
        for (let i = 0; i < coordinates.length; i++) {
            const current = coordinates[i];
            const next = coordinates[(i + 1) % coordinates.length];
            perimeter += CoordinateConverter.calculateDistance(current, next);
        }
        return perimeter;
    }

    /**
     * Format distance
     * @private
     */
    formatDistance(meters) {
        if (meters < 1000) {
            return `${meters.toFixed(2)} meters`;
        } else if (meters < 1000000) {
            return `${(meters / 1000).toFixed(2)} km`;
        } else {
            return `${(meters / 1000000).toFixed(2)} million km`;
        }
    }

    /**
     * Format area
     * @private
     */
    formatArea(squareMeters) {
        if (squareMeters < 10000) {
            return `${squareMeters.toFixed(2)} sq meters`;
        } else if (squareMeters < 1000000) {
            return `${(squareMeters / 10000).toFixed(2)} hectares`;
        } else {
            return `${(squareMeters / 1000000).toFixed(2)} sq km`;
        }
    }
}

module.exports = ExtendedCoordinateAPI;