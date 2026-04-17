import { Hero } from '../../components/Hero/Hero';
import { Button } from '../../components/Button/Button';

export const Home = () => {
  return (
    <div>
      <Hero title="Welcome to My App" subtitle="Track your weekly progress" />
      <div className="flex justify-center gap-4 mt-8">
        <Button variant="primary">Get Started</Button>
        <Button variant="outline">Learn More</Button>
      </div>
    </div>
  );
};