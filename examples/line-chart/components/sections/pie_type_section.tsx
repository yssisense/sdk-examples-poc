import styles from './pie_type_section.module.scss';
import classnames from 'classnames';
import { useIntl, messages } from './use-intl';
import { PieType } from 'node_modules/@sisense/sdk-ui/dist/packages/sdk-ui/src/chart-options-processor/translations/pie-plot-options';

export const PieTypeSection = ({
  pieType,
  types,
  onClick,
}: {
  pieType: PieType;
  types: readonly PieType[];
  onClick: (pieType: PieType) => void;
}) => {
  const intl = useIntl();
  return (
    <div>
      <div className={styles.title}>{intl.formatMessage(messages.pieType)}</div>
      <table className={styles.table}>
        <tbody>
          <tr>
            {types.map((type, index) => {
              return (
                <td
                  key={index}
                  className={classnames({
                    [styles.hoverEffect]: pieType !== type,
                    [styles.selected]: pieType === type,
                  })}
                  onClick={() => {
                    onClick(type);
                  }}
                >
                  <div className={classnames(styles.center)}>
                    <div className={classnames(styles.icon, styles[type])}></div>
                    <div>{type.charAt(0).toUpperCase() + type.slice(1)}</div>
                  </div>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
