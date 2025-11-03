export type AnalyticsEvent = {
  name: string;
  params?: Record<string, unknown>;
};

// TODO: Wire to Firebase Analytics in Milestone 3.
export function trackEvent(event: AnalyticsEvent | AnalyticsEvent[]): void {
  const events = Array.isArray(event) ? event : [event];

  for (const item of events) {
    console.log(`[analytics] ${item.name}`, item.params ?? {});
  }
}
