type WaveProps = {
  className?: string;
  color?: string;
};

export default function Wave({
  className = "",
  color = "fill-secondary",
}: WaveProps) {
  return (
    <svg
      viewBox="0 0 1920 124"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto ${className}`}
      preserveAspectRatio="none"
    >
      <path
        d="M0,96 Q560,10 960,64 T1920,96 L1920,128 L0,128 Z"
        className={color}
      />
    </svg>
  );
}
