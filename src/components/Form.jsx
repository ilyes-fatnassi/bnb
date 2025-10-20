import React from 'react';

const Form = ({ 
  children, 
  onSubmit, 
  className = '' 
}) => {
  return (
    <form 
      onSubmit={onSubmit} 
      className={className}
    >
      {children}
    </form>
  );
};

const FormItem = ({ 
  children, 
  label, 
  error, 
  required = false,
  className = '' 
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-charcoal text-sm font-medium mb-1">
          {label} {required && <span className="text-coral">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

const Input = ({ 
  type = 'text', 
  error, 
  className = '',
  ...props 
}) => {
  const baseClasses = 'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2';
  const borderColor = error ? 'border-red-500 focus:ring-red-500' : 'border-clay focus:ring-coral';
  
  return (
    <input
      type={type}
      className={`${baseClasses} ${borderColor} ${className}`}
      {...props}
    />
  );
};

const Textarea = ({ 
  error, 
  className = '',
  ...props 
}) => {
  const baseClasses = 'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2';
  const borderColor = error ? 'border-red-500 focus:ring-red-500' : 'border-clay focus:ring-coral';
  
  return (
    <textarea
      className={`${baseClasses} ${borderColor} ${className}`}
      {...props}
    />
  );
};

const Select = ({ 
  error, 
  children,
  className = '',
  ...props 
}) => {
  const baseClasses = 'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2';
  const borderColor = error ? 'border-red-500 focus:ring-red-500' : 'border-clay focus:ring-coral';
  
  return (
    <select
      className={`${baseClasses} ${borderColor} ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};

Form.Item = FormItem;
Form.Input = Input;
Form.Textarea = Textarea;
Form.Select = Select;

export default Form;