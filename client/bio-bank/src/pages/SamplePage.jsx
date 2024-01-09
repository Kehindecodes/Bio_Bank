import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FormModal from "../components/FormModal";
import Button from "../components/Button";
import SampleTable from "../components/SampleTable";
import useSWR from "swr";
import axios from "axios";
import SkeletonLoader from "../components/SkeletonLoader";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { addSample, delay } from "../api/sampleApi";
import { addSampleOptions } from "../api/SWROptions";
import NotFound  from "../components/NotFound";

const fetcher = async (url) => {
    await delay();
    const response = await axios.get(url);
    return response.data;
};

function SamplePage() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    // get collection id from url
    const { collectionId } = useParams();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const {
        data: samples,
        error,
        isLoading,
        mutate,
    } = useSWR(
        `http://localhost:5050/api/v1/collections/${collectionId}/samples`,
        fetcher
    );

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    /**
     * Adds a new sample to the list of samples and returns the updated list.
     *
     * @param {Object} newSample - The new sample to be added.
     * @param {Array} samples - The current list of samples.
     * @return {Array} - The updated list of samples.
     */
    const addMutation = async (newSample, samples) => {
        const response = await addSample(collectionId, newSample);
        return [...samples, response];
    };

    const handleAddSample = async (newSample) => {
        try {
            await mutate(
                addMutation(newSample, samples),
                addSampleOptions(newSample)
            );
            toast.success("Sample Added successfully", {
                duration: 1000,
            });
            reset();
            setTimeout(() => {
                toggleModal();
            }, 1000);
        } catch (error) {
            // setLoading(false);
            toast.error(error.response.data.message, {
                duration: 1000,
            });
        }
    };
// Submits the inputs to the server
    const onSubmit = async (inputs) => {
        const { input1, input2 } = inputs;
        try {
            await handleAddSample({
                donorCount: parseInt(input1),
                materialType: input2,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="w-screen h-full  bg-surface-100">
                <Header />
                <div className="mt-10 p-10 mb-12 h-screen ">
                    <div className="mb-10 w-1/4">
                        <Link
                            to={`/`}
                            className={`text-surface-600 hover:text-primary-500 flex items-center text-lg`}
                        >
                            <FaArrowLeftLong />{" "}
                            <span className="ml-2">Back to Collection </span>
                        </Link>
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <h1 className="text-3xl font-bold text-grayLight">
                            List of Samples
                        </h1>
                        <Button
                            className="text-lg text-surface-100 bg-primary-500 hover:bg-primary-600 justify-self-end py-2 px-4"
                            onClick={toggleModal}
                        >
                            Add Sample
                        </Button>
                    </div>
                    {error && <p>There was an error fetching samples</p>}
                    {isLoading ? (
                        <SkeletonLoader />
                    ) : samples.length === 0 ? (
                        <NotFound
                            value={"There are no samples in this collection"}
                        />
                    ) : (
                        <SampleTable samples={samples} />
                    )}
                    {isOpen && (
                        <FormModal
                            title="Add New Sample"
                            input1={{
                                type: "number",
                                placeholder: "Donor Count",
                            }}
                            input2={{
                                type: "text",
                                placeholder: "Material Type",
                            }}
                            ctaText={"Add"}
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

export default SamplePage;
