'use client';

import { PageTemplate } from '@/components/templates/PageTemplate';

export default function ContactPage() {
  return (
    <PageTemplate>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
        <p className="text-lg text-gray-600 mb-8">
          Get in touch with LaMa Group for all your commercial real estate needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get In Touch</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Phone:</h3>
                <p className="text-gray-600">+1 (817) 545-9191</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email:</h3>
                <p className="text-gray-600">info@lamagroup.com</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Address:</h3>
                <p className="text-gray-600">Fort Worth, Texas</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Business Hours</h2>
            <div className="space-y-2">
              <p className="text-gray-600"><span className="font-semibold">Monday - Friday:</span> 9:00 AM - 6:00 PM</p>
              <p className="text-gray-600"><span className="font-semibold">Saturday:</span> 10:00 AM - 4:00 PM</p>
              <p className="text-gray-600"><span className="font-semibold">Sunday:</span> Closed</p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
} 