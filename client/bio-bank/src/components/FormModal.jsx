const FormModal = ({
    title,
    placeholder1,
    placeholder2,
    ctaText,
    onCancel,
    text1,
    text2,
    onSubmit,
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
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3
                                        className="text-lg leading-6 text-white mb-4 font-bold"
                                        id="modal-headline"
                                    >
                                        {title}
                                    </h3>
                                    {/* form */}
                                    <form className="mt-2">
                                        <input
                                            className="appearance-none  bg-transparent border  border-line-divider rounded-full w-full py-3 px-3 text-surface-600 leading-tight  focus:outline-none focus:shadow-outline mt-4 mb-3"
                                            id={text1}
                                            type="text"
                                            placeholder={placeholder1}
                                        />
                                        <input
                                            className="shadow appearance-none bg-transparent border  border-line-divider rounded-full w-full py-3 px-3 text-surface-600 leading-tight focus:outline-none focus:shadow-outline mt-4 mb-3"
                                            id={text2}
                                            type="text"
                                            placeholder={placeholder2}
                                        />
                                        <div className="bg-transparent  py-3  sm:flex sm:flex-row-reverse">
                                            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center w-full rounded-full border border-transparent px-5 py-2 bg-primary-500  leading-6 font-medium text-surface-100 shadow-sm hover:bg-primary-600 focus:outline-none  focus:shadow-outline-blue transition ease-in-out duration-150"
                                                >
                                                    {ctaText}
                                                </button>
                                            </span>
                                            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                                                <button
                                                    type="button"
                                                    onClick={onCancel}
                                                    className="inline-flex justify-center w-full rounded-full  px-5 py-2 bg-transparent text-base leading-6 font-medium text-primary-500   focus:outline-none transition ease-in-out duration-150 hover:bg-neutral-700"
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
