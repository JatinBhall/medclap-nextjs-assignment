const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                    <p className="text-lg">Medical Card Eligibility Checker</p>
                    <p className="text-sm mt-2 opacity-90">
                        © {new Date().getFullYear()} All rights reserved. For informational purposes only.
                    </p>
                    <p className="text-xs mt-2 opacity-75">
                        This tool is not meant for collecting PII or securing sensitive data.
                    </p>
                </div>
            </div>
        </footer>)
}

export default Footer