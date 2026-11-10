interface GtmDataLayerEntry {
  event?: string;
  page_path?: string;
  page_location?: string;
  page_title?: string;
}

interface Window {
  dataLayer?: GtmDataLayerEntry[];
  google_tag_manager?: Record<string, unknown>;
  __ranchitasGtmBound?: boolean;
  __ranchitasGtmPath?: string;
}
