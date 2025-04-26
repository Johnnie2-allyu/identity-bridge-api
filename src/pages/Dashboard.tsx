
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return null; // ProtectedRoute component should handle this
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Identity Bridge
            </h1>
            <p className="text-muted-foreground">Authentication Management Dashboard</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Sign Out
          </Button>
        </header>
        
        <main className="space-y-8">
          <section>
            <Card>
              <CardHeader>
                <CardTitle>Welcome, {user.username}!</CardTitle>
                <CardDescription>
                  Authentication status: {user.is_verified ? "Verified" : "Pending verification"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>User ID:</strong> {user.id}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Account status:</strong> Active</p>
                </div>
              </CardContent>
            </Card>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Authentication Status</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Authentication</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <p className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      JWT Token active
                    </p>
                    <p className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      Session authorized
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <p className="text-xs text-muted-foreground">Last login: Now</p>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <p className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      Email verification: {user.is_verified ? "Complete" : "Pending"}
                    </p>
                    <p className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                      2FA: Not enabled
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="ghost" size="sm" className="text-xs">
                    Setup 2FA
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>API Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <p className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      API authentication: Enabled
                    </p>
                    <p className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-gray-300 mr-2"></span>
                      API key: Not generated
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" size="sm" className="text-xs">
                    Generate API Key
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>API Documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Explore the available endpoints and learn how to integrate with our authentication API.
                  </p>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button asChild variant="outline" size="sm">
                    <a href="/docs">View Documentation</a>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Update your profile, change password, or manage security settings.
                  </p>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" size="sm">
                    Manage Account
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
