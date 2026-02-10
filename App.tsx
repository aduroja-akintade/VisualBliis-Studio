
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import EditorControls from './components/EditorControls';
import ImagePreview from './components/ImagePreview';
import { processImage } from './services/geminiService';
import { CameraAngle, Framing, AspectRatio, LightingStyle, BackgroundType, EditParams, ProcessingState } from './types';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [processingState, setProcessingState] = useState<ProcessingState>({
    isProcessing: false,
    status: '',
    error: null,
  });

  const [params, setParams] = useState<EditParams>({
    intent: 'LinkedIn Professional Headshot',
    angle: CameraAngle.EYE_LEVEL,
    framing: Framing.HEADSHOT,
    aspectRatio: AspectRatio.PORTRAIT_4_5,
    lighting: LightingStyle.SOFT_STUDIO,
    background: BackgroundType.CORPORATE,
    retouchingLevel: 'Standard',
  });

  const handleImageSelect = useCallback((base64: string) => {
    setOriginalImage(base64);
    setProcessedImage(null);
    setProcessingState(prev => ({ ...prev, error: null }));
  }, []);

  const handleProcess = async () => {
    if (!originalImage) return;

    setProcessingState({ isProcessing: true, status: 'Analyzing Scene', error: null });
    
    try {
      // Simulate staging process for realism
      setTimeout(() => setProcessingState(p => ({ ...p, status: 'Applying Frequency Separation' })), 2000);
      setTimeout(() => setProcessingState(p => ({ ...p, status: 'Matching Studio Lighting' })), 4000);
      setTimeout(() => setProcessingState(p => ({ ...p, status: 'Finalizing Master Grade' })), 6000);

      const result = await processImage(originalImage, params);
      setProcessedImage(result);
      setProcessingState({ isProcessing: false, status: '', error: null });
    } catch (err: any) {
      setProcessingState({ 
        isProcessing: false, 
        status: '', 
        error: err.message || 'An unexpected error occurred during processing.' 
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden h-[calc(100vh-80px)]">
        {originalImage ? (
          <>
            <EditorControls 
              params={params} 
              setParams={setParams} 
              onProcess={handleProcess}
              disabled={processingState.isProcessing}
            />
            <div className="flex-1 overflow-hidden">
              {processingState.error && (
                <div className="bg-red-900/20 border-b border-red-500/50 p-3 text-center">
                  <p className="text-xs text-red-400 font-medium">ERROR: {processingState.error}</p>
                </div>
              )}
              <ImagePreview 
                original={originalImage} 
                processed={processedImage} 
                isProcessing={processingState.isProcessing}
                status={processingState.status}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <ImageUploader onImageSelect={handleImageSelect} />
          </div>
        )}
      </main>

      {/* Footer Branding */}
      <footer className="h-10 bg-[#0f1115] border-t border-slate-800 flex items-center justify-between px-6 shrink-0">
        <div className="flex gap-4">
          <span className="text-[10px] text-slate-500 tracking-wider">VERSION 2.5 STABLE</span>
          <span className="text-[10px] text-slate-500 tracking-wider">SECURE PROCESSING</span>
        </div>
        <p className="text-[10px] text-slate-600 italic">Invisible AI. Authentic You.</p>
      </footer>
    </div>
  );
};

export default App;
