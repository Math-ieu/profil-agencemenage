interface SectionBadgeProps {
  label: string;
}

const SectionBadge = ({ label }: SectionBadgeProps) => (
  <div className="flex justify-center mb-4">
    <span className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-semibold tracking-wide uppercase">
      {label}
    </span>
  </div>
);

export default SectionBadge;
