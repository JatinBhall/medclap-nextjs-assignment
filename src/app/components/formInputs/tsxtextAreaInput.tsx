const TextAreaInputField = ({
    className,
    required,
    placeholder,
    value,
    onChange
}: {
    className: string;
    required: boolean;
    placeholder: string;
    value: string;
    onChange: (arg0: string) => void
}) => {

    function handleOnChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        onChange(event.target.value)
    }
    return (
        <textarea
            className={`w-full rounded-lg text-sm leading-5 border-2 border-[oklch(0.9020.063306.703)] focus:border-purple-500 focus:outline-none bg-[rgb(243,243,245)] py-1 px-3 ${className} `}
            placeholder={placeholder}
            value={value}
            rows={4}
            required={required}
            onChange={handleOnChange}
        />
    )
}

export default TextAreaInputField