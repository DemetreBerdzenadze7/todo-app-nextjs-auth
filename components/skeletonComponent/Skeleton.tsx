type SkeletonProps = {
  className?: string;
};

// Base gray pulsing block — size/shape comes from className
export default function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`animate-pulse rounded-lg bg-surface-muted ${className}`} />;
}
