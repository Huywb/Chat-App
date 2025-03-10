const AuthImagePattern = ({ title, subtitle }) => {
    return (
      <div className="flex items-center justify-center p-12 max-h-screen">
        <div className="max-w-md text-center">
          {/* Grid chứa các ô vuông */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`w-30 h-30 rounded-2xl bg-gray-700 ${
                  i % 2 === 0 ? "animate-pulse" : ""
                }`}
              />
            ))}
          </div>
          {/* Tiêu đề và mô tả */}
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          <p className="text-gray-400">{subtitle}</p>
        </div>
      </div>
    );
  };
  
  export default AuthImagePattern;
  