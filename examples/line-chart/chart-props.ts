import { measureFactory } from '@sisense/sdk-data';
import * as DM from '@models/sample-ecommerce';

export const chartProps = {
    dataSource: DM.DataSource,
    dataOptions: {
        categories: [{ column: DM.Commerce.AgeRange }],
        values: [{ column: measureFactory.sum(DM.Commerce.Revenue) }],
        breakBy: [{ column: DM.Commerce.Condition }],
    },
    filters: [],
    highlights: [],
    styleOptions: {},
};
