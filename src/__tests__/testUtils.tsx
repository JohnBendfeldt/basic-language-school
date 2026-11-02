import React from 'react';
import { act, render, RenderResult } from '@testing-library/react';

/**
 * Render a component and let its mount-time async work (e.g. loading mastered
 * word IDs from the progress service) finish inside `act`, so React doesn't
 * warn about state updates that happen "outside" the test.
 */
export const renderSettled = async (ui: React.ReactElement): Promise<RenderResult> => {
  const result = render(ui);
  await settle();
  return result;
};

/** Flush pending promise callbacks inside act. */
export const settle = async (): Promise<void> => {
  await act(async () => {
    await Promise.resolve();
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
};
