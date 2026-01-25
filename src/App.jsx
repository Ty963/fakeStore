import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import 'bootstrap/dist/css/bootstrap.min.css';

// Layout
import { Layout } from './components/Layout/Layout.jsx';

// Pages
import LoginPage from './pages/Login/LoginPage.jsx';
import RegisterPage from './pages/Register/Register.jsx';
import HomePage from './pages/Home/HomePage.jsx';
import ProductsPage from './pages/Products/ProductsPage.jsx';
import ProductDetailPage from './pages/ProductDetail/ProductDetailPage.jsx';
import CartPage from './pages/Cart/CartPage.jsx';
import SellPage from './pages/Sell/SellPage.jsx';
import ProfilePage from './pages/Profile/ProfilePage.jsx';
import TestPage from './pages/test/test.jsx';
import NotFoundPage from "./pages/NotFound/NotFoundPage.jsx";
import UnauthorizedPage from './pages/Unauthorized/UnauthorizedPage.jsx';

function App() {
    const { user, loading } = useAuth();

    // Show loading screen while checking auth
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '1.5rem'
            }}>
                Loading...
            </div>
        );
    }

    // Protected route component
    function ProtectedRoute({ element }) {
        return user ? element : <Navigate to="/unauthorized" replace />;
    }

    return (
        <BrowserRouter>
            <Routes>
                {/* PUBLIC ROUTES - No layout needed */}
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
                <Route path="/not-found" element={<NotFoundPage />} />

                {/* PROTECTED ROUTES - Wrapped in Layout */}
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute
                            element={
                                <Layout>
                                    <HomePage />
                                </Layout>
                            }
                        />
                    }
                />

                {/* Products Routes */}
                <Route
                    path="/products"
                    element={
                        <ProtectedRoute
                            element={
                                <Layout>
                                    <ProductsPage />
                                </Layout>
                            }
                        />
                    }
                />
                <Route
                    path="/product/:id"
                    element={
                        <ProtectedRoute
                            element={
                                <Layout>
                                    <ProductDetailPage />
                                </Layout>
                            }
                        />
                    }
                />

                {/* Cart Route */}
                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute
                            element={
                                <Layout>
                                    <CartPage />
                                </Layout>
                            }
                        />
                    }
                />

                {/* Sell Route */}
                <Route
                    path="/sell"
                    element={
                        <ProtectedRoute
                            element={
                                <Layout>
                                    <SellPage />
                                </Layout>
                            }
                        />
                    }
                />

                {/* Profile Route */}
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute
                            element={
                                <Layout>
                                    <ProfilePage />
                                </Layout>
                            }
                        />
                    }
                />

                {/* Test Page */}
                <Route
                    path="/test"
                    element={
                        <ProtectedRoute
                            element={
                                <Layout>
                                    <TestPage />
                                </Layout>
                            }
                        />
                    }
                />

                {/* Catch all - 404 */}
                <Route path="*" element={<Navigate to="/not-found" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;