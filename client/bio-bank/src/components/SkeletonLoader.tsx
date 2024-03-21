const SkeletonLoader = () => {
    return (
        <div className="animate-pulse mt-8 w-full">
            <div className="h-14 py-4 px-4 bg-surface-300 rounded-t-xl mb-2"></div>
            <div className=" h-16 py-4 px-4 bg-surface-300 mb-2 w-full"></div>
            <div className=" h-16 py-4 px-4 bg-surface-300 mb-2"></div>
            <div className=" h-16 py-4 px-4 bg-surface-300 mb-2"></div>
            <div className=" h-16 py-4 px-4 bg-surface-300 mb-2"></div>
            <div className=" h-16  py-4 px-4 bg-surface-300 rounded-b-xl mb-2"></div>
            <div className="py-4 px-4 bg-surface-300 rounded-b-xl mt-5"></div>
        </div>
    );
};

export default SkeletonLoader;
