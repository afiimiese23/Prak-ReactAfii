import { createRoot } from "react-dom/client";
import './tailwind.css';
import FrameworkListSearchFilter from "./FrameworkListSearchFilter";
import FrameworkList from "./FrameworkList";
import frameworkData from "./framework.json";
import ResponsiveText from "./ResponsiveDesign";


createRoot(document.getElementById("root"))
  .render(
    <div>
      {/* <FrameworkList /> */}
      {/* <FrameworkListSearchFilter /> */}
      <ResponsiveText />
    </div>
  )