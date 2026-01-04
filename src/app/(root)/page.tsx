import SparklesIcon from "../components/icons/sparklesIcon";
import ShieldIcon from "../components/icons/shieldIcon";
import CheckCircleIcon from "../components/icons/checkCircleIcon";
import StateSelector from "../components/stateSelector";

const HomePage = () => {

  return (
    <div className="min-h-[80vh] bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4 bg-linear-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent animate-pulse">
            Medical Card Eligibility Checker
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Check your eligibility for a medical card in your state. Simple, fast, and informative.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-linear-to-br from-blue-400 to-blue-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
            <SparklesIcon className="h-12 w-12 mb-4" />
            <h3 className="text-xl mb-2">Easy Process</h3>
            <p className="text-blue-50">Select your state and fill out a simple form to check eligibility</p>
          </div>
          <div className="bg-linear-to-br from-purple-400 to-purple-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
            <ShieldIcon className="h-12 w-12 mb-4" />
            <h3 className="text-xl mb-2">Secure & Private</h3>
            <p className="text-purple-50">Your information is handled with care (demo purposes only)</p>
          </div>
          <div className="bg-linear-to-br from-pink-400 to-pink-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
            <CheckCircleIcon className="h-12 w-12 mb-4" />
            <h3 className="text-xl mb-2">Instant Results</h3>
            <p className="text-pink-50">Get immediate confirmation after submitting your application</p>
          </div>
        </div>
        <StateSelector />
      </div>
    </div>
  );
}

export default HomePage