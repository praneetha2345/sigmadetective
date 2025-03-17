
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SignatureUpload from '@/components/SignatureUpload';
import SignatureResult, { SignatureResultData } from '@/components/SignatureResult';
import { analyzeSignature } from '@/utils/signatureDetection';
import { useToast } from '@/hooks/use-toast';

const Index: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<SignatureResultData | null>(null);
  const { toast } = useToast();

  const handleUpload = async (file: File) => {
    try {
      setIsProcessing(true);
      setResult(null);
      
      // Process the signature (this would connect to a real ML backend in production)
      const analysisResult = await analyzeSignature(file);
      
      // Update state with results
      setResult(analysisResult);
      
      // Show a toast message with the result
      toast({
        title: analysisResult.isAuthentic ? 'Signature verified' : 'Potential forgery detected',
        description: `Confidence score: ${Math.round(analysisResult.confidenceScore * 100)}%`,
        variant: analysisResult.isAuthentic ? 'default' : 'destructive',
      });
    } catch (error) {
      console.error('Error analyzing signature:', error);
      toast({
        title: 'Analysis failed',
        description: 'There was an error analyzing the signature. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Powered by Machine Learning
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-4xl mx-auto">
            Advanced Signature <span className="text-primary">Verification</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Upload a signature image and our AI will analyze it for authenticity.
            Protect yourself from fraud with cutting-edge machine learning technology.
          </p>
        </section>
        
        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-elevated mb-12 animate-slide-up">
            <SignatureUpload 
              onUpload={handleUpload} 
              isProcessing={isProcessing} 
            />
            
            {result && (
              <SignatureResult result={result} />
            )}
          </div>
          
          {/* Features Section */}
          <section className="py-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/50 backdrop-blur-xs rounded-xl p-6 shadow-subtle border border-border hover:shadow-elevated transition-shadow duration-300">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    className="w-6 h-6 text-primary"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload</h3>
                <p className="text-muted-foreground">
                  Upload a signature image in any common format. Our system supports JPG, PNG, and other image types.
                </p>
              </div>
              
              <div className="bg-white/50 backdrop-blur-xs rounded-xl p-6 shadow-subtle border border-border hover:shadow-elevated transition-shadow duration-300">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    className="w-6 h-6 text-primary"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Analyze</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes multiple aspects of the signature, including style, pressure, and flow patterns.
                </p>
              </div>
              
              <div className="bg-white/50 backdrop-blur-xs rounded-xl p-6 shadow-subtle border border-border hover:shadow-elevated transition-shadow duration-300">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    className="w-6 h-6 text-primary"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Verify</h3>
                <p className="text-muted-foreground">
                  Get instant results on signature authenticity with a detailed analysis report and confidence score.
                </p>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-12 text-center">
            <div className="glass-card rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to protect against signature fraud?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Advanced signature verification for businesses and individuals. 
                Sign up today for our premium features.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors shadow-subtle">
                  Get Started Free
                </button>
                <button className="px-6 py-3 rounded-full glass-button">
                  Learn More
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
