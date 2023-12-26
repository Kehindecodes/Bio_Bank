
    const SkeletonLoader = () => {
        return (
          <div className="animate-pulse mt-8">
            <div className="h-14 py-4 px-4 bg-surface-300 rounded-t-xl mb-2"></div>
            <div className=" h-16 py-4 px-4 bg-surface-300 mb-2"></div>
            <div className=" h-16 py-4 px-4 bg-surface-300 mb-2"></div>
            <div className=" h-16 py-4 px-4 bg-surface-300 mb-2"></div>
            <div className=" h-16 py-4 px-4 bg-surface-300 mb-2"></div>
            <div className=" h-16  py-4 px-4 bg-surface-300 rounded-b-xl mb-2"></div>
            {/* Add more skeleton loader lines as needed */}
          </div>
        );
      };
    



export default SkeletonLoader;