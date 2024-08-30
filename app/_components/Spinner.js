function Spinner() {
  return (
    <div
      className="inline-block h-12 w-12 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-surface opacity-300 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite] text-red-500"
      role="status"
    >
      <span className="text-green-500 !absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
}

export default Spinner;
