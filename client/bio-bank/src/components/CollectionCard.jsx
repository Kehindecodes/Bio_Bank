import React from 'react';

const CollectionCards = ({ collections }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {collections.map((collection) => (
        <div
          key={collection.id}
          className="bg-white rounded-lg overflow-hidden shadow-md p-4"
        >
          <h3 className="text-lg font-semibold mb-2">{collection.title}</h3>
          <p className="text-gray-600">
            <strong>ID:</strong> {collection.id}
          </p>
          <p className="text-gray-600">
            <strong>Disease Term:</strong> {collection.diseaseTerm}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CollectionCards;
