interface LabelBadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'error' | 'info';
}

export const LabelBadge = ({ label, variant = 'info' }: LabelBadgeProps) => {
  const variants = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded ${variants[variant]}`}>
      {label}
    </span>
  );
};