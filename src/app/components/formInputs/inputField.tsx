const InputField = ({
    className,
    required,
    type,
    placeholder,
    value,
    onChange
}: {
    className: string;
    type: string;
    required: boolean;
    placeholder: string;
    value: string | number;
    onChange: (arg0: string) => void
}) => {

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        onChange(event.target.value)
    }
    return (
        <input
            className={`w-full rounded-lg text-sm leading-5 border-2 border-[oklch(0.9020.063306.703)] focus:border-purple-500 focus:outline-none bg-[rgb(243,243,245)] py-1 px-3 ${className} `}
            type={type}
            placeholder={placeholder}
            value={value}
            required={required}
            onChange={handleOnChange}
        />
    )
}

export default InputField