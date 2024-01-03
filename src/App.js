import { LogInProvider } from "./Context/LogInContext";
import LogIn from "./Pages/LogIn/LogIn";
import { HashRouter, Routes, Route } from "react-router-dom"; // Import HashRouter
import ProductList from "./Pages/ProductList/ProductList";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddProduct from "./Actions/AddProduct/AddProduct";
import DBoard from "./Pages/DashBoard/DBoard";

function App() {
  return (
    <div>
      <LogInProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/dashboard" element={<DBoard />} />
            <Route path="/productList" element={<ProductList />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/addproduct/:id" element={<AddProduct />} />
          </Routes>
          <ToastContainer />
        </HashRouter>
      </LogInProvider>
    </div>
  );
}

export default App;
