import Button from "./Button";
import { Link } from "react-router-dom";

const CollectionTable = ({ collections}) => {
  return (
    <table className="min-w-full border-collapse rounded-xl overflow-hidden table-auto mt-8 bg-surface-200 backdrop-blur-lg backdrop-saturate-150 ">
      <thead>
        <tr className=" text-white">
          <th className="py-4 px-4 border-b border-line-divider ">Disease Term</th>
          <th className="py-4 px-4 border-b border-line-divider">Title</th>
          <th className="py-4 px-4 border-b border-line-divider "></th>
        </tr>
      </thead>
      <tbody>
        {collections.map((collection, index) => (
          <tr key={collection.id} className={`${
            index === collections.length - 1 ? '' : 'border-b border-line-divider'
          } hover:bg-surface-300`}>
            <td className="py-4 px-4  text-center text-surface-600">{collection.diseaseTerm}</td>
            <td className="py-4 px-4  text-center text-surface-600">{collection.title}</td>
            <td className="py-4 px-4 ">
              <Link to={`/collections/${collection.id}/samples`}>
              <Button type="outline" className="text-primary-500">
                View Samples
              </Button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CollectionTable;

