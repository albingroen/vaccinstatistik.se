interface Progress {
  value: number;
  className: string;
}

export default function Progress({ value, className }: Progress) {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-full h-2 overflow-hidden bg-gray-200 rounded-full">
        <div className={`h-full ${className}`} style={{ width: `${value}%` }} />
      </div>

      <span className="text-gray-400">~{Math.round(value)}%</span>
    </div>
  );
}
