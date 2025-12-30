import { Link } from "react-router-dom";

const SchoolNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-6 sm:p-8 text-center space-y-4">
        {/* Icon */}
        <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-xl">🏫</span>
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold text-gray-900">
          School not found
        </h1>

        {/* Message */}
        <p className="text-sm text-gray-600">
          We couldn’t find a school associated with this address. Please check
          the link or contact your school administrator.
        </p>

        {/* Actions */}
        <div className="pt-4 space-y-3">
          <button
            className="block w-full rounded-md bg-black text-white py-2 text-sm font-medium hover:opacity-90 transition"
            onClick={() =>
              (window.location.href = import.meta.env.VITE_MAIN_SITE_URL)
            }
          >
            Go to Main Site
          </button>

          <a
            href="mailto:support@yourdomain.com"
            className="block text-sm text-gray-500 hover:text-gray-700"
          >
            Contact support
          </a>
        </div>
      </div>
    </div>
  );
};

export default SchoolNotFound;
