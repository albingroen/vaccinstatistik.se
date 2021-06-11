interface Progress {
  value: number;
  className: string;
}

export default function Progress({ value, className }: Progress) {
  return (
    <div
      className="w-full h-2 overflow-hidden bg-gray-200 rounded-full"
      title={`${Math.round(value)}%`}
    >
      <div className={`h-full ${className}`} style={{ width: `${value}%` }} />
    </div>
  );
}
