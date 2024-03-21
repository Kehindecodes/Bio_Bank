/**
 * Creates a button component with customizable styles and behavior.
 *
 * @param {Object} props - The properties for the button component.
 * @param {string} [props.type='normal'] - The type of the button. Can be 'normal' or 'outline'.
 * @param {ReactNode} props.children - The content of the button.
 * @param {string} [props.className=''] - Additional CSS class names for the button.
 * @param {object} props.props - Additional props to be spread onto the button element.
 * @return {ReactElement} The rendered button component.
 */
const Button = ({ type = "normal", children, className = "", ...props }) => {
    return (
        <button
            type="button"
            className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full font-medium text-sm sm:text-base ${
                type === "outline"
                    ? "outline outline-offset-0 outline-primary-600 outline-1 text-primary-500 hover:bg-primary-600 hover:text-surface-100"
                    : "bg-blue-500 hover:bg-blue-600"
            } ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
