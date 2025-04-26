
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/AuthLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const VerifyEmail = () => {
  const { verifyEmail } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  
  useEffect(() => {
    // Check for token in URL query string
    const searchParams = new URLSearchParams(location.search);
    const urlToken = searchParams.get("token");
    
    // Get email from location state if available
    const locationState = location.state as { email?: string } | undefined;
    if (locationState?.email) {
      setEmail(locationState.email);
    }
    
    // Attempt auto-verification if token exists
    if (urlToken) {
      setToken(urlToken);
      handleVerification(urlToken);
    }
  }, [location.search, location.state]);
  
  const handleVerification = async (verificationToken: string) => {
    try {
      setIsVerifying(true);
      await verifyEmail(verificationToken);
      setIsSuccess(true);
      
      // Redirect to login after successful verification
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      // Error is handled in the AuthContext
      console.error("Email verification error:", error);
    } finally {
      setIsVerifying(false);
    }
  };
  
  const handleManualVerification = () => {
    if (!token) {
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: "Please enter a valid verification code.",
      });
      return;
    }
    
    handleVerification(token);
  };
  
  if (isSuccess) {
    return (
      <AuthLayout
        title="Email Verified"
        description="Your email has been successfully verified"
      >
        <div className="text-center py-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <p className="mb-4">You can now sign in to your account.</p>
          <p className="text-sm text-muted-foreground mb-6">
            Redirecting to login page...
          </p>
          <Button asChild className="w-full">
            <Link to="/login">Continue to Login</Link>
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Verify Your Email"
      description={email ? `We've sent a verification email to ${email}` : "Check your email for the verification link"}
    >
      <div className="space-y-6">
        <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-600">
          <p>
            Please check your email inbox for a verification link or enter the verification code below.
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code
            </label>
            <input
              id="token"
              type="text"
              placeholder="Enter verification code"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={token || ""}
              onChange={(e) => setToken(e.target.value)}
              disabled={isVerifying}
            />
          </div>
          
          <Button 
            onClick={handleManualVerification} 
            className="w-full"
            disabled={isVerifying || !token}
          >
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Email"
            )}
          </Button>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Didn't receive the email?{" "}
            <button 
              type="button"
              className="text-primary font-medium hover:underline"
              onClick={() => {
                toast({
                  title: "Verification email resent",
                  description: "Please check your inbox for the verification link.",
                });
              }}
            >
              Resend
            </button>
          </p>
        </div>
        
        <div className="border-t pt-4">
          <Button asChild variant="outline" className="w-full">
            <Link to="/login">Return to Login</Link>
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmail;
