/**
 * Extended functionality test cases
 */

const ExtendedCoordinateAPI = require('../src/extended-api');
const CoordinateConverter = require('../src/converter');

// 简单的测试框架
function test(description, fn) {
    try {
        fn();
        console.log(`✅ ${description}`);
    } catch (error) {
        console.error(`❌ ${description}`);
        console.error(`   错误: ${error.message}`);
    }
}

function assertTrue(condition, message = '') {
    if (!condition) {
        throw new Error(`Expected true, but got false. ${message}`);
    }
}

function assertClose(actual, expected, tolerance = 0.01, message = '') {
    if (Math.abs(actual - expected) > tolerance) {
        throw new Error(`Expected ${expected}, but got ${actual}, error exceeds ${tolerance}. ${message}`);
    }
}

console.log('🧪 Starting extended functionality tests...\n');

const api = new ExtendedCoordinateAPI();

// Test coordinate analysis functionality
test('Coordinate analysis - Single point', () => {
    const result = api.analyzeCoordinates("116.3978146455078,39.9076393154042");
    assertTrue(result.isTrue);
    assertTrue(result.dmsFormat);
    assertTrue(Array.isArray(result.dmsFormat));
    assertTrue(result.dmsFormat[0].longitude.includes('E'));
    assertTrue(result.dmsFormat[0].latitude.includes('N'));
});

test('Coordinate analysis - Line distance calculation', () => {
    const result = api.analyzeCoordinates("116.3978146455078,39.9076393154042;116.39652718518064,39.93344333054544");
    assertTrue(result.isTrue);
    assertTrue(result.type === 'line');
    assertTrue(result.distance > 0);
    assertTrue(result.distanceFormatted.includes('km') || result.distanceFormatted.includes('meters'));
});

test('Coordinate analysis - Region area calculation', () => {
    const result = api.analyzeCoordinates("0,0;1,0;1,1;0,1");
    assertTrue(result.isTrue);
    assertTrue(result.type === 'region');
    assertTrue(result.area > 0);
    assertTrue(result.perimeter > 0);
    assertTrue(result.areaFormatted.includes('sq'));
    assertTrue(result.perimeterFormatted.includes('km') || result.perimeterFormatted.includes('meters'));
});

// Test batch validation
test('Batch validation', () => {
    const coords = [
        "116.3978146455078,39.9076393154042",
        "200,39.9076393154042", // Invalid longitude
        "116.3978146455078,39.9076393154042;116.39652718518064,39.93344333054544"
    ];
    
    const results = api.validateBatch(coords);
    assertTrue(results.length === 3);
    assertTrue(results[0].result.isTrue);
    assertTrue(!results[1].result.isTrue);
    assertTrue(results[2].result.isTrue);
});

// Test point in polygon
test('Point inside polygon detection', () => {
    const point = "0.5,0.5";
    const polygon = "0,0;1,0;1,1;0,1"; // Unit square
    
    const result = api.isPointInRegion(point, polygon);
    assertTrue(result.isValid);
    assertTrue(result.isInside);
});

test('Point outside polygon detection', () => {
    const point = "2,2";
    const polygon = "0,0;1,0;1,1;0,1"; // Unit square
    
    const result = api.isPointInRegion(point, polygon);
    assertTrue(result.isValid);
    assertTrue(!result.isInside);
});

// Test coordinate converter
test('Decimal to degrees-minutes-seconds', () => {
    const dms = CoordinateConverter.decimalToDMS(116.3978146455078, true);
    assertTrue(dms.includes('°'));
    assertTrue(dms.includes("'"));
    assertTrue(dms.includes('"'));
    assertTrue(dms.includes('E'));
});

test('Degrees-minutes-seconds to decimal', () => {
    const decimal = CoordinateConverter.dmsToDecimal("116°23'52.13\"E");
    assertClose(decimal, 116.3978, 0.01);
});

// Test distance calculation
test('Distance calculation', () => {
    const point1 = { lat: 0, lng: 0 };
    const point2 = { lat: 0, lng: 1 };
    const distance = CoordinateConverter.calculateDistance(point1, point2);
    // Approximately 111km (Earth circumference/360)
    assertClose(distance, 111319, 1000);
});

// Test polygon area calculation
test('Polygon area calculation', () => {
    // Unit square (approximately 111km x 111km)
    const coords = [
        { lat: 0, lng: 0 },
        { lat: 1, lng: 0 },
        { lat: 1, lng: 1 },
        { lat: 0, lng: 1 }
    ];
    const area = CoordinateConverter.calculatePolygonArea(coords);
    assertTrue(area > 10000000000); // Greater than 10 billion square meters
});

console.log('\n🎉 Extended functionality tests completed!');