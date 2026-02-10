
import React from 'react';

interface ImageUploaderProps {
  onImageSelect: (base64: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-6">
      <div className="border-2 border-dashed border-slate-800 rounded-3xl bg-[#161a20] p-12 text-center flex flex-col items-center gap-6 hover:border-indigo-500/50 transition-all group">
        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
          <svg className="w-10 h-10 text-slate-500 group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold text-white mb-2">Upload Your Source</h2>
          <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
            Select a high-resolution portrait or corporate headshot. We recommend RAW-style JPEGs for maximum fidelity.
          </p>
        </div>
        <label className="mt-4 px-8 py-3 bg-white text-black font-bold text-sm rounded-full cursor-pointer hover:bg-slate-200 transition-colors shadow-xl">
          CHOOSE IMAGE
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
        <p className="text-[10px] text-slate-600 uppercase tracking-widest mt-4">PNG, JPG, or HEIC up to 10MB</p>
      </div>
    </div>
  );
};

export default ImageUploader;
