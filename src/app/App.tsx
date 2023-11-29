import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./screens/Home/Home";
import { ProductDetails } from "./screens/Products/ProductDetails/ProductDetails";
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
import { UserProvider } from "./context/UserContext";
import { RegisterSuccess } from "./screens/Auth/RegisterSuccess/RegisterSuccess";
import { RedirectAuth } from "./components/RedirectAuth/RedirectAuth";
import { RequireAuth } from "./components/RequireAuth/RequireAuth";
import { RequireAdmin } from "./components/RequireAdmin/RequireAdmin";
import { CreateCategory } from "./screens/Categories/CreateCategory/CreateCategory";
import { EditCategory } from "./screens/Categories/EditCategory/EditCategory";
import { CartProvider } from "./context/CartContext";
import { BuySuccess } from "./screens/BuySuccess/BuySuccess";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <UserProvider>
            <AuthProvider>
              <CartProvider>
                <Routes>
                  <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route
                      path="/categories/edit/:id"
                      element={
                          <EditCategory />
                        
                      }
                    />
                    <Route
                      path="/categories/create"
                      element={
                          <CreateCategory />
                        
                      }
                    />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route
                      path="/products/create"
                      element={
                        
                          <CreateProduct />
                        
                      }
                    />
                    <Route
                      path="/products/edit/:id"
                      element={
                        
                          <EditProduct />
                        
                      }
                    />
                    <Route
                      path="/cart-detail"
                      element={
                        
                          <Cart />
                        
                      }
                    />
                    <Route
                      path="/buy-success"
                      element={
                        
                          <BuySuccess />
                        
                      }
                    />
                    <Route
                      path="/login"
                      element={
                        
                          <Login />
                        
                      }
                    />
                    <Route
                      path="/register"
                      element={
                        
                          <Register />
                        
                      }
                    />
                    <Route path="/error/login" element={<ErrorLogin />} />
                    <Route
                      path="/register/success"
                      element={<RegisterSuccess />}
                    />
                  </Route>
                </Routes>
              </CartProvider>
            </AuthProvider>
          </UserProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
