"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import PasswordField from "@/components/auth/PasswordField";
import PasswordStrengthBar from "@/components/auth/PasswordStrengthBar";
import GoogleButton from "@/components/auth/GoogleButton";
import { checkPassword, strengthLabelFromScore, type PasswordChecks } from "@/utils/password";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ form?: string; username?: string; email?: string; password?: string; confirm?: string }>({});

  // Compute password checks and score whenever the password changes.
  const checks = useMemo<PasswordChecks>(() => checkPassword(password), [password]);
  const score = checks.score; // 0-4 based on first 4 rules (noAngles is enforced but not scored)
  const strengthLabel = strengthLabelFromScore(score);

  // Basic client-side email validation
  const isValidEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const nextErrors: typeof errors = {};

    if (!username.trim()) nextErrors.username = "Username is required.";
    if (!email.trim() || !isValidEmail(email)) nextErrors.email = "Enter a valid email address.";

    // Password rule enforcement: all must pass and noAngles must be true.
    if (!checks.length || !checks.upperLower || !checks.number || !checks.special) {
      nextErrors.password = "Password does not meet the required rules.";
    }
    if (!checks.noAngles) {
      nextErrors.password = "Password cannot contain < or > characters.";
    }

    if (confirm !== password) nextErrors.confirm = "Passwords do not match.";

    setErrors(nextErrors);

    // If any error exists, stop here
    if (Object.keys(nextErrors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      // Step 1: Create account via WordPress REST API
      const base = process.env.NEXT_PUBLIC_WP_API;
      if (!base) {
        setErrors({ form: "Missing NEXT_PUBLIC_WP_API environment variable." });
        setLoading(false);
        return;
      }

      const res = await fetch(`${base}/lama/v1/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_WP_HEADLESS_API_KEY || "",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        // Handle specific error codes from WordPress
        if (data?.code === "account_exists") {
          setErrors({ form: "Account already exists" });
        } else {
          setErrors({ form: data?.message || "Signup failed" });
        }
        setLoading(false);
        return;
      }

      // Step 2: Account created successfully, now log in immediately
      console.log("User created:", data);
      
      const signInResult = await signIn("credentials", {
        redirect: false,
        login: username?.trim() || "",
        password: password || "",
        mode: "password",
        callbackUrl: `${window.location.origin}/` // always valid absolute URL
      });

      if (signInResult?.error) {
        // Login failed - show error but account was created
        console.error("Auto-login failed:", signInResult.error);
        setErrors({ form: "Account created but login failed. Please try logging in manually." });
        setLoading(false);
        return;
      }

      // Step 3: Login successful, redirect to homepage
      router.push("/");
      
    } catch (err) {
      console.error("Error during signup/login:", err);
      setErrors({ form: "Something went wrong. Please try again." });
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-sm border border-gray-100 rounded-xl p-6 sm:p-8">
        <h1 className="text-2xl font-semibold text-gray-900">Create your account</h1>
        <p className="text-sm text-gray-600 mt-1">Join LoMa Group.</p>

        {/* Google Sign-In */}
        <div className="mt-6">
          <GoogleButton
            label="Sign in with Google"
            onClick={() => {
              // Trigger Google OAuth sign-in
              signIn("google", { callbackUrl: `${window.location.origin}/` });
            }}
          />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-xs uppercase tracking-wider text-gray-500">or</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.form && (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {errors.form}
            </div>
          )}
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
              placeholder="yourname"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            </div>
            <PasswordField
              id="password"
              name="password"
              value={password}
              onChange={setPassword}
              placeholder="Create a strong password"
            />
            {/* Strength bar */}
            <div className="mt-3">
              <PasswordStrengthBar score={score} label={strengthLabel} />
            </div>
            {/* Rule hints */}
            <ul className="mt-3 space-y-1 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <RuleDot ok={checks.length} /> At least 8 characters
              </li>
              <li className="flex items-center gap-2">
                <RuleDot ok={checks.upperLower} /> Uppercase and lowercase letters
              </li>
              <li className="flex items-center gap-2">
                <RuleDot ok={checks.number} /> At least one number
              </li>
              <li className="flex items-center gap-2">
                <RuleDot ok={checks.special} /> At least one special character: ! @ # ? ]
              </li>
              <li className="flex items-center gap-2">
                <RuleDot ok={checks.noAngles} /> Do not use &lt; or &gt;
              </li>
            </ul>
            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">Confirm password</label>
            <PasswordField
              id="confirm"
              name="confirm"
              value={confirm}
              onChange={setConfirm}
              placeholder="Re-enter your password"
            />
            {errors.confirm && <p className="mt-1 text-sm text-red-600">{errors.confirm}</p>}
          </div>

          {/* Submit CTA with brand color #f97316 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f97316] hover:bg-orange-600 disabled:bg-orange-400 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-md transition-colors"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          {/* Already have an account */}
          <p className="text-sm text-gray-600 text-center">
            Already have an account? <a href="/login" className="text-[#f97316] hover:underline">Sign In</a>
          </p>
        </form>
      </div>
    </main>
  );
}

// Simple visual indicator for rule checks
function RuleDot({ ok }: { ok: boolean }) {
  return (
    <span
      className={`inline-block h-2.5 w-2.5 rounded-full ${ok ? "bg-green-500" : "bg-gray-300"}`}
      aria-hidden="true"
    />
  );
}


