// components/Skeleton.tsx
type SkeletonProps = {
   className?: string
}

export default function Skeleton({ className = '' }: SkeletonProps) {
   return <div className={`animate-pulse bg-slate-200 ${className}`} />
}
