import type { PluginManifest } from '@sisense/sdk-plugins';
import { DataOptions, StyleOptions } from "./config";

export { Chart } from './components/chart';
export { DesignPanels } from './components/design-panels';
export { config } from './config';


const manifest: PluginManifest<DataOptions, StyleOptions> = {
    name: 'PLUGIN_NAME',
    Component: Chart,
    DesignPanels: DesignPanels,
    config: config,
};

export default manifest;