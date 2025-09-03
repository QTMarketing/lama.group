const WP_API_BASE = process.env.WP_API_BASE!;
const WP_HEADLESS_API_KEY = process.env.WP_HEADLESS_API_KEY!;

// Sign-up (OTP request)
export async function requestOtp(email: string, name?: string, username?: string) {
  const res = await fetch(`${WP_API_BASE}/lama/v1/auth/request-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-lama-api-key": WP_HEADLESS_API_KEY },
    body: JSON.stringify({ email, name, username }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Forgot/reset (optional, but requested)
export async function forgotPassword(email: string, callbackUrl?: string) {
  const res = await fetch(`${WP_API_BASE}/lama/v1/auth/forgot`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-lama-api-key": WP_HEADLESS_API_KEY },
    body: JSON.stringify({ email, callbackUrl }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function resetPassword(login: string, key: string, newPassword: string) {
  const res = await fetch(`${WP_API_BASE}/lama/v1/auth/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-lama-api-key": WP_HEADLESS_API_KEY },
    body: JSON.stringify({ login, key, password: newPassword }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<{ id: number; email: string; name: string }>;
}

