
import React from 'react';
import { CameraAngle, Framing, AspectRatio, LightingStyle, BackgroundType, EditParams } from '../types';
import { INTENT_OPTIONS } from '../constants';
import Select from './ui/Select';

interface EditorControlsProps {
  params: EditParams;
  setParams: (params: EditParams) => void;
  onProcess: () => void;
  disabled: boolean;
}

const EditorControls: React.FC<EditorControlsProps> = ({ params, setParams, onProcess, disabled }) => {
  const handleChange = (key: keyof EditParams, value: string) => {
    setParams({ ...params, [key]: value });
  };

  const sectionClass = "space-y-4 pb-6 border-b border-slate-800";

  return (
    <div className="w-full lg:w-80 flex-shrink-0 bg-[#161a20] p-6 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)] border-r border-slate-800">
      <div className={sectionClass}>
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
          CORE SETTINGS
        </h3>
        
        <Select
          label="Creative Intent"
          value={params.intent}
          onChange={(e) => handleChange('intent', e.target.value)}
          options={INTENT_OPTIONS.map(opt => ({ label: opt, value: opt }))}
        />

        <Select
          label="Background Type"
          value={params.background}
          onChange={(e) => handleChange('background', e.target.value)}
          options={Object.values(BackgroundType).map(v => ({ label: v, value: v }))}
        />
      </div>

      <div className={sectionClass}>
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
          PHOTOGRAPHY
        </h3>
        
        <Select
          label="Lighting Setup"
          value={params.lighting}
          onChange={(e) => handleChange('lighting', e.target.value)}
          options={Object.values(LightingStyle).map(v => ({ label: v, value: v }))}
        />

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Framing"
            value={params.framing}
            onChange={(e) => handleChange('framing', e.target.value)}
            options={Object.values(Framing).map(v => ({ label: v, value: v }))}
          />
          <Select
            label="Ratio"
            value={params.aspectRatio}
            onChange={(e) => handleChange('aspectRatio', e.target.value)}
            options={Object.values(AspectRatio).map(v => ({ label: v, value: v }))}
          />
        </div>

        <Select
          label="Camera Angle"
          value={params.angle}
          onChange={(e) => handleChange('angle', e.target.value)}
          options={Object.values(CameraAngle).map(v => ({ label: v, value: v }))}
        />
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
          RETOUCHING
        </h3>
        
        <div className="flex gap-2">
          {(['Standard', 'Advanced'] as const).map((level) => (
            <button
              key={level}
              onClick={() => handleChange('retouchingLevel', level)}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all ${
                params.retouchingLevel === level
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onProcess}
        disabled={disabled}
        className={`w-full py-4 rounded-xl font-bold text-sm tracking-widest transition-all ${
          disabled
            ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
        }`}
      >
        {disabled ? 'PROCESSING...' : 'PROCESS MASTER IMAGE'}
      </button>

      <div className="bg-indigo-900/10 border border-indigo-500/20 p-4 rounded-xl">
        <p className="text-[10px] text-indigo-400 font-medium leading-relaxed">
          <strong className="block mb-1">PRO TIP:</strong>
          For best results, upload a well-lit photo with a neutral expression. VisualBliss preserves the soul of your photograph while enhancing the technical execution.
        </p>
      </div>
    </div>
  );
};

export default EditorControls;
