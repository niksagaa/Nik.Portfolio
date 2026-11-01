export default function Loading() {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 sm:p-8">
            <div className="max-w-4xl w-full space-y-8 animate-pulse">
                {/* Header Skeleton */}
                <div className="flex items-center justify-between border-b border-[#222222] pb-6">
                    <div className="space-y-2">
                        <div className="h-6 w-36 bg-[#1f1f1f] rounded-lg"></div>
                        <div className="h-4 w-60 bg-[#171717] rounded-lg"></div>
                    </div>
                    <div className="h-10 w-28 bg-[#1f1f1f] rounded-xl"></div>
                </div>

                {/* Content Skeleton Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-64 bg-[#121212] border border-[#222222] rounded-2xl p-6 space-y-4">
                        <div className="h-4 w-20 bg-[#1f1f1f] rounded"></div>
                        <div className="h-6 w-3/4 bg-[#1f1f1f] rounded"></div>
                        <div className="space-y-2 pt-2">
                            <div className="h-3 w-full bg-[#1a1a1a] rounded"></div>
                            <div className="h-3 w-5/6 bg-[#1a1a1a] rounded"></div>
                        </div>
                    </div>
                    <div className="h-64 bg-[#121212] border border-[#222222] rounded-2xl p-6 space-y-4">
                        <div className="h-4 w-20 bg-[#1f1f1f] rounded"></div>
                        <div className="h-6 w-3/4 bg-[#1f1f1f] rounded"></div>
                        <div className="space-y-2 pt-2">
                            <div className="h-3 w-full bg-[#1a1a1a] rounded"></div>
                            <div className="h-3 w-5/6 bg-[#1a1a1a] rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}