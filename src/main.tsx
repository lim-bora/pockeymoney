import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./reset.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    {/* 브라우저 현재 주소를 저장하고 감지하는 역할 */}
    <App />
  </BrowserRouter>
);
