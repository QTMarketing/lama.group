import { AuthExample } from '@/components/AuthExample';

export default function TestAuthPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Authentication Test Page
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Test the Firebase authentication system with both context and direct methods.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Context Method</h2>
            <p className="text-sm text-gray-600 mb-4">
              Uses the useAuth hook from AuthContext
            </p>
            <AuthExample />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Authentication Testing</h2>
            <p className="text-sm text-gray-600 mb-4">
              Test Firebase authentication methods and user management
            </p>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-xs text-gray-500 text-center">
                Use the context-based authentication methods above to test login, signup, and user management functionality.
              </p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Testing Instructions</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div>
                <h3 className="font-medium text-gray-800">1. Test Email/Password</h3>
                <p>Try signing up with a new email and password</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">2. Test Google Sign-In</h3>
                <p>Click either Google button to test OAuth</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">3. Test Sign Out</h3>
                <p>After signing in, test the sign out functionality</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">4. Check Console</h3>
                <p>Open browser console to see any errors</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Troubleshooting Tips:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Clear browser cache and cookies</li>
                <li>• Try incognito/private mode</li>
                <li>• Check Firebase console for auth logs</li>
                <li>• Ensure popup blockers are disabled</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 