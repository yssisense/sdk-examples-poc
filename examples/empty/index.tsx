import type { PluginManifest } from '@sisense/sdk-plugins';

import { Chart } from './components/chart.js';
import { DesignPanels } from './components/design-panels.js';
import { config, DataOptions, StyleOptions } from './config.js';

const manifest: PluginManifest<DataOptions, StyleOptions> = {
  name: 'PLUGIN_NAME',
  Component: Chart,
  DesignPanels: DesignPanels,
  config: config,
};

export default manifest;
