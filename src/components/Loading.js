
const Loading = () => {
    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-4xl font-normal"> FOOD RESTR</h1>
                <div className="relative">
                    <div className="h-7 w-7 rounded-3xl border-t-8 border-b-8 border-green-900"></div>
                    <div className="absolute top-0 left-0 h-7 w-7 rounded-3xl border-t-8 border-b-8 border-green-600 animate-spin">
                    </div>
                </div>
            </div>

        </>
    )
}

export default Loading
