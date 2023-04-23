# check-coord 🌏 [![](https://img.shields.io/npm/v/check-coord.svg?style=flat)](https://www.npmjs.com/package/check-coord)

Easy to use, coordinate format checking tool.
[![](https://img.shields.io/github/stars/mk965/check-coord?style=social)](https://github.com/mk965/check-coord)

[📥 Install](#install)

[🎮 Usage](#Usage)

[📍 Examples](#examples)

[📐 Return](#return)


<h2 id='tags'>Install</h2>

```shell
npm install check-coord
```

<h2 id='Usage'>Usage</h2>

1. Import the module: `const checkCoord = require('check-coord');`

2. Call the function: `checkCoord(inpCoord)`, where `inpCoord` is the string to be checked.

3. Return value: The function will return an object with the following properties:
    - `isTrue`: Boolean value indicating whether the input string matches the pattern of latitude and longitude coordinates.
    - `type`: Type of the coordinate(s), which can be 'spot', 'line', or 'region'.
    - `spots`: Array of coordinate objects; only exists when type is 'spot' or 'line'.
regionSpot: Number of points in the polygonal region; only exists when type is 'region'.
    - `message`: Error message; only exists when isTrue is false.

<h2 id='tags'>Examples</h2>

```js
import checkCoord from "check-coord";

// Coordinate point
checkCoord("116.3978146455078,39.9076393154042");

// Coordinate line
checkCoord("116.3978146455078,39.9076393154042; 116.39652718518064,39.93344333054544");

// Coordinate region
checkCoord("116.3978146455078,39.9076393154042; 116.39652718518064,39.93344333054544; 116.41712655041502,39.93370658670286");
```

<h2 id='tags'>Return</h2>

```js
// Coordinate point
{
    isTrue: true,   // The coordinate are correct.
    type: 'spot',   // The coordinate type is 'point'.
    // Coordinate array.
    spots: [
        {
            lng: '116.3978146455078',   // longitude
            lat: '39.9076393154042'     // latitude
        }
    ]
}

// Coordinate line
{
    isTrue: true,
    type: 'line',
    spots: [
        { 
            lng: '116.3978146455078', 
            lat: '39.9076393154042' 
        },
        { 
            lng: '116.39652718518064', 
            lat: '39.93344333054544' 
        }
    ]
}

// Coordinate region
{
    isTrue: true,
    type: 'region',
    spots: [
        { 
            lng: '116.3978146455078', 
            lat: '39.9076393154042' 
        },
        { 
            lng: '116.39652718518064', 
            lat: '39.93344333054544' 
        },
        { 
            lng: '116.41712655041502', 
            lat: '39.93370658670286' 
        }
    ],
    regionSpot: 3   // Number of area points.
}

```
