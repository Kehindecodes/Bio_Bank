import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import FormModal from "../components/FormModal";
import Button from "../components/Button";
import { sampleData } from "../SampleData";
import SampleTable from "../components/SampleTable";


function SamplePage(){
    const [currentPage, setCurrentPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(sampleData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedSamples = sampleData.slice(startIndex, endIndex);

    const toggleModal = () => {
      setIsOpen(!isOpen);
    };
    const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    };

    return (
        <>
            <div className="w-screen  bg-surface-100">
                <Header />
                <div className="mt-10 p-10 mb-12">
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
                    <SampleTable samples={displayedSamples} />
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    {isOpen && <FormModal title="Add New Sample" placeholder1={"Donor Count"} placeholder2={"Material Type"} ctaText={"Add"}   onCancel={toggleModal} onSubmit={toggleModal} type1={"number"} type2={"text"} />}

                </div>
                <Footer/>
            </div>
     </>
)
}

export default SamplePage