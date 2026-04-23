import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card border-0 shadow-lg">
            <div className="card-body p-4 p-md-5">
              <h2 className="text-center mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                {title}
              </h2>
              {subtitle ? <p className="text-center text-muted mb-4">{subtitle}</p> : null}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const redirectPath = location.state?.from || "/dashboard";

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError("");
      await login(formData.email, formData.password);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to login");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Login to view your cart, orders, and checkout.">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required minLength={6} />
        </div>
        {error ? <div className="alert alert-danger py-2">{error}</div> : null}
        <button type="submit" className="btn btn-dark w-100" disabled={submitting}>
          {submitting ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="mt-4 text-center mb-0">
        New here? <Link to="/register">Create an account</Link>
      </p>
    </AuthLayout>
  );
}

export function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const redirectPath = location.state?.from || "/dashboard";

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError("");
      await register(formData.name, formData.email, formData.password);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to register");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Join Krishna Jewellers for a personalized shopping experience.">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required minLength={6} />
        </div>
        {error ? <div className="alert alert-danger py-2">{error}</div> : null}
        <button type="submit" className="btn btn-dark w-100" disabled={submitting}>
          {submitting ? "Creating account..." : "Register"}
        </button>
      </form>
      <p className="mt-4 text-center mb-0">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </AuthLayout>
  );
}
