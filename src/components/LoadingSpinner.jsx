const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-[50vh]">
      <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-primary"></div>
    </div>
  );
};

export default LoadingSpinner;
