import React from 'react';

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-16 min-h-[400px] bg-custom-dark from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin animation-delay-300"></div>
      </div>
      <p className="mt-6 text-lg text-[#FFD369] font-medium">{message}</p>
      <div className="mt-4 flex space-x-1">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-0"></div>
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce animation-delay-100"></div>
        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce animation-delay-200"></div>
      </div>
    </div>
  );
};

export default Loading;



