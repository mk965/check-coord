# check-coord 🌏 [![](https://img.shields.io/npm/v/check-coord.svg?style=flat)](https://www.npmjs.com/package/check-coord)

Easy to use, coordinate format checking tool.

[![](https://img.shields.io/github/stars/mk965/check-coord?style=social)](https://github.com/mk965/check-coord)

[📥 Install](#install)

[📍 Examples](#examples)

[📐 Return](#return)


<h2 id='tags'>Install</h2>

```shell
npm install check-coord
```

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
