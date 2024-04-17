'use client'

export default function Error({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}) {
    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <h2 className="text-red-400">
                {error.message}
            </h2>
        </div>
    )
}