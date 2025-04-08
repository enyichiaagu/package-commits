const positions = [
  'bg-red-100 z-1 right-0',
  'bg-red-200 z-2 sm:right-3 right-1',
  'bg-red-300 z-3 sm:right-6 right-2',
  'bg-red-400 z-4 sm:right-9 right-3',
  'bg-red-500 z-5 sm:right-12 right-4',
];

function Contributors() {
  return (
    <div className='mt-8 flex justify-end sm:gap-2 gap-1'>
      <div className='relative'>
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <span
              key={index}
              className={`inline-block absolute w-5 h-5 rounded-full ${positions[index]}`}
            ></span>
          );
        })}
      </div>
      <span>30+ contributors</span>
    </div>
  );
}

export default Contributors;
