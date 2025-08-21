import { useState, useEffect } from "react";
import { Shield, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PasswordRequirement {
  id: string;
  label: string;
  test: (password: string) => boolean;
  met: boolean;
}

export function PasswordChecker() {
  const [password, setPassword] = useState("");
  const [requirements, setRequirements] = useState<PasswordRequirement[]>([
    { id: 'length', label: 'At least 8 characters', test: (p) => p.length >= 8, met: false },
    { id: 'uppercase', label: 'Contains uppercase letter', test: (p) => /[A-Z]/.test(p), met: false },
    { id: 'lowercase', label: 'Contains lowercase letter', test: (p) => /[a-z]/.test(p), met: false },
    { id: 'number', label: 'Contains number', test: (p) => /\d/.test(p), met: false },
    { id: 'special', label: 'Contains special character', test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p), met: false },
  ]);

  const [strength, setStrength] = useState({ level: 0, text: 'Enter a password', color: 'bg-gray-300', width: '0%' });

  useEffect(() => {
    const updatedRequirements = requirements.map(req => ({
      ...req,
      met: req.test(password)
    }));
    setRequirements(updatedRequirements);

    const score = updatedRequirements.filter(req => req.met).length;
    
    const strengthLevels = [
      { min: 0, max: 1, text: 'Very Weak', color: 'bg-red-500', width: '20%' },
      { min: 2, max: 2, text: 'Weak', color: 'bg-orange-500', width: '40%' },
      { min: 3, max: 3, text: 'Fair', color: 'bg-yellow-500', width: '60%' },
      { min: 4, max: 4, text: 'Good', color: 'bg-blue-500', width: '80%' },
      { min: 5, max: 5, text: 'Strong', color: 'bg-green-500', width: '100%' },
    ];

    const level = strengthLevels.find(l => score >= l.min && score <= l.max) || strengthLevels[0];
    
    setStrength({
      level: score,
      text: password.length > 0 ? level.text : 'Enter a password',
      color: password.length > 0 ? level.color : 'bg-gray-300',
      width: password.length > 0 ? level.width : '0%'
    });
  }, [password]);

  return (
    <section id="tools" className="py-20 bg-gray-50" data-testid="password-checker-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[var(--dark-navy)] mb-6">
            Try Our Password Strength Checker
          </h2>
          <p className="text-xl text-gray-600">
            🌱 See how strong your password is—no data leaves your browser!
          </p>
        </div>

        <Card className="max-w-md mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-center justify-center">
              <Shield className="w-5 h-5 mr-2 text-[var(--tree-green)]" />
              Password Strength Checker
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password-input">Test Password Strength:</Label>
              <Input
                id="password-input"
                type="password"
                placeholder="Enter a password to test"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                data-testid="password-input"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Strength:</span>
                <span 
                  className={`text-sm font-semibold ${password.length > 0 ? 'text-gray-700' : 'text-gray-500'}`}
                  data-testid="strength-text"
                >
                  {strength.text}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${strength.color}`}
                  style={{ width: strength.width }}
                  data-testid="strength-bar"
                />
              </div>

              <div className="mt-4 space-y-2 text-sm">
                {requirements.map((req) => (
                  <div 
                    key={req.id}
                    className="flex items-center"
                    data-testid={`requirement-${req.id}`}
                  >
                    {req.met ? (
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                    ) : (
                      <X className="w-4 h-4 text-red-500 mr-2" />
                    )}
                    <span className={req.met ? 'text-green-600' : 'text-gray-600'}>
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center">
              <Shield className="w-4 h-4 inline mr-1" />
              We don't store your password—this check is for your eyes only.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
