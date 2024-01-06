export const NotFound = ({value}) => {
	return (
		<div className='flex items-center justify-center h-screen w-full'>
			<div className='text-center'>
				<h1
					className='text-4xl font-bold text-surface-600
			'>
                    {value}
				</h1>
			</div>
		</div>
	);
};
