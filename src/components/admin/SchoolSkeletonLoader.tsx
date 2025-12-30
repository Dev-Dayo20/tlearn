const SchoolSkeletonLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 sm:p-8 space-y-6">
        {/* Logo skeleton */}
        <div className="flex flex-col items-center space-y-3">
          <div className="h-14 w-32 bg-gray-200 rounded-md animate-pulse" />
          <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Form skeleton */}
        <div className="space-y-4 mt-6">
          <div className="h-10 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 bg-gray-200 rounded animate-pulse" />
          <div className="h-11 bg-gray-300 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default SchoolSkeletonLoader;
