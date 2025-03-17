
import React from 'react';
import { cn } from '@/lib/utils';

export interface SignatureResultData {
  isAuthentic: boolean;
  confidenceScore: number;
  matchDetails?: {
    styleMatch: number;
    pressureMatch: number;
    flowMatch: number;
  };
  referenceSignature?: string | null;
}

interface SignatureResultProps {
  result: SignatureResultData | null;
  className?: string;
}

const SignatureResult: React.FC<SignatureResultProps> = ({ result, className }) => {
  if (!result) return null;
  
  const { isAuthentic, confidenceScore, matchDetails, referenceSignature } = result;
  
  // Format confidence score as percentage
  const scorePercent = Math.round(confidenceScore * 100);
  
  // Determine result status styling
  const getStatusColor = () => {
    if (scorePercent >= 90) return 'text-green-500';
    if (scorePercent >= 70) return 'text-amber-500';
    return 'text-red-500';
  };
  
  // Determine progress bar color
  const getProgressColor = () => {
    if (scorePercent >= 90) return 'bg-green-500';
    if (scorePercent >= 70) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className={cn('w-full max-w-2xl mx-auto mt-8 animate-scale-in', className)}>
      <div className="glass-card rounded-xl p-6">
        <div className="text-center mb-6">
          <div className={cn(
            'inline-flex items-center justify-center px-4 py-1 rounded-full text-sm font-medium mb-2',
            isAuthentic ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          )}>
            {isAuthentic ? 'Authentic Signature' : 'Potential Forgery'}
          </div>
          
          <h3 className="text-2xl font-semibold mb-2">Analysis Results</h3>
          <p className="text-muted-foreground">
            Our AI has analyzed the signature with the following confidence score:
          </p>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Confidence Score</span>
            <span className={cn("text-sm font-bold", getStatusColor())}>{scorePercent}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className={cn("h-full rounded-full transition-all duration-1000", getProgressColor())} 
              style={{ width: `${scorePercent}%` }}
            ></div>
          </div>
        </div>
        
        {matchDetails && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-background/50 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Style Match</div>
              <div className="text-xl font-medium">{Math.round(matchDetails.styleMatch * 100)}%</div>
            </div>
            <div className="bg-background/50 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Pressure Match</div>
              <div className="text-xl font-medium">{Math.round(matchDetails.pressureMatch * 100)}%</div>
            </div>
            <div className="bg-background/50 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Flow Match</div>
              <div className="text-xl font-medium">{Math.round(matchDetails.flowMatch * 100)}%</div>
            </div>
          </div>
        )}
        
        {referenceSignature && (
          <div className="border-t border-border pt-6 mt-6">
            <div className="text-sm font-medium mb-3">Compared against reference signature:</div>
            <div className="bg-background/50 p-3 rounded-lg">
              <img 
                src={referenceSignature} 
                alt="Reference signature" 
                className="max-h-32 mx-auto object-contain"
              />
            </div>
          </div>
        )}
        
        <div className="mt-6 flex justify-center">
          <button className="text-sm px-6 py-2 rounded-full glass-button mr-4">
            Download Report
          </button>
          <button className="text-sm px-6 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors">
            Verify Another
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignatureResult;
