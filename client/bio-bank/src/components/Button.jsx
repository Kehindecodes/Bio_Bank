const Button = ({
    type = 'normal',
    children,
    className = '',
    ...props
  }) => {
    return (
      <button
        type="button"
        className={`px-4 py-2 rounded-full font-medium  ${
          type === 'outline'
            ? 'outline outline-offset-0 outline-primary-600 outline-1 text-primary-500 hover:bg-primary-600 hover:text-surface-100'
            : 'bg-blue-500 hover:bg-blue-600'
        } ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export default Button;