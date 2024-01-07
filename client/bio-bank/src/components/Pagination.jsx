const Pagination = ({
    currentPage,
    totalPages,
    totalItems,
    onPageChange,
    itemsPerPage,
}) => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const renderPageNumbers = () => {
        const pageNumbers = Array.from(
            { length: totalPages },
            (_, index) => index + 1
        );
        const visiblePageNumbers = 3;
        const startIndex = Math.max(
            currentPage - Math.floor(visiblePageNumbers / 2),
            1
        );
        const endIndex = Math.min(
            startIndex + visiblePageNumbers - 1,
            totalPages
        );
        return pageNumbers.slice(startIndex - 1, endIndex).map((page) => (
            <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`relative block rounded-full  px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  hover:bg-neutral-700 hover:text-white ${
                    currentPage === page
                        ? "bg-primary-500 text-surface-100"
                        : "bg-transparent text-surface-600"
                }`}
            >
                {page}
            </button>
        ));
    };
    return (
        <div className="flex justify-center items-center mt-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                className={`relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400 hover:text-primary-500 ${
                    currentPage > 1 ? "" : "pointer-events-none"
                }`}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            {renderPageNumbers()}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                className={`relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 text-neutral-400 hover:text-primary-500 ${
                    currentPage < totalPages ? "" : "pointer-events-none"
                } `}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
            <div className="flex items-center mx-4">
                <div className="text-sm text-neutral-500">
                    Showing {startItem}-{endItem} of {totalItems}
                </div>
            </div>
        </div>
    );
};

export default Pagination;
