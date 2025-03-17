
import React, { useState, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface SignatureUploadProps {
  onUpload: (file: File) => void;
  isProcessing: boolean;
  className?: string;
}

const SignatureUpload: React.FC<SignatureUploadProps> = ({ 
  onUpload, 
  isProcessing, 
  className 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  }, []);

  const processFile = (file: File) => {
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload an image file (JPG, PNG, etc.)',
        variant: 'destructive'
      });
      return;
    }
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    // Pass file to parent component
    onUpload(file);
    
    // Clean up preview URL when component unmounts
    return () => URL.revokeObjectURL(url);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={cn('w-full max-w-2xl mx-auto', className)}>
      <div 
        className={cn(
          'drop-zone h-64 flex flex-col items-center justify-center p-6 cursor-pointer',
          isDragging && 'active',
          isProcessing && 'opacity-50 pointer-events-none',
          previewUrl ? 'border-primary bg-primary/5' : 'border-muted-foreground/20'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input 
          ref={fileInputRef}
          type="file" 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileInput}
          disabled={isProcessing}
        />
        
        {previewUrl ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img 
              src={previewUrl} 
              alt="Signature preview" 
              className="max-h-full max-w-full object-contain rounded-lg animate-fade-in"
            />
            {isProcessing && (
              <div className="absolute inset-0 bg-background/50 backdrop-blur-xs flex items-center justify-center rounded-lg animate-fade-in">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full border-4 border-primary/30 border-t-primary animate-spin mb-4"></div>
                  <p className="text-sm font-medium">Analyzing signature...</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="w-16 h-16 mb-4 rounded-full bg-secondary flex items-center justify-center animate-pulse-light">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                className="w-8 h-8 text-muted-foreground"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" 
                />
              </svg>
            </div>
            <h3 className="font-medium text-lg mb-2">Upload a signature</h3>
            <p className="text-muted-foreground text-center text-sm mb-2">
              Drag and drop an image file here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground/70">
              Supports JPG, PNG, and other image formats
            </p>
          </>
        )}
      </div>
      
      {previewUrl && (
        <div className="mt-4 flex justify-center animate-slide-up">
          <button 
            className="text-sm px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors focus-ring mr-3"
            onClick={(e) => {
              e.stopPropagation();
              setPreviewUrl(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}
            disabled={isProcessing}
          >
            Upload a different image
          </button>
          
          <button 
            className="text-sm px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors focus-ring"
            onClick={(e) => {
              e.stopPropagation();
              // This would trigger the actual processing if needed separately from upload
            }}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Analyze Signature'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SignatureUpload;
