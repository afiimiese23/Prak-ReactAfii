import { createRoot } from "react-dom/client";
import FormPendaftaran from "./FormPendaftaran";
import './tailwind.css';

createRoot(document.getElementById("root"))
  .render(
    <div>
      <FormPendaftaran />
    </div>
  )