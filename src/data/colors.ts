export interface ColorInfo {
  hex: string;
  nameEn: string;
  nameZh: string;
  rgb: string;
}

// 49 predefined colors organized by color families
export const predefinedColors: ColorInfo[] = [
  // Reds (6)
  { hex: '#FF0000', nameEn: 'Red', nameZh: '红色', rgb: 'RGB(255,0,0)' },
  { hex: '#FF3333', nameEn: 'Bright Red', nameZh: '亮红色', rgb: 'RGB(255,51,51)' },
  { hex: '#CC0000', nameEn: 'Dark Red', nameZh: '暗红色', rgb: 'RGB(204,0,0)' },
  { hex: '#990000', nameEn: 'Deep Red', nameZh: '深红色', rgb: 'RGB(153,0,0)' },
  { hex: '#FFCCCC', nameEn: 'Light Pink', nameZh: '浅粉色', rgb: 'RGB(255,204,204)' },
  { hex: '#FF6666', nameEn: 'Coral Red', nameZh: '珊瑚红', rgb: 'RGB(255,102,102)' },

  // Oranges (6)
  { hex: '#FF9900', nameEn: 'Orange', nameZh: '橙色', rgb: 'RGB(255,153,0)' },
  { hex: '#FFCC66', nameEn: 'Light Orange', nameZh: '浅橙色', rgb: 'RGB(255,204,102)' },
  { hex: '#FF6600', nameEn: 'Dark Orange', nameZh: '深橙色', rgb: 'RGB(255,102,0)' },
  { hex: '#CC9933', nameEn: 'Golden Orange', nameZh: '金橙色', rgb: 'RGB(204,153,51)' },
  { hex: '#FFCC99', nameEn: 'Peach', nameZh: '桃色', rgb: 'RGB(255,204,153)' },
  { hex: '#CC6600', nameEn: 'Burnt Orange', nameZh: '赭色', rgb: 'RGB(204,102,0)' },

  // Yellows (6)
  { hex: '#FFFF00', nameEn: 'Yellow', nameZh: '黄色', rgb: 'RGB(255,255,0)' },
  { hex: '#FFFF99', nameEn: 'Light Yellow', nameZh: '浅黄色', rgb: 'RGB(255,255,153)' },
  { hex: '#CCCC00', nameEn: 'Dark Yellow', nameZh: '暗黄色', rgb: 'RGB(204,204,0)' },
  { hex: '#FFCC00', nameEn: 'Gold', nameZh: '金色', rgb: 'RGB(255,204,0)' },
  { hex: '#FFFFCC', nameEn: 'Cream', nameZh: '奶油色', rgb: 'RGB(255,255,204)' },
  { hex: '#999900', nameEn: 'Olive Yellow', nameZh: '橄榄黄', rgb: 'RGB(153,153,0)' },

  // Greens (6)
  { hex: '#00FF00', nameEn: 'Green', nameZh: '绿色', rgb: 'RGB(0,255,0)' },
  { hex: '#99FF99', nameEn: 'Light Green', nameZh: '浅绿色', rgb: 'RGB(153,255,153)' },
  { hex: '#009900', nameEn: 'Dark Green', nameZh: '深绿色', rgb: 'RGB(0,153,0)' },
  { hex: '#33CC33', nameEn: 'Lime Green', nameZh: '青柠绿', rgb: 'RGB(51,204,51)' },
  { hex: '#006600', nameEn: 'Forest Green', nameZh: '森林绿', rgb: 'RGB(0,102,0)' },
  { hex: '#66CC99', nameEn: 'Mint Green', nameZh: '薄荷绿', rgb: 'RGB(102,204,153)' },

  // Blues (6)
  { hex: '#0000FF', nameEn: 'Blue', nameZh: '蓝色', rgb: 'RGB(0,0,255)' },
  { hex: '#9999FF', nameEn: 'Light Blue', nameZh: '浅蓝色', rgb: 'RGB(153,153,255)' },
  { hex: '#000099', nameEn: 'Dark Blue', nameZh: '深蓝色', rgb: 'RGB(0,0,153)' },
  { hex: '#3333CC', nameEn: 'Royal Blue', nameZh: '皇家蓝', rgb: 'RGB(51,51,204)' },
  { hex: '#00CCFF', nameEn: 'Sky Blue', nameZh: '天蓝色', rgb: 'RGB(0,204,255)' },
  { hex: '#003366', nameEn: 'Navy Blue', nameZh: '海军蓝', rgb: 'RGB(0,51,102)' },

  // Teals/Cyans (6)
  { hex: '#00FFFF', nameEn: 'Cyan', nameZh: '青色', rgb: 'RGB(0,255,255)' },
  { hex: '#99FFFF', nameEn: 'Light Cyan', nameZh: '浅青色', rgb: 'RGB(153,255,255)' },
  { hex: '#009999', nameEn: 'Dark Teal', nameZh: '深青色', rgb: 'RGB(0,153,153)' },
  { hex: '#66CCCC', nameEn: 'Teal', nameZh: '蓝绿色', rgb: 'RGB(102,204,204)' },
  { hex: '#CCFFFF', nameEn: 'Light Teal', nameZh: '浅蓝绿色', rgb: 'RGB(204,255,255)' },
  { hex: '#006666', nameEn: 'Deep Teal', nameZh: '深蓝绿色', rgb: 'RGB(0,102,102)' },

  // Purples (6)
  { hex: '#FF00FF', nameEn: 'Magenta', nameZh: '品红色', rgb: 'RGB(255,0,255)' },
  { hex: '#FF99FF', nameEn: 'Light Pink', nameZh: '浅粉红', rgb: 'RGB(255,153,255)' },
  { hex: '#990099', nameEn: 'Deep Purple', nameZh: '深紫色', rgb: 'RGB(153,0,153)' },
  { hex: '#CC33CC', nameEn: 'Medium Purple', nameZh: '中紫色', rgb: 'RGB(204,51,204)' },
  { hex: '#CC99FF', nameEn: 'Lavender', nameZh: '薰衣草色', rgb: 'RGB(204,153,255)' },
  { hex: '#9900CC', nameEn: 'Violet', nameZh: '紫罗兰色', rgb: 'RGB(153,0,204)' },

  // Browns (5)
  { hex: '#996633', nameEn: 'Brown', nameZh: '棕色', rgb: 'RGB(153,102,51)' },
  { hex: '#663300', nameEn: 'Dark Brown', nameZh: '深棕色', rgb: 'RGB(102,51,0)' },
  { hex: '#CC9966', nameEn: 'Tan', nameZh: '棕褐色', rgb: 'RGB(204,153,102)' },
  { hex: '#CC6633', nameEn: 'Copper', nameZh: '铜色', rgb: 'RGB(204,102,51)' },
  { hex: '#CC9900', nameEn: 'Amber', nameZh: '琥珀色', rgb: 'RGB(204,153,0)' },

  // Grays (1)
  { hex: '#808080', nameEn: 'Gray', nameZh: '灰色', rgb: 'RGB(128,128,128)' },
];