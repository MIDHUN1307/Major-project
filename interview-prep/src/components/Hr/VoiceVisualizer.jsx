export default function VoiceVisualizer({ volume = 0 }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div
        className="absolute w-24 h-24 rounded-full bg-blue-400/30"
        style={{ transform: `scale(${1 + volume * 2})` }}
      />
      <div
        className="absolute w-32 h-32 rounded-full bg-purple-400/20"
        style={{ transform: `scale(${1 + volume * 1.5})` }}
      />
      <div
        className="absolute w-40 h-40 rounded-full bg-blue-300/10"
        style={{ transform: `scale(${1 + volume})` }}
      />

      <div className="absolute flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"
            style={{
              height: `${10 + volume * 60}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
