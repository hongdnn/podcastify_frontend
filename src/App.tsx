import {
    BrowserRouter,
    Routes,
    Route,
    Outlet,
    Navigate,
} from "react-router-dom";
import Home from "./app/home/Home";
import Step1 from "./app/onboarding/Step1";
import Step2 from "./app/onboarding/Step2";
import { OnboardingProvider } from "./context/OnboardingContext";
import Step3 from "./app/onboarding/Step3";
import Step4 from "./app/onboarding/Step4";
import Step5 from "./app/onboarding/Step5";
import Dashboard from "./app/dashboard/Dashboard";
import Login from "./app/login/Login";
import RequireAuth from "./components/RequireAuth";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";

function OnboardingRoutes() {
    return (
        <OnboardingProvider>
            <Outlet />
        </OnboardingProvider>
    );
}

function AuthenticatedOnlyRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) return <Navigate to="/dashboard" replace />;

    return <>{children}</>;
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <AuthenticatedOnlyRoute>
                                <Home />
                            </AuthenticatedOnlyRoute>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <RequireAuth>
                                <OnboardingProvider>
                                    <Dashboard />
                                </OnboardingProvider>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <AuthenticatedOnlyRoute>
                                <Login />
                            </AuthenticatedOnlyRoute>
                        }
                    />
                    <Route path="/onboarding/*" element={<OnboardingRoutes />}>
                        <Route path="step-1" element={<Step1 />} />
                        <Route path="step-2" element={<Step2 />} />
                        <Route path="step-3" element={<Step3 />} />
                        <Route path="step-4" element={<Step4 />} />
                        <Route path="step-5" element={<Step5 />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
