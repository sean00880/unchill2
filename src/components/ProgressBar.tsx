// components/ProgressBar.tsx
interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
  }
  
  export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
    const progress = (currentStep / totalSteps) * 100;
    
    return (
      <div className="w-full bg-gray-300 rounded-full h-2.5 mb-4">
        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
    );
  }
  