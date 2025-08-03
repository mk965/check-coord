# check-coord 🌏 [![](https://img.shields.io/npm/v/check-coord.svg?style=flat)](https://www.npmjs.com/package/check-coord)

强大的坐标格式检查、验证和转换工具，支持点、线、区域坐标的验证和几何计算。

[![](https://img.shields.io/github/stars/mk965/check-coord?style=social)](https://github.com/mk965/check-coord)

**语言:** [English](README.md) | 中文

### 📥 安装

```shell
npm install check-coord
```

### 🎮 使用方法

#### 基础用法

```js
const checkCoord = require('check-coord');

// 验证单个坐标点
const result = checkCoord("116.3978146455078,39.9076393154042");
console.log(result);
```

#### 高级用法

```js
const { CoordinateValidator } = require('check-coord');
const ExtendedAPI = require('check-coord/src/extended-api');

// 直接使用验证器类
const validator = new CoordinateValidator();
const result = validator.validate("116.3978146455078,39.9076393154042");

// 使用扩展API获得高级功能
const api = new ExtendedAPI();
const analysis = api.analyzeCoordinates("116.3978146455078,39.9076393154042;116.39652718518064,39.93344333054544");
```

### 📍 示例

```js
const checkCoord = require('check-coord');

// 单个坐标点
checkCoord("116.3978146455078,39.9076393154042");

// 坐标线段（2个点）
checkCoord("116.3978146455078,39.9076393154042;116.39652718518064,39.93344333054544");

// 坐标区域（3个以上的点）
checkCoord("116.3978146455078,39.9076393154042;116.39652718518064,39.93344333054544;116.41712655041502,39.93370658670286");
```

### 📐 返回值

#### 基础验证结果

```js
// 单点
{
    isTrue: true,           // 验证结果
    type: 'spot',          // 坐标类型：'spot'、'line' 或 'region'
    spots: [               // 坐标对象数组
        {
            longitude: 116.3978146455078,  // 经度（数字）
            latitude: 39.9076393154042,    // 纬度（数字）
            lng: 116.3978146455078,        // 经度（向后兼容）
            lat: 39.9076393154042          // 纬度（向后兼容）
        }
    ]
}

// 线段（2个点）
{
    isTrue: true,
    type: 'line',
    spots: [/* 2个坐标对象 */]
}

// 区域（3个以上的点）
{
    isTrue: true,
    type: 'region',
    spots: [/* 3个以上的坐标对象 */],
    regionSpot: 3          // 区域中的点数
}

// 验证错误
{
    isTrue: false,
    message: "Error in coordinate point 1: Invalid longitude format: 200, should be between -180 and 180",
    errorIndex: 0,
    errorCoordinate: "200,39.9076393154042"
}
```

### 🚀 扩展功能

扩展API提供额外功能：

- **格式转换**：在十进制度数和度分秒(DMS)之间转换
- **距离计算**：使用Haversine公式计算两点间距离
- **面积计算**：使用Shoelace公式计算多边形面积
- **批量验证**：一次验证多个坐标字符串
- **点在多边形内检测**：检查点是否在多边形区域内

### 🧪 测试

```shell
npm test           # 运行基础测试
npm run test:extended  # 运行扩展功能测试
npm run test:all   # 运行所有测试
```

### 🔄 向后兼容性

v0.2.0 版本**完全兼容** v0.1.2 的所有用法，您无需修改任何现有代码即可升级。

```js
// 所有旧版本的用法都能正常工作
const checkCoord = require('check-coord');

// v0.1.2 的用法依然有效
const result = checkCoord("116.3978146455078,39.9076393154042");
console.log(result.isTrue);  // true
console.log(result.type);    // 'spot'
console.log(result.spots[0].lng); // 116.3978146455078
console.log(result.spots[0].lat); // 39.9076393154042
```

### 🆕 新功能对比

| 功能 | v0.1.2 | v0.2.0 |
|------|--------|--------|
| 坐标验证 | ✅ | ✅ 改进 |
| 错误处理 | 基础 | 🚀 详细 |
| 代码结构 | 单文件 | 🏗️ 模块化 |
| 测试覆盖 | ❌ | ✅ 完整 |
| 距离计算 | ❌ | ✅ 新增 |
| 面积计算 | ❌ | ✅ 新增 |
| 格式转换 | ❌ | ✅ 新增 |
| 批量验证 | ❌ | ✅ 新增 |
| 点在多边形内 | ❌ | ✅ 新增 |
| 双语文档 | ❌ | ✅ 新增 |

### 📝 更新日志

#### v0.2.0
- 🎯 重构代码架构，提高可维护性
- 🚀 添加扩展功能：距离计算、面积计算、格式转换
- ✅ 添加完整的测试用例
- 🐛 修复经度/纬度字段重复的bug
- 📚 提供双语文档支持
- 🔄 保持100%向后兼容性

### 📖 更多示例

查看 [examples/showcase.js](examples/showcase.js) 了解所有功能的完整演示。

### 🤝 贡献

欢迎提交 Issues 和 Pull Requests！

### 📄 许可证

ISC License