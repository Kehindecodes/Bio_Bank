import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CollectionTable from "../components/CollectionTable";
import Button from "../components/Button";
import Pagination from "../components/Pagination";
import FormModal from "../components/FormModal";
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import SkeletonLoader from "../components/SkeletonLoader";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetcher = async (url) => {
    const response = await new Promise((resolve) => {
        setTimeout(async () => {
            const result = await axios.get(url);
            resolve(result);
        }, 2000);
    });

    return response.data;
};
function CollectionPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const itemsPerPage = 5;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
   
    const { mutate } = useSWRConfig();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const DEFAULT_PAGE_LIMIT = 5;
    const { data, error, isLoading } = useSWR(
        `http://localhost:5050/api/v1/collections?page=${currentPage} & limit=${DEFAULT_PAGE_LIMIT} `,
        fetcher
    );
    const totalPages = Math.ceil(
        data && data.totalRecords / DEFAULT_PAGE_LIMIT
    );
    // const displayedCollections = data && data.result.slice(startIndex, endIndex)
    // console.log(totalPages);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    const handlePageChange = async (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            const newData = await fetcher(
                `http://localhost:5050/api/v1/collections?page=${newPage}`
            );
            mutate(newData, true);
        }
    };
    const handleCreateCollection = async (diseaseTerm, title) => {
        try {
            const response = await axios.post(
                "http://localhost:5050/api/v1/collections",
                {
                    diseaseTerm,
                    title,
                }
            );

            if (response.status === 201) {
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    toast.success("Collection created successfully");
                    reset();
                    mutate("http://localhost:5050/api/v1/collections",{
                        optimisticData: data,
                        rollbackOnError: true,
                        populateCache: true,
                        revalidate: false
                    });
                }, 2000);
            }
        } catch (response) {
            setLoading(false);
            toast.error(response.response.data.message);
        }
    };

    const onSubmit = async (data) => {
        try {
            await handleCreateCollection(data.input1, data.input2);
        } catch (error) {
            //   console.error("Error creating collection:", error);
            setLoading(false);
        }
    };
    return (
        <>
            <div className="w-screen  h-full bg-surface-100">
                <Header />
                <div className="mt-10 p-10 mb-12">
                    <div className="flex items-center justify-between w-full">
                        <h1 className="text-3xl font-bold text-grayLight">
                            Collections
                        </h1>
                        <Button
                            className="text-lg text-surface-100 bg-primary-500 hover:bg-primary-600 justify-self-end py-2 px-4"
                            onClick={toggleModal}
                        >
                            Create Collection{" "}
                        </Button>
                    </div>
                    {error && <p>There was an error fetching data</p>}
                    {isLoading ? (
                        <>
                            <SkeletonLoader />
                        </>
                    ) : (
                        <>
                            <CollectionTable collections={data.result} />
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </>
                    )}
                    {isOpen && (
                        <FormModal
                            title="Create New Collection"
                            input1={{
                                type: "text",
                                placeholder: "Disease Term",
                            }}
                            input2={{
                                type: "text",
                                placeholder: "Title",
                            }}
                            ctaText={"Create"}
                            onCancel={toggleModal}
                            onSubmit={handleSubmit(onSubmit)}
                            errors={errors}
                            register={register}
                            isLoading={loading}
                        />
                    )}
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />

                <Footer />
            </div>
        </>
    );
}

export default CollectionPage;
