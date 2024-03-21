const SampleTable = ({samples}) => {
    return (
        <table className="min-w-full border-collapse rounded-xl overflow-hidden table-auto mt-8 bg-surface-200 backdrop-blur-lg backdrop-saturate-150 ">
            <thead>
                <tr className=" text-white">
                    <th className="py-4 px-4 border-b border-line-divider">Donor Count</th>
                    <th className="py-4 px-4 border-b border-line-divider ">Material Type </th>
                    <th className="py-4 px-4 border-b border-line-divider ">Updated At</th>
                </tr>
            </thead>
            <tbody>
                {samples.map((sample, index) => (
                    <tr key={sample.id} className={`${
                        index === samples.length - 1 ? '' : 'border-b border-line-divider'
                    } hover:bg-surface-300`}>
                        <td className="py-4 px-4 text-center text-surface-600">{sample.donorCount}</td>
                        <td className="py-4 px-4 text-center text-surface-600">{sample.materialType}</td>
                        <td className="py-4 px-4 text-center text-surface-600"> {new Date(sample.updatedAt).toLocaleDateString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )

}

export default SampleTable