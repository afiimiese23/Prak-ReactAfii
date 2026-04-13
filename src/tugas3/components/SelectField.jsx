const SelectField = ({ value, onChange, children }) => {
  return (
    <select value={value} onChange={onChange} className="w-full p-2 border rounded mb-2">
      {children}
    </select>
  );
};

export default SelectField;