import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CollectionTable from "../components/CollectionTable";
import { sampleCollections } from "../simpleCollection";
import Button from "../components/Button";
import Pagination from "../components/Pagination";
import Modal from "../components/FormModal";
import FormModal from "../components/FormModal";
function CollectionPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(sampleCollections.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedCollections = sampleCollections.slice(startIndex, endIndex);

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
                            Collections
                        </h1>
                        <Button
                            className="text-lg text-surface-100 bg-primary-500 hover:bg-primary-600 justify-self-end py-2 px-4"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={toggleModal}
                        >
                            Create Collection{" "} 
                            {/* <FaPlus className="inline ml-2"/> */}
                        </Button>
                    </div>

                    <CollectionTable collections={displayedCollections} />
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    {isOpen && <FormModal title="Create New Collection" placeholder1={"Disease Term"} placeholder2={"Title"} ctaText={"Create"}   onCancel={toggleModal} onSubmit={toggleModal} />}


                </div>

                <Footer />
            </div>
        </>
    );
}

export default CollectionPage;
