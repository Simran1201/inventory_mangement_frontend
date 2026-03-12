import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <div style={{ width: "100%", height: "100%" }}>
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
