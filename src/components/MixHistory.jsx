function MixHistory({ history, onSelectHistory }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Mix History</h2>
      
      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {history.map((record, index) => (
          <div 
            key={index}
            onClick={() => onSelectHistory(record)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: `rgb(${record.colorA.r}, ${record.colorA.g}, ${record.colorA.b})` }} />
            <span className="text-xl">+</span>
            <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: `rgb(${record.colorB.r}, ${record.colorB.g}, ${record.colorB.b})` }} />
            <span className="text-xl">=</span>
            <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: `rgb(${record.result.r}, ${record.result.g}, ${record.result.b})` }} />
            
            <div className="ml-auto text-sm text-gray-500">
              {new Date(record.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}

        {history.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No mixing history yet
          </div>
        )}
      </div>
    </div>
  )
}

export default MixHistory 