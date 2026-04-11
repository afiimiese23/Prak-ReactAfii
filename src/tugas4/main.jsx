import { createRoot } from "react-dom/client";
import './tailwind.css';
import App from "./App";
// import FrameworkListSearchFilter from "./FrameworkListSearchFilter";
// import FrameworkList from "./FrameworkList";
import DestinationsData from "./destinations.json";
// import ResponsiveText from "./ResponsiveDesign";


createRoot(document.getElementById("root"))
  .render(
    <div>
      <App/>
    </div>
  )