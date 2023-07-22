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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <UserProvider>
            <AuthProvider>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetails />} />
                  <Route
                    path="/products/create"
                    element={
                      <RequireAdmin>
                        <CreateProduct />
                      </RequireAdmin>
                    }
                  />
                  <Route
                    path="/products/edit/:id"
                    element={
                      <RequireAdmin>
                        <EditProduct />
                      </RequireAdmin>
                    }
                  />
                  <Route
                    path="/cart-detail"
                    element={
                      <RequireAuth>
                        <Cart />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <RedirectAuth>
                        <Login />
                      </RedirectAuth>
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <RedirectAuth>
                        <Register />
                      </RedirectAuth>
                    }
                  />
                  <Route path="/error/login" element={<ErrorLogin />} />
                  <Route
                    path="/register/success"
                    element={<RegisterSuccess />}
                  />
                </Route>
              </Routes>
            </AuthProvider>
          </UserProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
