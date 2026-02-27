import type { PluginManifest } from '@sisense/sdk-plugins';
import { DataOptions, StyleOptions } from "./config";

import { Chart } from './components/chart';
import { DesignPanels } from './components/design-panels';
import { config } from './config';


const manifest: PluginManifest<DataOptions, StyleOptions> = {
    name: 'test',
    Component: Chart,
    DesignPanels: DesignPanels,
    config: config,
};

export default manifest;
