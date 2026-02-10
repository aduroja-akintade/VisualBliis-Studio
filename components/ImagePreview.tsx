
import React from 'react';

interface ImagePreviewProps {
  original: string | null;
  processed: string | null;
  isProcessing: boolean;
  status: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ original, processed, isProcessing, status }) => {
  if (!original) return null;

  return (
    <div className="flex-1 p-6 lg:p-10 flex flex-col gap-8 bg-[#0f1115] overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white tracking-wide">STUDIO WORKSPACE</h2>
        <div className="flex gap-2">
          {processed && (
            <button 
              onClick={() => {
                const link = document.createElement('a');
                link.href = processed;
                link.download = `visual-bliss-retouched-${Date.now()}.png`;
                link.click();
              }}
              className="px-4 py-2 bg-slate-800 text-slate-200 text-xs font-bold rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              EXPORT HI-RES
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full min-h-[400px]">
        {/* Original */}
        <div className="flex flex-col gap-3 group">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">Original Plate</span>
            <span className="text-[10px] font-medium text-slate-600 italic">Source Fidelity: 100%</span>
          </div>
          <div className="flex-1 relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 group-hover:border-slate-700 transition-colors shadow-2xl">
            <img src={original} alt="Original" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Processed or Loading */}
        <div className="flex flex-col gap-3 group">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-indigo-500 tracking-[0.2em] uppercase">Retouched Master</span>
            {processed && <span className="text-[10px] font-medium text-indigo-400 italic">Enhanced with Studio AI</span>}
          </div>
          <div className="flex-1 relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 group-hover:border-indigo-500/30 transition-colors shadow-2xl flex items-center justify-center">
            {isProcessing ? (
              <div className="flex flex-col items-center gap-6 animate-pulse">
                <div className="w-12 h-12 border-2 border-t-indigo-500 border-indigo-500/10 rounded-full animate-spin"></div>
                <div className="text-center">
                  <p className="text-white text-sm font-bold tracking-widest uppercase">{status}</p>
                  <p className="text-slate-500 text-[10px] mt-2 italic">Refining grain structure & lighting falloff...</p>
                </div>
              </div>
            ) : processed ? (
              <img src={processed} alt="Retouched" className="w-full h-full object-contain" />
            ) : (
              <div className="text-center p-8">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 opacity-20">
                  <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-slate-600 text-xs tracking-wider uppercase font-medium">Ready for Studio Processing</p>
                <p className="text-slate-700 text-[10px] mt-2 max-w-[200px] mx-auto leading-relaxed">
                  Adjust parameters and click 'Process Master' to begin invisible retouching.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
