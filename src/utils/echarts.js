import * as _echarts from "echarts/core";
import { LineChart, PieChart, BarChart } from "echarts/charts";
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent } from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

_echarts.use([
    LineChart,
    PieChart,
    BarChart,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    ToolboxComponent,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
]);

export default _echarts;
