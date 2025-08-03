/**
 * Basic test cases
 */

const checkCoord = require('../index');

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

function assertEqual(actual, expected, message = '') {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(`Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}. ${message}`);
    }
}

function assertTrue(condition, message = '') {
    if (!condition) {
        throw new Error(`Expected true, but got false. ${message}`);
    }
}

console.log('🧪 Starting tests...\n');

// Test single point coordinate
test('Single point coordinate validation', () => {
    const result = checkCoord("116.3978146455078,39.9076393154042");
    assertTrue(result.isTrue, 'Should validate successfully');
    assertEqual(result.type, 'spot', 'Type should be spot');
    assertEqual(result.spots.length, 1, 'Should have 1 coordinate point');
    assertEqual(result.spots[0].lng, 116.3978146455078, 'Longitude should be correct');
    assertEqual(result.spots[0].lat, 39.9076393154042, 'Latitude should be correct');
});

// Test line coordinate
test('Line coordinate validation', () => {
    const result = checkCoord("116.3978146455078,39.9076393154042;116.39652718518064,39.93344333054544");
    assertTrue(result.isTrue);
    assertEqual(result.type, 'line');
    assertEqual(result.spots.length, 2);
});

// Test region coordinate
test('Region coordinate validation', () => {
    const result = checkCoord("116.3978146455078,39.9076393154042;116.39652718518064,39.93344333054544;116.41712655041502,39.93370658670286");
    assertTrue(result.isTrue);
    assertEqual(result.type, 'region');
    assertEqual(result.spots.length, 3);
    assertEqual(result.regionSpot, 3);
});

// Test error inputs
test('Empty input test', () => {
    try {
        checkCoord("");
        throw new Error('Should throw an error');
    } catch (error) {
        assertTrue(error.message.includes('At least one parameter'), 'Error message should be correct');
    }
});

test('Non-string input test', () => {
    try {
        checkCoord(123);
        throw new Error('Should throw an error');
    } catch (error) {
        assertTrue(error.message.includes('string'), 'Error message should be correct');
    }
});

// Test invalid coordinates
test('Invalid longitude test', () => {
    const result = checkCoord("200,39.9076393154042");
    assertTrue(!result.isTrue, 'Should fail validation');
    assertTrue(result.message.includes('longitude'), 'Error message should contain longitude');
});

test('Invalid latitude test', () => {
    const result = checkCoord("116.3978146455078,100");
    assertTrue(!result.isTrue, 'Should fail validation');
    assertTrue(result.message.includes('latitude'), 'Error message should contain latitude');
});

// Test boundary values
test('Boundary test - Maximum longitude', () => {
    const result = checkCoord("180,0");
    assertTrue(result.isTrue, '180 degrees longitude should be valid');
});

test('Boundary test - Minimum longitude', () => {
    const result = checkCoord("-180,0");
    assertTrue(result.isTrue, '-180 degrees longitude should be valid');
});

test('Boundary test - Maximum latitude', () => {
    const result = checkCoord("0,90");
    assertTrue(result.isTrue, '90 degrees latitude should be valid');
});

test('Boundary test - Minimum latitude', () => {
    const result = checkCoord("0,-90");
    assertTrue(result.isTrue, '-90 degrees latitude should be valid');
});

console.log('\n🎉 Tests completed!');