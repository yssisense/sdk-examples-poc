import { Config } from '@internal/types/react-plugin-types';
import { ExtractDataOptions } from '@internal/types/utils';

export type DataOptions = ExtractDataOptions<typeof config>;

export interface StyleOptions {
  binCount: number;
  barBorder: boolean;
  binSizePrecision: number;
  subtype: 'default' | 'stacked' | 'overlay';
}

export const config = {
  name: 'calendar-heatmap',
  displayName: 'CSDK Calendar Heatmap',
  panels: [
    {
      title: 'Date',
      metadataType: 'dimension',
      maxItems: 1,
      allowedDataTypes: ['datetime'],
    },
    {
      title: 'Color',
      metadataType: 'measure',
      colorOptions: {
        single: true,
        conditional: true,
        range: false,
      },
      maxItems: 1,
    },
  ],
  defaultStyleOptions: {
    binCount: 6,
    barBorder: false,
    binSizePrecision: 0,
    subtype: 'stacked',
  },
} as const satisfies Config<StyleOptions>;
