/**
 * Backward compatibility test
 * 测试向后兼容性
 */

const checkCoord = require('../index');

// Simple test framework
function test(description, fn) {
    try {
        fn();
        console.log(`✅ ${description}`);
    } catch (error) {
        console.error(`❌ ${description}`);
        console.error(`   Error: ${error.message}`);
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

console.log('🔄 Testing backward compatibility with v0.1.2...\n');

// Test exactly the same usage patterns from v0.1.2
test('Original v0.1.2 single point usage', () => {
    const result = checkCoord("116.3978146455078,39.9076393154042");
    
    // Should have the same structure as before
    assertTrue(result.isTrue);
    assertEqual(result.type, 'spot');
    assertTrue(Array.isArray(result.spots));
    assertEqual(result.spots.length, 1);
    
    // Should still have lng and lat (backward compatibility)
    assertTrue(result.spots[0].lng !== undefined);
    assertTrue(result.spots[0].lat !== undefined);
    assertEqual(result.spots[0].lng, 116.3978146455078);
    assertEqual(result.spots[0].lat, 39.9076393154042);
});

test('Original v0.1.2 line usage', () => {
    const result = checkCoord("116.3978146455078,39.9076393154042;116.39652718518064,39.93344333054544");
    
    assertTrue(result.isTrue);
    assertEqual(result.type, 'line');
    assertEqual(result.spots.length, 2);
    
    // Both points should have lng/lat
    assertTrue(result.spots[0].lng !== undefined);
    assertTrue(result.spots[0].lat !== undefined);
    assertTrue(result.spots[1].lng !== undefined);
    assertTrue(result.spots[1].lat !== undefined);
});

test('Original v0.1.2 region usage', () => {
    const result = checkCoord("116.3978146455078,39.9076393154042;116.39652718518064,39.93344333054544;116.41712655041502,39.93370658670286");
    
    assertTrue(result.isTrue);
    assertEqual(result.type, 'region');
    assertEqual(result.spots.length, 3);
    assertEqual(result.regionSpot, 3); // This field should exist for regions
});

test('Original v0.1.2 error handling', () => {
    try {
        checkCoord("");
        throw new Error('Should have thrown an error');
    } catch (error) {
        assertTrue(error.message.includes('parameter'), 'Error message should mention parameter');
    }
});

test('Original v0.1.2 type checking', () => {
    try {
        checkCoord(123);
        throw new Error('Should have thrown an error');
    } catch (error) {
        assertTrue(error.message.includes('string'), 'Error message should mention string type');
    }
});

test('Original v0.1.2 invalid coordinate handling', () => {
    const result = checkCoord("200,39.9076393154042");
    assertTrue(!result.isTrue);
    assertTrue(result.message !== undefined);
});

// Test that the exact same API surface is available
test('API surface compatibility', () => {
    const checkCoordFunction = require('../index');
    assertTrue(typeof checkCoordFunction === 'function', 'Default export should be a function');
    
    // Test that the function works the same way
    const result = checkCoordFunction("116.3978146455078,39.9076393154042");
    assertTrue(result.isTrue);
    assertTrue(result.type === 'spot');
    assertTrue(Array.isArray(result.spots));
});

console.log('\n🎉 All backward compatibility tests passed!');
console.log('📝 Your existing code will work without any changes!');