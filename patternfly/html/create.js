import React from 'react';
import { Chart, ChartArea, ChartAxis, ChartGroup, ChartThemeColor, ChartVoronoiContainer, getResizeObserver } from '@patternfly/react-charts';
// import '@patternfly/patternfly/patternfly-charts.css'; // Required for mix-blend-mode CSS property

class MultiColorChart extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.observer = () => {};
    this.state = {
      width: 0
    };
    this.handleResize = () => {
      if (this.containerRef.current && this.containerRef.current.clientWidth) {
        this.setState({ width: this.containerRef.current.clientWidth });
      }
    };
  }

  componentDidMount() {
    this.observer = getResizeObserver(this.containerRef.current, this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    this.observer();
  }

  render() {
    const { width } = this.state;

    return (
      <div ref={this.containerRef} style={{ height: '225px' }}>
        <Chart
          ariaDesc="Average number of pets"
          ariaTitle="Area chart example"
          containerComponent={<ChartVoronoiContainer labels={({ datum }) => `${datum.name}: ${datum.y}`} constrainToVisibleArea />}
          legendData={[{ name: 'em-ui' }, { name: 'em-config' }, { name: 'em-mmc' }]}
          legendPosition="bottom-left"
          height={225}
          padding={{
            bottom: 75, // Adjusted to accommodate legend
            left: 50,
            right: 50,
            top: 50,
          }}
          maxDomain={{y: 100}}
          themeColor={ChartThemeColor.multiUnordered}
          width={width}
        >
          <ChartAxis />
          <ChartAxis dependentAxis showGrid />
          <ChartGroup>
            <ChartArea
              data={[
                { name: 'em-ui', x: '2022-05-01 10:10:00', y: 30 },
                { name: 'em-ui', x: '2022-05-01 10:11:00', y: 40 },
                { name: 'em-ui', x: '2022-05-01 10:12:00', y: 80 },
                { name: 'em-ui', x: '2022-05-01 10:13:00', y: 60 },
                { name: 'em-ui', x: '2022-05-01 10:14:00', y: 60 }
              ]}
              interpolation="monotoneX"
            />
            <ChartArea
              data={[
                { name: 'em-config', x: '2022-05-01 10:10:00', y: 20 },
                { name: 'em-config', x: '2022-05-01 10:11:00', y: 30 },
                { name: 'em-config', x: '2022-05-01 10:12:00', y: 40 },
                { name: 'em-config', x: '2022-05-01 10:13:00', y: 50 },
                { name: 'em-config', x: '2022-05-01 10:14:00', y: 60 }
              ]}
              interpolation="monotoneX"
            />
            <ChartArea
              data={[
                { name: 'em-mmc', x: '2022-05-01 10:10:00', y: 10 },
                { name: 'em-mmc', x: '2022-05-01 10:11:00', y: 20 },
                { name: 'em-mmc', x: '2022-05-01 10:12:00', y: 30 },
                { name: 'em-mmc', x: '2022-05-01 10:13:00', y: 20 },
                { name: 'em-mmc', x: '2022-05-01 10:14:00', y: 40 }
              ]}
              interpolation="monotoneX"
            />
          </ChartGroup>
        </Chart>
      </div>
    );
  }
}