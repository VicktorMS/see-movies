export default function MovieCardSkeleton() {
    return (
        <div className="flex flex-col gap-2 items-center h-full w-full">
            <div className="skeleton h-64 w-full rounded-lg"></div>
            <div className="skeleton h-4 w-3/4 md:w-1/2 lg:w-1/3 rounded"></div>
        </div>
    )
}
