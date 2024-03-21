const NotFound = ({ value }) => {
    return (
        <div className="flex items-center justify-center h-3/6 w-full">
            <div className="text-center">
                <h1
                    className="text-4xl font-bold text-surface-600
			"
                >
                    {value}
                </h1>
            </div>
        </div>
    );
};

export default NotFound