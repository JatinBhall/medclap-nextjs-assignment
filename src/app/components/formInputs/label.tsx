const Label = ({ text,className, required }: {className:string; text: string, required: boolean }) => {
    return (
        <div className={`font-semibold text-sm ${className} `}>{text} {required && <span className="text-[red]">*</span>}</div>
    )
}

export default Label