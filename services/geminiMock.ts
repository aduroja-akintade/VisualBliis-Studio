import { EditParams } from "../types";

// Simple mock for local development. Returns the original image (or a data URL)
export async function processImage(
  imageBase64: string,
  params: EditParams
): Promise<string> {
  // simulate network / processing delay
  await new Promise((r) => setTimeout(r, 800));

  // If the input already looks like a data URL, return it as-is.
  if (imageBase64.startsWith('data:')) {
    return imageBase64;
  }

  // Otherwise, assume it's raw base64 and return as a PNG data URL
  return `data:image/png;base64,${imageBase64}`;
}
