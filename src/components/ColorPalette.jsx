const COLORS = [
  // 红色系
  { name: 'Red', nameCn: '红色', rgb: { r: 255, g: 0, b: 0 } },
  { name: 'Crimson', nameCn: '深红', rgb: { r: 220, g: 20, b: 60 } },
  { name: 'Rose', nameCn: '玫瑰红', rgb: { r: 255, g: 0, b: 127 } },
  { name: 'Pink', nameCn: '粉红', rgb: { r: 255, g: 192, b: 203 } },
  { name: 'HotPink', nameCn: '亮粉', rgb: { r: 255, g: 105, b: 180 } },
  { name: 'DeepPink', nameCn: '深粉', rgb: { r: 255, g: 20, b: 147 } },

  // 橙色系
  { name: 'Orange', nameCn: '橙色', rgb: { r: 255, g: 165, b: 0 } },
  { name: 'DarkOrange', nameCn: '深橙', rgb: { r: 255, g: 140, b: 0 } },
  { name: 'Coral', nameCn: '珊瑚', rgb: { r: 255, g: 127, b: 80 } },
  { name: 'Tomato', nameCn: '番茄红', rgb: { r: 255, g: 99, b: 71 } },
  { name: 'OrangeRed', nameCn: '橙红', rgb: { r: 255, g: 69, b: 0 } },
  { name: 'Salmon', nameCn: '鲑鱼色', rgb: { r: 250, g: 128, b: 114 } },

  // 黄色系
  { name: 'Gold', nameCn: '金色', rgb: { r: 255, g: 215, b: 0 } },
  { name: 'Yellow', nameCn: '黄色', rgb: { r: 255, g: 255, b: 0 } },
  { name: 'LightYellow', nameCn: '浅黄', rgb: { r: 255, g: 255, b: 224 } },
  { name: 'LemonChiffon', nameCn: '柠檬黄', rgb: { r: 255, g: 250, b: 205 } },
  { name: 'Khaki', nameCn: '卡其色', rgb: { r: 240, g: 230, b: 140 } },
  { name: 'Moccasin', nameCn: '鹿皮色', rgb: { r: 255, g: 228, b: 181 } },

  // 绿色系
  { name: 'Lime', nameCn: '青柠', rgb: { r: 0, g: 255, b: 0 } },
  { name: 'LimeGreen', nameCn: '柠檬绿', rgb: { r: 50, g: 205, b: 50 } },
  { name: 'Green', nameCn: '绿色', rgb: { r: 0, g: 128, b: 0 } },
  { name: 'ForestGreen', nameCn: '森林绿', rgb: { r: 34, g: 139, b: 34 } },
  { name: 'SpringGreen', nameCn: '春绿', rgb: { r: 0, g: 255, b: 127 } },
  { name: 'MediumSeaGreen', nameCn: '海绿', rgb: { r: 60, g: 179, b: 113 } },

  // 青色系
  { name: 'Cyan', nameCn: '青色', rgb: { r: 0, g: 255, b: 255 } },
  { name: 'Aqua', nameCn: '水绿', rgb: { r: 0, g: 255, b: 255 } },
  { name: 'Turquoise', nameCn: '绿松石', rgb: { r: 64, g: 224, b: 208 } },
  { name: 'Teal', nameCn: '青灰', rgb: { r: 0, g: 128, b: 128 } },
  { name: 'LightCyan', nameCn: '浅青', rgb: { r: 224, g: 255, b: 255 } },
  { name: 'Aquamarine', nameCn: '碧绿', rgb: { r: 127, g: 255, b: 212 } },

  // 蓝色系
  { name: 'Blue', nameCn: '蓝色', rgb: { r: 0, g: 0, b: 255 } },
  { name: 'DeepSkyBlue', nameCn: '天蓝', rgb: { r: 0, g: 191, b: 255 } },
  { name: 'DodgerBlue', nameCn: '道奇蓝', rgb: { r: 30, g: 144, b: 255 } },
  { name: 'RoyalBlue', nameCn: '皇家蓝', rgb: { r: 65, g: 105, b: 225 } },
  { name: 'Navy', nameCn: '海军蓝', rgb: { r: 0, g: 0, b: 128 } },
  { name: 'MidnightBlue', nameCn: '午夜蓝', rgb: { r: 25, g: 25, b: 112 } },

  // 紫色系
  { name: 'Purple', nameCn: '紫色', rgb: { r: 128, g: 0, b: 128 } },
  { name: 'Magenta', nameCn: '品红', rgb: { r: 255, g: 0, b: 255 } },
  { name: 'Violet', nameCn: '紫罗兰', rgb: { r: 238, g: 130, b: 238 } },
  { name: 'Orchid', nameCn: '兰花紫', rgb: { r: 218, g: 112, b: 214 } },
  { name: 'Plum', nameCn: '李子色', rgb: { r: 221, g: 160, b: 221 } },
  { name: 'MediumPurple', nameCn: '中紫', rgb: { r: 147, g: 112, b: 219 } },

  // 特殊色
  { name: 'Brown', nameCn: '棕色', rgb: { r: 165, g: 42, b: 42 } },
  { name: 'Maroon', nameCn: '栗色', rgb: { r: 128, g: 0, b: 0 } },
  { name: 'Sienna', nameCn: '赭色', rgb: { r: 160, g: 82, b: 45 } },
  { name: 'Tan', nameCn: '褐色', rgb: { r: 210, g: 180, b: 140 } },
  { name: 'RosyBrown', nameCn: '玫瑰褐', rgb: { r: 188, g: 143, b: 143 } },
  { name: 'SandyBrown', nameCn: '沙褐色', rgb: { r: 244, g: 164, b: 96 } }
];

function ColorPalette({ onSelectColor }) {
  const getRgbString = (rgb) => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Color Palette</h2>
      
      <div className="grid grid-cols-6 gap-4">
        {COLORS.map((color, index) => (
          <div 
            key={index}
            className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
            style={{ backgroundColor: getRgbString(color.rgb) }}
            onClick={() => onSelectColor?.(color.rgb)}
          >
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
              <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity p-1">
                <div className="text-sm font-bold">{color.name}</div>
                <div className="text-xs">{color.nameCn}</div>
                <div className="text-xs">
                  R:{color.rgb.r} G:{color.rgb.g} B:{color.rgb.b}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ColorPalette 