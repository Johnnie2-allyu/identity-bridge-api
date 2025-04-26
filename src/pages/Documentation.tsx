
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const Documentation = () => {
  const [apiTab, setApiTab] = useState("auth");
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Identity Bridge
            </Link>
            <nav className="hidden md:flex space-x-4">
              <a href="#overview" className="text-sm text-gray-600 hover:text-gray-900">Overview</a>
              <a href="#authentication" className="text-sm text-gray-600 hover:text-gray-900">Authentication</a>
              <a href="#endpoints" className="text-sm text-gray-600 hover:text-gray-900">Endpoints</a>
              <a href="#testing" className="text-sm text-gray-600 hover:text-gray-900">Testing</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button asChild variant="outline">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose max-w-none">
          <section id="overview" className="mb-16">
            <h1 className="text-4xl font-bold mb-6">Identity Bridge API Documentation</h1>
            <p className="text-lg mb-4">
              This documentation covers the authentication services provided by the Identity Bridge API, built with Django REST Framework.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="font-semibold mb-2">User Registration</h3>
                <p className="text-sm text-gray-600">
                  Create new user accounts with secure password hashing.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="font-semibold mb-2">JWT Authentication</h3>
                <p className="text-sm text-gray-600">
                  Secure token-based authentication for API requests.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="font-semibold mb-2">Email Verification</h3>
                <p className="text-sm text-gray-600">
                  Verify user email addresses for enhanced security.
                </p>
              </div>
            </div>
          </section>
          
          <section id="authentication" className="mb-16">
            <h2 className="text-3xl font-bold mb-4">Authentication Flow</h2>
            <p className="mb-4">
              Identity Bridge API implements JWT (JSON Web Token) authentication. Here's how it works:
            </p>
            <ol className="list-decimal list-inside space-y-4 mb-8">
              <li className="pl-2">
                <strong>Registration</strong>: User creates an account with email, username and password
              </li>
              <li className="pl-2">
                <strong>Email Verification</strong>: User receives an email with a verification link/token
              </li>
              <li className="pl-2">
                <strong>Login</strong>: User authenticates with credentials and receives access and refresh tokens
              </li>
              <li className="pl-2">
                <strong>API Access</strong>: User includes the JWT token in Authorization header for protected endpoints
              </li>
              <li className="pl-2">
                <strong>Token Refresh</strong>: User obtains new access token using refresh token when access token expires
              </li>
            </ol>
            
            <div className="bg-gray-50 p-6 rounded-lg border">
              <h3 className="font-semibold mb-2">Security Features</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Password hashing using Django's secure password hashing algorithms</li>
                <li>Email verification to confirm user identities</li>
                <li>JWT token with configurable expiration</li>
                <li>Password reset functionality with secure tokens</li>
                <li>Protection against common attacks (CSRF, XSS)</li>
              </ul>
            </div>
          </section>
          
          <section id="endpoints" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">API Endpoints</h2>
            
            <Tabs value={apiTab} onValueChange={setApiTab} className="mb-8">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="auth">Authentication</TabsTrigger>
                <TabsTrigger value="user">User Management</TabsTrigger>
                <TabsTrigger value="password">Password Management</TabsTrigger>
                <TabsTrigger value="verification">Verification</TabsTrigger>
              </TabsList>
              
              <TabsContent value="auth" className="mt-6">
                <div className="rounded-lg border overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b">
                    <h3 className="font-semibold">Authentication Endpoints</h3>
                  </div>
                  <div className="divide-y">
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800 mr-2">
                            POST
                          </span>
                          <span className="font-mono text-sm">/api/auth/login/</span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">User login endpoint that returns JWT tokens</p>
                      <pre className="mt-2 bg-gray-50 p-4 rounded-md overflow-auto text-xs">
{`# Request
{
  "email": "user@example.com",
  "password": "securepassword"
}

# Response
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "user",
    "is_verified": true
  }
}`}
                      </pre>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800 mr-2">
                            POST
                          </span>
                          <span className="font-mono text-sm">/api/auth/register/</span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">Create a new user account</p>
                      <pre className="mt-2 bg-gray-50 p-4 rounded-md overflow-auto text-xs">
{`# Request
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "securepassword"
}

# Response
{
  "id": 1,
  "username": "newuser",
  "email": "newuser@example.com",
  "is_verified": false
}`}
                      </pre>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800 mr-2">
                            POST
                          </span>
                          <span className="font-mono text-sm">/api/auth/token/refresh/</span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">Refresh access token</p>
                      <pre className="mt-2 bg-gray-50 p-4 rounded-md overflow-auto text-xs">
{`# Request
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}

# Response
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}`}
                      </pre>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800 mr-2">
                            GET
                          </span>
                          <span className="font-mono text-sm">/api/auth/user/</span>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
                          Requires Auth
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">Get current user details</p>
                      <pre className="mt-2 bg-gray-50 p-4 rounded-md overflow-auto text-xs">
{`# Response
{
  "id": 1,
  "username": "user",
  "email": "user@example.com",
  "is_verified": true
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="user" className="mt-6">
                <div className="rounded-lg border overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b">
                    <h3 className="font-semibold">User Management Endpoints</h3>
                  </div>
                  <div className="divide-y">
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800 mr-2">
                            GET
                          </span>
                          <span className="font-mono text-sm">/api/users/me/</span>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
                          Requires Auth
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">Get details of authenticated user</p>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800 mr-2">
                            PATCH
                          </span>
                          <span className="font-mono text-sm">/api/users/me/</span>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
                          Requires Auth
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">Update user profile information</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="password" className="mt-6">
                <div className="rounded-lg border overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b">
                    <h3 className="font-semibold">Password Management Endpoints</h3>
                  </div>
                  <div className="divide-y">
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800 mr-2">
                            POST
                          </span>
                          <span className="font-mono text-sm">/api/auth/password-reset/</span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">Request password reset email</p>
                      <pre className="mt-2 bg-gray-50 p-4 rounded-md overflow-auto text-xs">
{`# Request
{
  "email": "user@example.com"
}

# Response
{
  "message": "Password reset email has been sent."
}`}
                      </pre>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800 mr-2">
                            POST
                          </span>
                          <span className="font-mono text-sm">/api/auth/password-reset/confirm/</span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">Reset password with token</p>
                      <pre className="mt-2 bg-gray-50 p-4 rounded-md overflow-auto text-xs">
{`# Request
{
  "token": "abcdef123456",
  "password": "newpassword"
}

# Response
{
  "message": "Password has been reset successfully."
}`}
                      </pre>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800 mr-2">
                            POST
                          </span>
                          <span className="font-mono text-sm">/api/auth/password-change/</span>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
                          Requires Auth
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">Change password for authenticated user</p>
                      <pre className="mt-2 bg-gray-50 p-4 rounded-md overflow-auto text-xs">
{`# Request
{
  "old_password": "currentpassword",
  "new_password": "newpassword"
}

# Response
{
  "message": "Password changed successfully."
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="verification" className="mt-6">
                <div className="rounded-lg border overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b">
                    <h3 className="font-semibold">Verification Endpoints</h3>
                  </div>
                  <div className="divide-y">
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800 mr-2">
                            POST
                          </span>
                          <span className="font-mono text-sm">/api/auth/verify-email/</span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">Verify email with token</p>
                      <pre className="mt-2 bg-gray-50 p-4 rounded-md overflow-auto text-xs">
{`# Request
{
  "token": "abcdef123456"
}

# Response
{
  "message": "Email verified successfully."
}`}
                      </pre>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800 mr-2">
                            POST
                          </span>
                          <span className="font-mono text-sm">/api/auth/resend-verification/</span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">Resend verification email</p>
                      <pre className="mt-2 bg-gray-50 p-4 rounded-md overflow-auto text-xs">
{`# Request
{
  "email": "user@example.com"
}

# Response
{
  "message": "Verification email has been resent."
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </section>
          
          <section id="testing" className="mb-16">
            <h2 className="text-3xl font-bold mb-4">Testing</h2>
            <p className="mb-4">
              The Identity Bridge API includes comprehensive tests to ensure functionality and security:
            </p>
            
            <div className="bg-white p-6 rounded-lg border shadow-sm mb-8">
              <h3 className="font-semibold mb-2">Test Coverage</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm">Authentication Tests</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 ml-4">
                    <li>User registration validation</li>
                    <li>Login and token generation</li>
                    <li>Token refresh functionality</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm">Password Management Tests</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 ml-4">
                    <li>Password reset request flow</li>
                    <li>Token validation and password change</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm">Email Verification Tests</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 ml-4">
                    <li>Token generation and validation</li>
                    <li>User status updates after verification</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm">Security Tests</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 ml-4">
                    <li>Authorization checks on protected endpoints</li>
                    <li>Validation of token expiration</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border">
              <h3 className="font-semibold mb-2">Running Tests</h3>
              <p className="text-sm mb-2">
                To run the test suite for this API:
              </p>
              <pre className="bg-black text-green-400 p-4 rounded-md overflow-auto text-xs mb-4">
{`# Run all tests
python manage.py test

# Run specific test case
python manage.py test authentication.tests.test_login`}
              </pre>
              <p className="text-sm text-gray-600">
                Test coverage report is available at <span className="font-mono text-xs">/coverage/</span>
              </p>
            </div>
          </section>
        </div>
      </main>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Identity Bridge API</h3>
              <p className="text-sm text-gray-400">
                Secure authentication and user management for your applications
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Documentation</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#overview" className="hover:text-white">Overview</a></li>
                <li><a href="#authentication" className="hover:text-white">Authentication Flow</a></li>
                <li><a href="#endpoints" className="hover:text-white">API Endpoints</a></li>
                <li><a href="#testing" className="hover:text-white">Testing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">GitHub Repository</a></li>
                <li><a href="#" className="hover:text-white">Django REST Framework</a></li>
                <li><a href="#" className="hover:text-white">JWT Authentication</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <p className="text-sm text-gray-400">
                Need help with implementation?<br />
                <a href="#" className="text-blue-400 hover:text-blue-300">Contact Support</a>
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2023 Identity Bridge API. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Documentation;
