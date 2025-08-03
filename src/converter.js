/**
 * Coordinate Converter
 * Supports coordinate conversion between different formats
 */

class CoordinateConverter {
    /**
     * Convert decimal degrees to degrees-minutes-seconds
     * @param {number} decimal - Decimal degrees
     * @param {boolean} isLongitude - Whether it's longitude
     * @returns {string} DMS format string
     */
    static decimalToDMS(decimal, isLongitude = true) {
        const absolute = Math.abs(decimal);
        const degrees = Math.floor(absolute);
        const minutesFloat = (absolute - degrees) * 60;
        const minutes = Math.floor(minutesFloat);
        const seconds = (minutesFloat - minutes) * 60;
        
        let direction;
        if (isLongitude) {
            direction = decimal >= 0 ? 'E' : 'W';
        } else {
            direction = decimal >= 0 ? 'N' : 'S';
        }
        
        return `${degrees}°${minutes}'${seconds.toFixed(2)}"${direction}`;
    }

    /**
     * Convert degrees-minutes-seconds to decimal degrees
     * @param {string} dms - DMS format string
     * @returns {number} Decimal degrees
     */
    static dmsToDecimal(dms) {
        const regex = /(\d+)[°]\s*(\d+)[′']\s*([\d.]+)[″"]\s*([NSEW])/i;
        const match = dms.match(regex);
        
        if (!match) {
            throw new Error('Invalid DMS format');
        }
        
        const [, degrees, minutes, seconds, direction] = match;
        let decimal = parseInt(degrees) + parseInt(minutes) / 60 + parseFloat(seconds) / 3600;
        
        if (direction.toUpperCase() === 'S' || direction.toUpperCase() === 'W') {
            decimal = -decimal;
        }
        
        return decimal;
    }

    /**
     * Calculate distance between two points (using Haversine formula)
     * @param {object} point1 - First point {lat, lng}
     * @param {object} point2 - Second point {lat, lng}
     * @returns {number} Distance in meters
     */
    static calculateDistance(point1, point2) {
        const R = 6371000; // Earth radius in meters
        const lat1Rad = point1.lat * Math.PI / 180;
        const lat2Rad = point2.lat * Math.PI / 180;
        const deltaLatRad = (point2.lat - point1.lat) * Math.PI / 180;
        const deltaLngRad = (point2.lng - point1.lng) * Math.PI / 180;

        const a = Math.sin(deltaLatRad / 2) * Math.sin(deltaLatRad / 2) +
                 Math.cos(lat1Rad) * Math.cos(lat2Rad) *
                 Math.sin(deltaLngRad / 2) * Math.sin(deltaLngRad / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }

    /**
     * Calculate polygon area (using Shoelace formula)
     * @param {Array} coordinates - Array of coordinate points [{lat, lng}, ...]
     * @returns {number} Area in square meters
     */
    static calculatePolygonArea(coordinates) {
        if (coordinates.length < 3) {
            throw new Error('Polygon requires at least 3 points');
        }

        let area = 0;
        const n = coordinates.length;
        
        for (let i = 0; i < n; i++) {
            const j = (i + 1) % n;
            const xi = coordinates[i].lng * Math.PI / 180;
            const yi = coordinates[i].lat * Math.PI / 180;
            const xj = coordinates[j].lng * Math.PI / 180;
            const yj = coordinates[j].lat * Math.PI / 180;
            
            area += xi * yj;
            area -= xj * yi;
        }
        
        area = Math.abs(area) / 2;
        
        // Convert to square meters (approximate)
        const R = 6371000; // Earth radius
        return area * R * R;
    }

    /**
     * Check if point is inside polygon (ray casting method)
     * @param {object} point - Test point {lat, lng}
     * @param {Array} polygon - Polygon vertices [{lat, lng}, ...]
     * @returns {boolean} Whether point is inside polygon
     */
    static isPointInPolygon(point, polygon) {
        let inside = false;
        const x = point.lng;
        const y = point.lat;
        
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const xi = polygon[i].lng;
            const yi = polygon[i].lat;
            const xj = polygon[j].lng;
            const yj = polygon[j].lat;
            
            if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
                inside = !inside;
            }
        }
        
        return inside;
    }
}

module.exports = CoordinateConverter;