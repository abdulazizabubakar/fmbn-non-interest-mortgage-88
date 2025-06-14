
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, Check, X } from 'lucide-react';

interface EnhancedInputProps {
  label?: string;
  error?: string;
  success?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  floating?: boolean;
  icon?: React.ReactNode;
}

const EnhancedInput: React.FC<EnhancedInputProps> = ({
  label,
  error,
  success,
  type = 'text',
  placeholder,
  value,
  onChange,
  className,
  floating = true,
  icon
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;
  const hasValue = value && value.length > 0;

  return (
    <div className={cn('relative group', className)}>
      {/* Floating Label */}
      {floating && label && (
        <Label
          className={cn(
            'absolute left-3 transition-all duration-300 pointer-events-none',
            'text-muted-foreground',
            focused || hasValue
              ? 'top-0 text-xs bg-background px-1 text-primary transform -translate-y-1/2'
              : 'top-1/2 transform -translate-y-1/2'
          )}
        >
          {label}
        </Label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}

        {/* Input */}
        <Input
          type={inputType}
          placeholder={floating ? '' : placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            'transition-all duration-300',
            'border-2 focus:border-primary',
            'hover:border-primary/50',
            error && 'border-destructive focus:border-destructive',
            success && 'border-green-500 focus:border-green-500',
            icon && 'pl-10',
            isPassword && 'pr-10'
          )}
        />

        {/* Password Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}

        {/* Status Icons */}
        {!isPassword && (error || success) && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {error && <X className="h-4 w-4 text-destructive" />}
            {success && <Check className="h-4 w-4 text-green-500" />}
          </div>
        )}
      </div>

      {/* Error/Success Messages */}
      {error && (
        <p className="mt-1 text-xs text-destructive animate-fade-in">
          {error}
        </p>
      )}
      {success && (
        <p className="mt-1 text-xs text-green-600 animate-fade-in">
          {success}
        </p>
      )}
    </div>
  );
};

export { EnhancedInput };
