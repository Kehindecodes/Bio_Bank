import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import FormModal from "../components/FormModal";
import Button from "../components/Button";
import SampleTable from "../components/SampleTable";
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import SkeletonLoader from "../components/SkeletonLoader";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeftLong } from "react-icons/fa6"
import {getSamples, samplesUrlEndpoint, createSample} from "../api/sampleApi";

// const fetcher = async (url) => {
//     const response = await new Promise((resolve) => {
//         setTimeout(async () => {
//             const result = await axios.get(url);
//             resolve(result);
//         }, 2000);
//     });
//     return response.data;
// };

  
function SamplePage() {
    // const [currentPage, setCurrentPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    // get collection id from url
    const { collectionId } = useParams();
    // const { mutate } = useSWRConfig();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { data:samples, error, isLoading } = useSWR(
        `http://localhost:5050/api/v1/collections/${collectionId}/samples `,
        fetcher
    );
    console.log(data && data);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    // const handlePageChange = (newPage) => {
    //   if (newPage >= 1 && newPage <= totalPages) {
    //     setCurrentPage(newPage);
    //   }
    // };
    const handleAddSample = async (donorCount,materialType) => {
        try{
            const response = await axios.post(`http://localhost:5050/api/v1/collections/${collectionId}/samples`,{
                donorCount,
                materialType
            })
            if (response.status === 201) {
                setLoading(true)
                setTimeout(() => {
                    setLoading(false)
                    toast.success("Sample Added successfully")
                    reset()
                    mutate(`http://localhost:5050/api/v1/collections/${collectionId}/samples`)
                }, 2000)
            }
        }catch(response){
            setLoading(false)
            toast.error(response.response.data.message)
        }
    }

    const onSubmit = async (data) => {
        try{
            console.log(data)
            await handleAddSample(parseInt(data.input1),data.input2)
        }catch(error){
            console.log(error)
        }
    }

    return (
        <>
            <div className="w-screen h-full  bg-surface-100">
                <Header />
                <div className="mt-10 p-10 mb-12 h-screen ">
                    {/* back button with icon from react-icons */}
                    <div className="mb-10 w-1/4">
                    <Link to={`/`} className={`text-surface-600 hover:text-primary-500 flex items-center text-lg`}>
                      <FaArrowLeftLong />  <span className="ml-2">Back to Collection </span> 
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
                    ) : data.length === 0 ? (
                        <p className="text-2xl font-bold text-surface-600 mt-10 text-center w-full h-full my-auto "> There are no samples in this collection </p>
                    ) : (
                        <SampleTable samples={data} />
                    )}
                    {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /> */}
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
