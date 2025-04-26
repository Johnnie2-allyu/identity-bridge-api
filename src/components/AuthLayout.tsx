
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  footer?: React.ReactNode;
}

const AuthLayout = ({
  children,
  title,
  description,
  footer,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Identity Bridge
            </h1>
          </Link>
        </div>
        
        <Card className="shadow-lg border-blue-100">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
            {description && (
              <p className="text-center text-muted-foreground">{description}</p>
            )}
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
        
        {footer && <div className="text-center mt-6">{footer}</div>}
      </div>
    </div>
  );
};

export default AuthLayout;
