import { TogglerSection } from './toggler_section';
import { Navigator } from '@sisense/sdk-ui';

export const AutoZoomSection = ({
  onClick,
  navigator,
}: {
  navigator?: Navigator;
  onClick: (autoZoom: Navigator) => void;
}) => {
  return (
    <div>
      <TogglerSection
        label="Auto Zoom"
        checked={!!navigator?.enabled}
        checkedBackground={true}
        onClick={() => onClick({ enabled: !navigator?.enabled })}
      />
    </div>
  );
};
