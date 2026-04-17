interface HeroProps {
  title: string;
  subtitle?: string;
}

export const Hero = ({ title, subtitle }: HeroProps) => {
  return (
    <section className="text-center py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>
      {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
    </section>
  );
};