import { Card } from "@/components/ui/card"

export default function WeatherSkeleton() {
    return (
        <div className="min-h-screen animate-pulse">
            <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
                {/* Back Button */}
                <div className="w-32 h-10 bg-gray-100 rounded-md" />

                {/* Weather Card Skeleton */}
                <Card className="border-gray-200 p-8 bg-gradient-to-br from-gray-50 to-gray-100">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <div className="h-10 w-48 bg-gray-200 rounded mb-2" />
                            <div className="h-6 w-32 bg-gray-100 rounded" />
                        </div>
                        <div className="h-10 w-40 bg-gray-100 rounded" />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-16 w-16 bg-gray-200 rounded-full" />
                            <div>
                                <div className="h-10 w-32 bg-gray-200 rounded mb-2" />
                                <div className="h-5 w-28 bg-gray-100 rounded" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex justify-between">
                                    <div className="h-4 w-24 bg-gray-100 rounded" />
                                    <div className="h-4 w-16 bg-gray-200 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Notes Section */}
                <div className="space-y-6">
                    <div className="h-8 w-48 bg-gray-200 rounded" />

                    {/* Add Note Form Skeleton */}
                    <Card className="border-gray-200 p-6">
                        <div className="space-y-4">
                            <div className="h-24 w-full bg-gray-100 rounded" />
                            <div className="flex gap-2">
                                <div className="h-10 w-full bg-gray-200 rounded" />
                                <div className="h-10 w-10 bg-gray-100 rounded" />
                            </div>
                        </div>
                    </Card>

                    {/* Notes List Skeleton */}
                    {[...Array(2)].map((_, i) => (
                        <Card key={i} className="border-gray-200 p-4">
                            <div className="flex justify-between">
                                <div className="space-y-3 w-full">
                                    <div className="h-4 w-3/4 bg-gray-200 rounded" />
                                    <div className="h-3 w-1/3 bg-gray-100 rounded" />
                                </div>
                                <div className="flex gap-2">
                                    <div className="h-8 w-8 bg-gray-100 rounded" />
                                    <div className="h-8 w-8 bg-gray-100 rounded" />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    )
}
