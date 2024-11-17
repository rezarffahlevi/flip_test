import {Dimensions, PixelRatio} from 'react-native';

// Get device dimensions
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// Reference screen dimensions (e.g., iPhone 11 as baseline)
const BASE_WIDTH = 375; // Reference screen width
const BASE_HEIGHT = 812; // Reference screen height

/**
 * Scale width proportionally based on the device's width.
 * @param size - The size to scale.
 * @returns The scaled size.
 */
export const scaleWidth = (size: number): number =>
  (SCREEN_WIDTH / BASE_WIDTH) * size;

/**
 * Scale height proportionally based on the device's height.
 * @param size - The size to scale.
 * @returns The scaled size.
 */
export const scaleHeight = (size: number): number =>
  (SCREEN_HEIGHT / BASE_HEIGHT) * size;

/**
 * Scale font size while considering user's font scaling preferences.
 * @param size - The font size to scale.
 * @returns The scaled font size.
 */
export const normalizeFont = (size: number): number => {
  // Scale based on screen size
  const scale = SCREEN_WIDTH / BASE_WIDTH;

  // Adjust using pixel density
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Limit scaling to avoid extreme values
export const clampFont = (
  size: number,
  minSize: number,
  maxSize: number,
): number => {
  return Math.max(minSize, Math.min(maxSize, normalizeFont(size)));
};

export const responsiveFont = (
  size: number,
  minSize: number = 12,
  maxSize: number = 32,
): number => {
  return clampFont(size, minSize, maxSize);
};

/**
 * Normalize a size to maintain proportions across devices.
 * @param size - The size to normalize.
 * @returns The normalized size.
 */
export const normalize = (size: number): number => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  return Math.round(size * scale);
};

/**
 * Get screen width.
 * @returns The screen width.
 */
export const getScreenWidth = (): number => SCREEN_WIDTH;

/**
 * Get screen height.
 * @returns The screen height.
 */
export const getScreenHeight = (): number => SCREEN_HEIGHT;
