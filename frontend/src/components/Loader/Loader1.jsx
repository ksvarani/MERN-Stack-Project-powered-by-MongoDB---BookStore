import React from 'react';

const Loader1 = () => {
  return (
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto" />
      <h2 className="text-zinc-900 dark:text-white text-4xl font-semibold mt-4">Loading...</h2>
      <p className="text-zinc-600 dark:text-zinc-400 mt-4 text-xl font-mono">
        Your Profile is Getting Ready, Please Wait!
      </p>
    </div>
  );
}

export default Loader1;
