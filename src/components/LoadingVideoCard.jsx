function LoadingVideoCard() {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 relative">
      <div className="flex flex-col gap-2">
        <div className="w-full h-36 bg-gradient-to-r from-white to-transparent animate-shimmer rounded-md"></div>
        <div className="flex flex-col">
          <div className="w-full h-6 bg-gray-500 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingVideoCard;
