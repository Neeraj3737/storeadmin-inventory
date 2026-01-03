import React from 'react';

interface ErrorDisplayProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  message = 'Something went wrong. Please try again later.',
  onRetry
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-16 min-h-[400px] text-center bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl border border-red-100">
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
          ⚠️
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
          <span className="text-xs">!</span>
        </div>
      </div>
      <h2 className="text-red-600 mb-4 text-3xl font-bold">Oops! An error occurred</h2>
      <p className="text-gray-700 mb-8 max-w-md leading-relaxed text-lg">{message}</p>
      {onRetry && (
        <button
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-none px-8 py-4 rounded-xl font-semibold cursor-pointer transition-all duration-300 hover:from-red-600 hover:to-pink-600 hover:shadow-lg transform hover:scale-105 active:scale-95 flex items-center gap-2"
          onClick={onRetry}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;



