const FormModal = ({
    title,
    ctaText,
    onCancel,
    onSubmit,
    input1,
    input2,
    errors,
    register,
    isLoading,
}) => {
    return (
        <>
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    {/* overlay */}
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-surface-100 opacity-70"></div>
                    </div>
                    <div
                        className="inline-block align-middle bg-surface-300 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full backdrop-blur-lg backdrop-saturate-150"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline"
                    >
                        <div className=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            {/* modal content */}
                            <div className="">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3
                                        className="text-lg leading-6 text-white mb-4 font-bold"
                                        id="modal-headline"
                                    >
                                        {title}
                                    </h3>
                                    {/* form */}
                                    <form
                                        className="container mt-2"
                                        onSubmit={onSubmit}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <input
                                            className={`form-input bg-transparent border rounded-full w-full py-3 px-3 text-surface-600 leading-tight focus:outline-none focus:border-primary-500 mt-4 mb-3 ${
                                                errors.input1
                                                    ? "border-red-500"
                                                    : "border-line-divider"
                                            }`}
                                            type={input1.type}
                                            placeholder={input1.placeholder}
                                            {...register("input1", {
                                                required: true,
                                            })}
                                        />
                                        {errors.input1 && (
                                            <p className="text-red-500 text-xs italic">
                                                This field is required
                                            </p>
                                        )}
                                        <input
                                            className={`form-input shadow appearance-none bg-transparent border rounded-full w-full py-3 px-3 text-surface-600 leading-tight focus:outline-none focus:shadow-outline focus:border-primary-500 mt-4 mb-3 ${
                                                errors.input2
                                                    ? "border-red-500"
                                                    : "border-line-divider"
                                            } `}
                                            type={input2.type}
                                            placeholder={input2.placeholder}
                                            {...register("input2", {
                                                required: true,
                                            })}
                                        />
                                        {errors.input2 && (
                                            <p className="text-red-500 text-xs italic">
                                                This field is required
                                            </p>
                                        )}

                                        <div className="bg-transparent  py-3  sm:flex sm:flex-row-reverse">
                                            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center w-full rounded-full border border-transparent px-5 py-2 bg-primary-500  leading-6 font-medium text-surface-100 shadow-sm hover:bg-primary-600 focus:outline-none  focus:shadow-outline-blue transition ease-in-out duration-150"
                                                >
                                                    <span className="">
                                                        {ctaText}
                                                    </span>
                                                    {isLoading ? (
                                                        <div
                                                            role="status"
                                                            className="inline ml-2 text-center"
                                                        >
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-surface-100"
                                                                viewBox="0 0 100 101"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                                    fill="currentColor"
                                                                />
                                                                <path
                                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                                    fill="currentFill"
                                                                />
                                                            </svg>
                                                            <span className="sr-only">
                                                                Loading...
                                                            </span>
                                                        </div>
                                                    ) : null}
                                                </button>
                                            </span>
                                            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                                                <button
                                                    type="button"
                                                    onClick={onCancel}
                                                    className="inline-flex justify-center w-full rounded-full  px-5 py-2 bg-transparent text-base leading-6 font-medium text-primary-500   focus:outline-none transition ease-in-out duration-150 hover:bg-surface-500"
                                                >
                                                    Cancel
                                                </button>
                                            </span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormModal;
