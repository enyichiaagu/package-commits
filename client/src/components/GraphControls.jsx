function GraphControls() {
  return (
    <div className='my-8 flex'>
      <span className='px-6 py-0.5 bg-black text-white shadow-md'>Daily</span>
      <span className='px-6 py-0.5'>Monthly</span>

      <select className='ml-auto'>
        <option>Current</option>
      </select>
    </div>
  );
}

export default GraphControls;
