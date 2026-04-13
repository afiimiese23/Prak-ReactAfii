import { createRoot } from "react-dom/client";
import TailwindCSS from "./TailwindCSS";
import Typography from "./Typography";
import FlexboxGrid from "./FlexboxGrid";
import UserForm from "./UserForm";
import './tailwind.css';
import HitungGajiForm from "./HitungGajiForm";

createRoot(document.getElementById("root"))
  .render(
    <div>
      {/* <TailwindCSS/>
      <Typography/>
      <FlexboxGrid/>
      <UserForm/> */}
      <HitungGajiForm/>
    </div>
  )