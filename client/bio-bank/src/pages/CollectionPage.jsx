import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CollectionTable from "../components/CollectionTable";
import Button from "../components/Button";
import Pagination from "../components/Pagination";
import FormModal from "../components/FormModal";
import useSWR,{ useSWRConfig } from "swr"
import axios from "axios"
import SkeletonLoader from "../components/SkeletonLoader";

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
    const {mutate} = useSWRConfig();
    const DEFAULT_PAGE_LIMIT = 5;
    const {data,  error, isLoading} = useSWR(`http://localhost:5050/api/v1/collections?page=${currentPage} & limit=${DEFAULT_PAGE_LIMIT} `,fetcher)
    const totalPages = Math.ceil(data && data.totalRecords/ DEFAULT_PAGE_LIMIT);
    // console.log(totalPages);

    const toggleModal = () => {
      setIsOpen(!isOpen);
    };
    const handlePageChange = async (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
          setCurrentPage(newPage);
          setIsMutating(true);
          const newData = await fetcher(`http://localhost:5050/api/v1/collections?page=${newPage}`);
          mutate(newData, false);
          setIsMutating(false);
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
                            onClick={toggleModal}
                        >
                            Create Collection{" "} 
                           
                        </Button>
                    </div>
                    {error && <p>There was an error fetching data</p>}
                    {isLoading ? (
                    <>
                    <SkeletonLoader />
                    </>)   :
                    (<>
                          <CollectionTable collections={data.result} />
                          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                          {isOpen && (
                            <FormModal
                              title="Create New Collection"
                              placeholder1={"Disease Term"}
                              placeholder2={"Title"}
                              ctaText={"Create"}
                              onCancel={toggleModal}
                              onSubmit={toggleModal}
                              type1={"text"}
                              type2={"text"}
                            />
                          )}
                    </>
                    )
                
                }
                </div>

                <Footer />
            </div>
        </>
    );
}

export default CollectionPage;
