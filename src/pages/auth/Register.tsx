import { Navigate, useNavigate } from "react-router-dom";
import { AuthForm, AuthLink } from "@/components/auth/AuthForm";
import { AuthLayout } from "@/layouts/AuthLayout";

import { useAuthStore } from "@/store/auth-store";

export default function Register() {
  const navigate = useNavigate();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const register = useAuthStore((state) => state.register);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <AuthLayout
      eyebrow="Create space"
      title="Begin with a quiet workspace."
      description="Set up Drift in a few seconds and keep your thoughts close."
    >
      <AuthForm
        mode="register"
        submitLabel="Create account"
        onSubmit={(email) => {
          register(email);
          navigate("/", {
            replace: true,
          });
        }}
        footer={
          <>
            Already have an account?{" "}
            <AuthLink to="/login">
              Sign in
            </AuthLink>
          </>
        }
      />
    </AuthLayout>
  );
}
