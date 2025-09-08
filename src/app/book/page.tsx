"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const services = [
  "Store Leasing & Management",
  "Fuel Branding & Supply",
  "Wholesale Distribution",
  "Construction & Renovation",
] as const;

function BookForm() {
  const search = useSearchParams();
  const [service, setService] = useState<typeof services[number] | "">("");
  const [designatedEmail, setDesignatedEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const s = search.get("service");
    const e = search.get("email");
    if (s && services.includes(s as any)) setService(s as any);
    if (e) setDesignatedEmail(e);
  }, [search]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      const res = await fetch("/api/book-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service, designatedEmail, date, time, name, userEmail }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus({ ok: false, msg: data?.error || "Failed to send booking request" });
      } else {
        setStatus({ ok: true, msg: "Request sent. Please wait for acceptance email." });
        if (!search.get("service")) setService("");
        setDate(""); setTime(""); setName(""); setUserEmail("");
      }
    } catch {
      setStatus({ ok: false, msg: "Network error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-lg bg-white shadow-sm border border-gray-100 rounded-xl p-6 sm:p-8">
      <h1 className="text-2xl font-semibold text-gray-900">Book a Session</h1>
      <p className="text-sm text-gray-600 mt-1">We will email you once accepted.</p>

      {status && (
        <div className={`mt-4 rounded-md px-3 py-2 text-sm ${status.ok ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {status.msg}
        </div>
      )}

      <form onSubmit={submit} className="mt-6 space-y-4">
        {service ? (
          <div>
            <label className="block text-sm font-medium text-gray-700">Service</label>
            <div className="mt-1 text-gray-900 px-3 py-2 border border-gray-200 rounded-md bg-gray-50">
              {service}
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700">Service</label>
            <select
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
              value={service}
              onChange={(e) => setService(e.target.value as any)}
              required
            >
              <option value="" disabled>Select a service</option>
              {services.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input type="date" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input type="time" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300" value={time} onChange={(e) => setTime(e.target.value)} required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Your Email</label>
          <input type="email" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required />
        </div>

        <button type="submit" disabled={loading} className="w-full bg-[#f97316] hover:bg-orange-600 disabled:bg-orange-400 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-md transition-colors">
          {loading ? "Sending..." : "Submit Booking"}
        </button>
      </form>
    </div>
  );
}

export default function BookPage() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <Suspense fallback={<div className="w-full max-w-lg bg-white shadow-sm border border-gray-100 rounded-xl p-6 sm:p-8">
        <h1 className="text-2xl font-semibold text-gray-900">Book a Session</h1>
        <p className="text-sm text-gray-600 mt-1">Loading...</p>
      </div>}>
        <BookForm />
      </Suspense>
    </main>
  );
}


