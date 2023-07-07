import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./screens/Home/Home";
import { ProductDetails } from "./screens/Products/ProductDetails/ProductsDetails";
import { Categories } from "./screens/Categories/Categories";
import { Products } from "./screens/Products/Products";
import { CreateProduct } from "./screens/Products/CreateProduct/CreateProduct";
import { EditProduct } from "./screens/Products/EditProduct/EditProduct";
import { Cart } from "./screens/Cart/Cart";
import { Login } from "./screens/Auth/Login/Login";
import { Register } from "./screens/Auth/Register/Register";
import { ThemeProvider } from "./context/ThemeContext";

function App() {

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<Home/>} />
            <Route path="/categories" element={<Categories/>} />
            <Route path="/products" element={<Products/>}/>
            <Route path="/products/:id" element={<ProductDetails/>} />
            <Route path="/products/create" element={<CreateProduct/>} />
            <Route path="/products/edit/:id" element={<EditProduct/>} />
            <Route path="/cart-detail" element={<Cart/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
