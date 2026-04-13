import { useState } from "react";
import InputField from "./components/InputField";
import SelectField from "./components/SelectField";

export default function FormPendaftaran() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [umur, setUmur] = useState("");
  const [gender, setGender] = useState("");
  const [event, setEvent] = useState("");
  const [show, setShow] = useState(false);

  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "nama":
        if (!value) errorMsg = "Nama wajib diisi";
        else if (/\d/.test(value)) errorMsg = "Nama tidak boleh angka";
        else if (value.length < 3) errorMsg = "Nama minimal 3 huruf";
        break;

      case "email":
        if (!value) errorMsg = "Email wajib diisi";
        else if (!value.includes("@")) errorMsg = "Email harus ada @";
        else if (!value.endsWith(".com") && !value.endsWith(".id"))
          errorMsg = "Email harus .com atau .id";
        break;

      case "umur":
        if (!value) errorMsg = "Umur wajib diisi";
        else if (isNaN(value)) errorMsg = "Umur harus angka";
        else if (value < 17) errorMsg = "Minimal umur 17";
        break;

      default:
        break;
    }

    return errorMsg;
  };

  const errorNama = validateField("nama", nama);
  const errorEmail = validateField("email", email);
  const errorUmur = validateField("umur", umur);

  const isValid =
    !errorNama && !errorEmail && !errorUmur && gender && event;

  return (
    <div className="flex flex-col items-center justify-center m-5 p-5 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Form Pendaftaran
        </h2>

        {/* Nama */}
        <InputField label="Nama" placeholder="Masukkan Nama" 
          onChange={(e) => setNama(e.target.value)} error={errorNama}
          className="w-full p-2 border rounded"
        />

        {/* Email */}
        <InputField label="Email" placeholder="Masukkan Email"
          onChange={(e) => setEmail(e.target.value)} error={errorEmail}
          className="w-full p-2 border rounded"
        />

        {/* Umur */}
        <InputField label="Umur" placeholder="Masukkan Umur"
          onChange={(e) => setUmur(e.target.value)} error={errorUmur}
          className="w-full p-2 border rounded"
        />

        {/* Select */}
        <SelectField
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Pilih Gender</option>
          <option>Pria</option>
          <option>Wanita</option>
        </SelectField>
        {!gender && <p className="text-red-500 text-sm">Pilih gender</p>}

        {/* Event */}
        <SelectField
          value={event}
          onChange={(e) => setEvent(e.target.value)}
        >
          <option value="">Pilih Event</option>
          <option>Lomba Poster</option>
          <option>Seminar</option>
        </SelectField>
        {!event && <p className="text-red-500 text-sm">Pilih event</p>}

        {/* BUTTON */}
        {isValid && (
          <button
            type="button"
            onClick={() => setShow(true)}
            className="w-full bg-blue-500 text-white p-2 rounded mt-2"
          >
            Submit
          </button>
        )}

        {/* HASIL */}
        {show && (
          <div className="mt-4 p-3 bg-gray-100 rounded">
            <p>Nama: {nama}</p>
            <p>Email: {email}</p>
            <p>Umur: {umur}</p>
            <p>Gender: {gender}</p>
            <p>Event: {event}</p>
          </div>
        )}
      </div>
    </div>
  );
}