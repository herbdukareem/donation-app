const Preloader = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-opacity duration-500">
      <img src="/lovable-uploads/069103c6-68f8-4425-912d-32a7bedc9a21.png" alt="UNILORIN @ 50 Logo" className="w-40 animate-pulse" />
      <p className="mt-4 text-neutral-700 text-sm font-medium">Celebrating 50 Years of Excellence</p>
    </div>
  );
};

export default Preloader;
