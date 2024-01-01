import { useState, useEffect } from "react";
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
import { getCollections, createCollection,collectionsUrlEndpoint } from "../api/collectionApi";
import { createCollectionOptions } from "../api/SWROptions";


// const fetcher = async (url) => {
//         const response = await axios.get(url);
//         return response.data;
// };
function CollectionPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const itemsPerPage = 5;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const [displayedCollections, setDisplayedCollections] = useState([]);

/**
     * Creates a new mutation by adding a new collection to the existing collections.
     *
     * @param {Object} newCollection - The new collection to be added.
     * @param {Array} collections - The existing collections.
     * @return {Array} The updated collections with the new collection added.
     */
    const createMutation = async (newCollection, collections) =>{
        const response = await createCollection(newCollection);
        return [...collections.result, response];
      }
   
    const { mutate} = useSWRConfig();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const DEFAULT_PAGE_LIMIT = 5;
    const { data: collections, error, isLoading} = useSWR(
        collectionsUrlEndpoint,
        getCollections,{
            onSuccess: (collections) => collections.result.sort((a, b) => b.id - a.id)
        }
    );
    const totalPages = Math.ceil(
        collections && collections.totalRecords / DEFAULT_PAGE_LIMIT
    );
    useEffect(() => {
        if (collections) {
            const displayedCollection = collections.result.slice(startIndex, endIndex);
            setDisplayedCollections(displayedCollection);
        }
    }, [collections, startIndex, endIndex]);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    const handlePageChange = async (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };
    const handleCreateCollection = async (newCollection) => {
        try {
            await mutate(
                createMutation(newCollection, collections),
                createCollectionOptions(newCollection),
            );
            // update displayedCollections
            setDisplayedCollections((collections) => [
                newCollection,
                ...collections
            ].sort((a, b) => b.id - a.id));
            console.log(displayedCollections);
            toast.success("Collection created successfully", {
                duration: 1000,
            });
            
        } catch (err) {
            // setLoading(false);
            toast.error("Failed to create collection", {
                duration: 1000,
            });
        }
    };

    

    const onSubmit = async (inputs,) => {
        const{input1, input2} = inputs;
        // try {
        //     // const newResult = mutate('http://localhost:5050/api/v1/collections',handleCreateCollection(data.input1, data.input2), {
        //     //     optimisticData: [...data.result, { diseaseTerm: data.input1, title: data.input2 }],
        //     //     populateCache: true,
        //     //     revalidate: true,
        //     //     rollbackOnError: true,
        //     // });   
        //     // console.log(newResult);
        //    await handleCreateCollection(data.input1, data.input2)
            
        // } catch (error) {
        //     //   console.error("Error creating collection:", error);
        //     setLoading(false);
        // }
        try {
            await handleCreateCollection({diseaseTerm: input1, title: input2});

            reset();
           
        } catch (error) {
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
                    {error && <p className="text-surface-600 text-lg">There was an error fetching data</p>}
                    {isLoading ? (
                        <>
                            <SkeletonLoader />
                        </>
                    ) : (
                        <>
                            <CollectionTable collections={displayedCollections} />
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
