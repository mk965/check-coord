# check-coord 🌏 [![](https://img.shields.io/npm/v/check-coord.svg?style=flat)](https://www.npmjs.com/package/check-coord)

A powerful coordinate format validation, conversion and analysis tool. Supports validation and geometric calculations for point, line, and region coordinates.

[![](https://img.shields.io/github/stars/mk965/check-coord?style=social)](https://github.com/mk965/check-coord)

**Languages:** English | [中文](README_CN.md)

### 📥 Install

```shell
npm install check-coord
```

### 🎮 Usage

#### Basic Usage

```js
const checkCoord = require('check-coord');

// Validate single point
const result = checkCoord("116.3978146455078,39.9076393154042");
console.log(result);
```

#### Advanced Usage

```js
const { CoordinateValidator } = require('check-coord');
const ExtendedAPI = require('check-coord/src/extended-api');

// Use validator class directly
const validator = new CoordinateValidator();
const result = validator.validate("116.3978146455078,39.9076393154042");

// Use extended API for advanced features
const api = new ExtendedAPI();
const analysis = api.analyzeCoordinates("116.3978146455078,39.9076393154042;116.39652718518064,39.93344333054544");
```

### 📍 Examples

```js
const checkCoord = require('check-coord');

// Single coordinate point
checkCoord("116.3978146455078,39.9076393154042");

// Coordinate line (2 points)
checkCoord("116.3978146455078,39.9076393154042;116.39652718518064,39.93344333054544");

// Coordinate region (3+ points)
checkCoord("116.3978146455078,39.9076393154042;116.39652718518064,39.93344333054544;116.41712655041502,39.93370658670286");
```

### 📐 Return Values

#### Basic Validation Result

```js
// Single point
{
    isTrue: true,           // Validation result
    type: 'spot',          // Coordinate type: 'spot', 'line', or 'region'
    spots: [               // Array of coordinate objects
        {
            longitude: 116.3978146455078,  // Longitude (number)
            latitude: 39.9076393154042,    // Latitude (number)
            lng: 116.3978146455078,        // Longitude (backward compatibility)
            lat: 39.9076393154042          // Latitude (backward compatibility)
        }
    ]
}

// Line (2 points)
{
    isTrue: true,
    type: 'line',
    spots: [/* 2 coordinate objects */]
}

// Region (3+ points)
{
    isTrue: true,
    type: 'region',
    spots: [/* 3+ coordinate objects */],
    regionSpot: 3          // Number of points in the region
}

// Validation error
{
    isTrue: false,
    message: "Error in coordinate point 1: Invalid longitude format: 200, should be between -180 and 180",
    errorIndex: 0,
    errorCoordinate: "200,39.9076393154042"
}
```

### 🚀 Extended Features

The extended API provides additional functionality:

- **Format Conversion**: Convert between decimal degrees and DMS (degrees-minutes-seconds)
- **Distance Calculation**: Calculate distance between two points using Haversine formula
- **Area Calculation**: Calculate polygon area using Shoelace formula
- **Batch Validation**: Validate multiple coordinate strings at once
- **Point-in-Polygon**: Check if a point lies within a polygon region

### 🧪 Testing

```shell
npm test           # Run basic tests
npm run test:extended  # Run extended functionality tests
npm run test:all   # Run all tests
```

### 📝 Changelog

#### v0.2.0
- 🎯 Refactored code architecture for better maintainability
- 🚀 Added extended features: distance calculation, area calculation, format conversion
- ✅ Added comprehensive test coverage
- 🐛 Fixed longitude/latitude field duplication bug
- 📚 Added bilingual documentation support
- 🔄 Maintained 100% backward compatibility
