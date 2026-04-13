const InputField = ({ label, type, placeholder, onChange, error, className }) => {
  return (
    <div className="mb-3">
      <label className="block mb-1">{label}</label>
      <input type={type} placeholder={placeholder} onChange={onChange} className={className} />
      {error && (
        <div className="bg-red-100 text-red-600 text-sm p-1 mt-1 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default InputField;