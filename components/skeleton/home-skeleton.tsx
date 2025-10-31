import { Card } from "@/components/ui/card"

export default function HomeSkeleton() {
    return (
        <div className="min-h-screen">
            <main className="space-y-8">
                {/* Cities Grid Skeleton */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {[...Array(8)].map((_, i) => (
                        <Card
                            key={i}
                            className="border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-2xl animate-pulse"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="h-6 w-24 bg-gray-200 rounded mb-2" />
                                    <div className="h-4 w-16 bg-gray-100 rounded" />
                                </div>
                                <div className="h-6 w-6 bg-gray-100 rounded-full" />
                            </div>
                            <div className="space-y-3">
                                <div className="h-8 w-20 bg-gray-200 rounded" />
                                <div className="h-3 w-24 bg-gray-100 rounded" />
                                <div className="h-3 w-20 bg-gray-100 rounded" />
                            </div>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    )
}
