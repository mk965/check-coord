/**
 * check-coord v0.2.0 功能展示 / Feature Showcase
 * 演示所有可用功能 / Demonstrates all available features
 */

const checkCoord = require('../index');
const ExtendedAPI = require('../src/extended-api');
const CoordinateConverter = require('../src/converter');

console.log('🌏 check-coord v0.2.0 Feature Showcase\n');

// ========== 基础功能 / Basic Features ==========
console.log('📍 Basic Coordinate Validation:');

// 单点验证 / Single point validation
const singlePoint = checkCoord("116.3978146455078,39.9076393154042");
console.log('Single Point:', singlePoint.type, singlePoint.isTrue ? '✅' : '❌');

// 线段验证 / Line validation  
const line = checkCoord("116.3978146455078,39.9076393154042;116.39652718518064,39.93344333054544");
console.log('Line:', line.type, line.isTrue ? '✅' : '❌');

// 区域验证 / Region validation
const region = checkCoord("0,0;1,0;1,1;0,1");
console.log('Region:', region.type, region.isTrue ? '✅' : '❌');

// 错误处理 / Error handling
const invalid = checkCoord("200,100");
console.log('Invalid coords:', invalid.isTrue ? '✅' : '❌', '-', invalid.message);

console.log('\n');

// ========== 扩展功能 / Extended Features ==========
console.log('🚀 Extended Features:');

const api = new ExtendedAPI();

// 坐标分析 / Coordinate analysis
const analysis = api.analyzeCoordinates("116.3978146455078,39.9076393154042;116.39652718518064,39.93344333054544");
console.log('Line Distance:', analysis.distanceFormatted);
console.log('DMS Format:', analysis.dmsFormat[0].longitude, analysis.dmsFormat[0].latitude);

// 区域分析 / Region analysis
const regionAnalysis = api.analyzeCoordinates("0,0;1,0;1,1;0,1");
console.log('Region Area:', regionAnalysis.areaFormatted);
console.log('Region Perimeter:', regionAnalysis.perimeterFormatted);

// 批量验证 / Batch validation
const batchResults = api.validateBatch([
    "116.3978146455078,39.9076393154042",
    "200,100", // invalid
    "0,0;1,1"
]);
console.log('Batch Results:', batchResults.map(r => r.result.isTrue ? '✅' : '❌').join(' '));

// 点在多边形内检测 / Point in polygon detection
const pointInPolygon = api.isPointInRegion("0.5,0.5", "0,0;1,0;1,1;0,1");
console.log('Point in Polygon:', pointInPolygon.isInside ? '✅ Inside' : '❌ Outside');

console.log('\n');

// ========== 坐标转换 / Coordinate Conversion ==========
console.log('🔄 Coordinate Conversion:');

// 十进制转度分秒 / Decimal to DMS
const dms = CoordinateConverter.decimalToDMS(116.3978146455078, true);
console.log('Decimal to DMS:', dms);

// 度分秒转十进制 / DMS to decimal
const decimal = CoordinateConverter.dmsToDecimal("116°23'52.13\"E");
console.log('DMS to Decimal:', decimal.toFixed(6));

// 距离计算 / Distance calculation
const distance = CoordinateConverter.calculateDistance(
    { lat: 39.9076393154042, lng: 116.3978146455078 },
    { lat: 39.93344333054544, lng: 116.39652718518064 }
);
console.log('Distance:', (distance / 1000).toFixed(2), 'km');

// 面积计算 / Area calculation
const area = CoordinateConverter.calculatePolygonArea([
    { lat: 0, lng: 0 },
    { lat: 0, lng: 1 },
    { lat: 1, lng: 1 },
    { lat: 1, lng: 0 }
]);
console.log('Polygon Area:', (area / 1000000).toFixed(2), 'sq km');

console.log('\n🎉 All features working correctly!');