import Link from "next/link";

const NavLinkItem = ({
    children,
    text,
    link,
    className
}: {
    children: React.ReactNode;
    text: string;
    link: string;
    className: string;
}) => {
    return (
        <Link
            href={link}
            className={`flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-white/20 transition-all duration-200 ${className}`}
        >
            {children}
            <span>{text}</span>
        </Link>
    )
}

export default NavLinkItem