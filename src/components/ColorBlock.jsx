function ColorBlock({ color, placeholder, onChange, readOnly }) {
  const bgColor = color ? 
    `rgb(${color.r}, ${color.g}, ${color.b})` : 
    'transparent'

  return (
    <div className="w-32">
      <div 
        className={`
          w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden mx-auto
          ${!readOnly ? 'cursor-pointer' : ''}
        `}
        style={{ backgroundColor: bgColor }}
      >
        {!color && (
          <div className="h-full flex items-center justify-center text-gray-400">
            {placeholder}
          </div>
        )}
      </div>

      <div className="mt-2">
        <div className="flex gap-1">
          <input
            type="number"
            min="0"
            max="255"
            placeholder="R"
            value={color?.r ?? ''}
            onChange={(e) => {
              if (readOnly) return;
              const value = Math.min(255, Math.max(0, parseInt(e.target.value) || 0));
              onChange({ ...color, r: value });
            }}
            readOnly={readOnly}
            className={`
              w-full px-1 py-1 text-xs border rounded 
              [appearance:textfield] 
              [&::-webkit-outer-spin-button]:appearance-none 
              [&::-webkit-inner-spin-button]:appearance-none
              ${readOnly ? 'bg-gray-50 cursor-default' : ''}
            `}
          />
          <input
            type="number"
            min="0"
            max="255"
            placeholder="G"
            value={color?.g ?? ''}
            onChange={(e) => {
              if (readOnly) return;
              const value = Math.min(255, Math.max(0, parseInt(e.target.value) || 0));
              onChange({ ...color, g: value });
            }}
            readOnly={readOnly}
            className={`
              w-full px-1 py-1 text-xs border rounded 
              [appearance:textfield] 
              [&::-webkit-outer-spin-button]:appearance-none 
              [&::-webkit-inner-spin-button]:appearance-none
              ${readOnly ? 'bg-gray-50 cursor-default' : ''}
            `}
          />
          <input
            type="number"
            min="0"
            max="255"
            placeholder="B"
            value={color?.b ?? ''}
            onChange={(e) => {
              if (readOnly) return;
              const value = Math.min(255, Math.max(0, parseInt(e.target.value) || 0));
              onChange({ ...color, b: value });
            }}
            readOnly={readOnly}
            className={`
              w-full px-1 py-1 text-xs border rounded 
              [appearance:textfield] 
              [&::-webkit-outer-spin-button]:appearance-none 
              [&::-webkit-inner-spin-button]:appearance-none
              ${readOnly ? 'bg-gray-50 cursor-default' : ''}
            `}
          />
        </div>
      </div>
    </div>
  )
}

export default ColorBlock 