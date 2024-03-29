import React, { ChangeEvent, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CollectionTable from "../components/CollectionTable";
import Button from "../components/Button";
import Pagination from "../components/Pagination";
import FormModal from "../components/FormModal";
import useSWR from "swr";
import SkeletonLoader from "../components/SkeletonLoader";
import { FieldValues, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    getCollections,
    createCollection,
    collectionsUrlEndpoint,
} from "../api/collectionApi";
import { createCollectionOptions } from "../api/SWROptions";
import SearchInput  from "../components/SearchInput";
import NotFound  from "../components/NotFound";
import { Collection, Collections, Input } from "../types/types";
import { FetcherResponse, PublicConfiguration } from "swr/_internal";

function CollectionPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const itemsPerPage = 5;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const {
        data: collections,
        error,
        isLoading,
        mutate,
    } = useSWR(collectionsUrlEndpoint, getCollections, {
        onSuccess: (data: Collections, key: string, config: Readonly<PublicConfiguration<Collections, any, (arg: string) => FetcherResponse<Collections>>>) => {
            data.result.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
        },
    });

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    /**
     * Creates a new mutation by adding a new collection to the existing collections.
     *
     * @param {Object} newCollection - The new collection to be added.
     * @param {Array} collections - The existing collections.
     * @return {Array} The updated collections with the new collection added.
     */

    const createMutation = async (newCollection: Collection, collections: Collections): Promise<Collections> => {
    const response = await createCollection(newCollection);
    // Assuming `createCollection` returns a single Collection object
    // and you want to add this new collection to the existing collections
    return {
        ...collections,
        result: [response, ...collections.result],
        totalRecords: collections.totalRecords + 1, // Assuming you want to increment the total records count
    };
};
    const handlePageChange = async (newPage: number): Promise<void> => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };
    /**
     * Handles the creation of a new collection.
     *
     * @param {object} newCollection - The new collection to be created.
     * @return {Promise} A promise that resolves with the result of the creation.
     */
    const handleCreateCollection = async (newCollection: Collection) : Promise<void> => {
        try {
            if(collections){
                await mutate(
                    createMutation(newCollection, collections),
                    createCollectionOptions(newCollection)
                );
                toast.success("Collection created successfully", {
                    autoClose: 1000,
                });
                reset();
                toggleModal();
            }  else {
                console.error("Collections data is not available.");
            }
            
        } catch (err: any) {
            toast.error(err.response.data.message, {
                autoClose: 1000,
            });
        }
    };
    /**
     * Handles the form submission event.
     *
     * @param {Object} inputs - The input values from the form.
     *     @property {type} input1 - description of input1
     *     @property {type} input2 - description of input2
     * @return {Promise} A promise that resolves when the submission is complete.
     */
    const onSubmit = async (inputs: FieldValues) : Promise<void> =>  {
        const { input1, input2 } = inputs as Input;
        try {
            await handleCreateCollection({
                diseaseTerm: input1,
                title: input2,
            });
        } catch (error) {
            console.log(error);
        }
    };
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

       const filteredCollections = // Filter collections based on search term
           collections &&
           collections.result &&
           collections.result.filter((collection): boolean => {
               if (searchTerm === "") { // If search term is empty, return all collections
                   return true;
               } else { // Otherwise, filter collections based on title
                   return collection.title
                       .toLowerCase()
                       .includes(searchTerm.toLowerCase());
               }
           });
       const totalPages = Math.ceil( // Calculate the total number of pages
           filteredCollections ? filteredCollections.length / itemsPerPage : 0
       );
       const safeEndIndex = Math.min( // Calculate the safe end index
           endIndex,
           filteredCollections ? filteredCollections.length : 0
       );
   
       const displayedCollection = filteredCollections // Get the displayed collection
           ? filteredCollections.slice(startIndex, safeEndIndex)
           : [];
    return (
        <>
            <div className="w-screen  h-full bg-surface-100">
                <Header />
                <div className="mt-10 p-10 mb-12 h-screen ">
                    <div className="flex items-center justify-between w-full">
                        <h1 className="text-3xl font-bold text-grayLight">
                            Collections
                        </h1>
                        <SearchInput onSearch={onChange} value={searchTerm} />
                        <Button
                            className="text-lg text-surface-100 bg-primary-500 hover:bg-primary-600 justify-self-end py-2 px-4"
                            onClick={toggleModal}
                        >
                            Create Collection{" "}
                        </Button>
                    </div>
                    {error && (
                        <p className="text-surface-600 text-lg">
                            There was an error fetching data
                        </p>
                    )}
                    {isLoading ? (
                        <>
                            <SkeletonLoader />
                        </>
                    ) : (
                        <>
                            {" "}
                            {filteredCollections &&
                            filteredCollections.length === 0 ? (
                                <NotFound value={"No collections found"} />
                            ) : (
                                <>
                                     {displayedCollection.length === 0 ? (
                                        <SkeletonLoader />
                                     ): (
                                        <CollectionTable
                                        collections={displayedCollection}
                                    />
                                     )
                                    }

                                    {filteredCollections &&
                                    filteredCollections.length >
                                        itemsPerPage ? (
                                        <>
                                            <Pagination
                                                currentPage={currentPage}
                                                totalPages={totalPages}
                                                totalItems={
                                                    filteredCollections.length
                                                }
                                                onPageChange={handlePageChange}
                                                itemsPerPage={itemsPerPage}
                                            />
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </>
                            )}
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
                            isLoading={isLoading}
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
