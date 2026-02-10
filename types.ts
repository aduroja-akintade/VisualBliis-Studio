
export enum CameraAngle {
  EYE_LEVEL = 'Eye-level',
  SLIGHT_HIGH = 'Slight high angle',
  SLIGHT_LOW = 'Slight low angle'
}

export enum Framing {
  HEADSHOT = 'Head-and-shoulders',
  CHEST_UP = 'Chest-up',
  THREE_QUARTERS = 'Three-quarter',
  FULL_BODY = 'Full body'
}

export enum AspectRatio {
  SQUARE = '1:1',
  PORTRAIT_4_5 = '4:5',
  CLASSIC_3_2 = '3:2',
  WIDESCREEN_16_9 = '16:9'
}

export enum LightingStyle {
  SOFT_STUDIO = 'Soft key + fill studio lighting',
  REMBRANDT = 'Rembrandt lighting',
  BUTTERFLY = 'Butterfly lighting',
  WINDOW_LIGHT = 'Natural window light',
  CINEMATIC_LOW_KEY = 'Low-key cinematic lighting'
}

export enum BackgroundType {
  STUDIO_LIGHT = 'Clean studio backdrop (Light)',
  STUDIO_DARK = 'Clean studio backdrop (Dark)',
  CORPORATE = 'Corporate office interior',
  OUTDOOR = 'Natural outdoor environment',
  EDITORIAL = 'Editorial minimal background'
}

export interface EditParams {
  intent: string;
  angle: CameraAngle;
  framing: Framing;
  aspectRatio: AspectRatio;
  lighting: LightingStyle;
  background: BackgroundType;
  retouchingLevel: 'Standard' | 'Advanced';
}

export interface ProcessingState {
  isProcessing: boolean;
  status: string;
  error: string | null;
}
