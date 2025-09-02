export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, username } = body ?? {};

    if (!email || !password) {
      return Response.json({ success: false, error: "Email and password required" }, { status: 400 });
    }

    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);
    if (username) formData.append('username', username);

    const res = await fetch(`${process.env.WP_URL}/wp-json/lama/v1/register`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded",
        "x-api-key": process.env.WP_HEADLESS_API_KEY!
      },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok || !data?.success) {
      return Response.json({ success: false, error: data?.error || "Registration failed" }, { status: res.status || 400 });
    }

    return Response.json({ success: true, user_id: data.user_id });
  } catch (e: any) {
    return Response.json({ success: false, error: e?.message || "Unexpected error" }, { status: 500 });
  }
}


