import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { AuthForm, AuthLink } from "@/components/auth/AuthForm";
import { AuthLayout } from "@/layouts/AuthLayout";

import { useAuthStore } from "@/store/auth-store";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/";

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const signIn = useAuthStore((state) => state.signIn);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Enter your calm thinking space."
      description="Sign in to continue capturing thoughts with less friction."
    >
      <AuthForm
        mode="login"
        submitLabel="Sign in"
        onSubmit={(email) => {
          signIn(email);
          navigate(from, {
            replace: true,
          });
        }}
        footer={
          <>
            New to Drift?{" "}
            <AuthLink to="/register">
              Create account
            </AuthLink>
          </>
        }
      />
    </AuthLayout>
  );
}
