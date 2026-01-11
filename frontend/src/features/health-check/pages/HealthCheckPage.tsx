import { BasePage } from '@/components/layout/BasePage';
import { HeroSection } from '../components/HeroSection';
import { StatusSection } from '../components/StatusSection';
import { TechStackSection } from '../components/TechStackSection';

export function HealthCheckPage() {
  return (
    <BasePage>
      <div className="h-full bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full space-y-8 text-center">
          <HeroSection />
          <StatusSection />
          <TechStackSection />
        </div>
      </div>
    </BasePage>
  );
}
