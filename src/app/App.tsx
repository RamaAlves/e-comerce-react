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
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./context/AuthContext";
import { ErrorLogin } from "./screens/Auth/ErrorLogin/ErrorLogin";
/* import { UserProvider } from "./context/UserContext"; */
import { RegisterSuccess } from "./screens/Auth/RegisterSuccess/RegisterSuccess";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          {/* <UserProvider> */}
            <BrowserRouter>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetails />} />
                  <Route path="/products/create" element={<CreateProduct />} />
                  <Route path="/products/edit/:id" element={<EditProduct />} />
                  <Route path="/cart-detail" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/error/login" element={<ErrorLogin />} />
                  <Route path="/register/success" element={<RegisterSuccess/>} />
                </Route>
              </Routes>
            </BrowserRouter>
          {/* </UserProvider> */}
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
