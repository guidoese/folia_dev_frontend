import React from "react";
import { Routes, Route } from "react-router";
import { LoginScreen } from "./Screens/LoginScreen/LoginScreen";
import { HomeScreen } from "./Screens/HomeScreen/HomeScreen";
import { RegisterScreen } from "./Screens/RegisterScreen/RegisterScreen";
import { Navigate } from "react-router";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { VerifyEmailScreen } from "./Screens/VerifyEmailScreen/VerufyEmailScreen";
import { ForgotPasswordScreen } from "./Screens/ForgotPasswordScreen/ForgotPasswordScreen";
import { ResetPasswordScreen } from "./Screens/ResetPasswordScreen/ResetPasswordScreen";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomeScreen />
          </ProtectedRoute>
        }
      />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/verify-email" element={<VerifyEmailScreen />} />
      <Route path="/" element={<LoginScreen />} />
      <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
      <Route path="/reset-password" element={<ResetPasswordScreen />} />
      <Route path="/*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};
export default App;
