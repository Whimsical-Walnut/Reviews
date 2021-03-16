import React from 'react';

const gridLayout = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'minwidth(6, 1fr) 100px',
};

const characteristicsBar = {
  height: '7px',
  width: '100%',
  border: 'none',
  backgroundColor: 'rgba(232, 232, 232, .8)',
};

const marginLeft = {
  marginLeft: 'auto',
  position: 'relative',
};

const marginCenter = {
  marginLeft: 'auto',
  marginRight: 'auto',
  position: 'relative',
};

const marginRight = {
  marginRight: 'auto',
  position: 'relative',
};

class ProductBreakdown extends React.Component {
  constructor(props) {
    super(props);

    this.characteristicStats = this.characteristicStats.bind(this);
  }

  characteristicStats(string) {
    return (Math.round(Number(string) * 4) / 4).toFixed(2);
  }

  render() {
    const { characteristics } = this.props.metaData;
    return (
      <div style={gridLayout}>
        {/* <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}> */}
        {
         characteristics.Comfort
            && (
            <div style={{
              gridColumn: '1',
              gridRow: '1',
              marginBottom: '10px',
              width: '210px',
            }}
            >
              <div style={{ fontSize: '13px', color: 'black' }}>Comfort</div>

              <div style={{ display: 'flex', fontSize: '11px', color: 'grey' }}>
                <div style={{ marginRight }}>
                  Uncomfortable
                </div>
                <div style={marginLeft}>
                  Perfect
                </div>
              </div>

              <div style={characteristicsBar}>
                <span
                  className="fa fa-caret-up"
                  style={{
                    color: 'black',
                    height: '20px',
                    marginLeft: `${((this.characteristicStats(characteristics.Comfort.value) / 5) * 100) - 2}%`,
                  }}
                />
              </div>

            </div>
            )
        }
        {
         characteristics.Fit
        && (
        <div style={{
          gridColumn: '1',
          gridRow: '2',
          marginBottom: '10px',
          width: '210px',
        }}
        >
          <div style={{ display: 'flex', fontSize: '13px', color: 'black' }}>Fit</div>

          <div style={{
            display: 'flex', justifyContent: 'space-evenly', fontSize: '11px', color: 'grey',
          }}
          >
            <div style={marginRight}>
              Runs tight
            </div>
            <div style={marginCenter}>
              Perfect
            </div>
            <div style={marginLeft}>
              Runs long
            </div>
          </div>

          <div style={characteristicsBar}>
            <span
              className="fa fa-caret-up"
              style={{
                color: 'black',
                height: '20px',
                marginLeft: `${((this.characteristicStats(characteristics.Fit.value) / 5) * 100) - 2}%`,
              }}
            />
          </div>

        </div>
        )
        }
        {
          characteristics.Length
        && (
        <div style={{
          gridColumn: '1',
          gridRow: '3',
          marginBottom: '10px',
          width: '210px',
        }}
        >
          <div style={{ fontSize: '13px', color: 'black' }}>Length</div>

          <div style={{
            display: 'flex', justifyContent: 'space-evenly', fontSize: '11px', color: 'grey',
          }}
          >
            <div style={marginRight}>
              Runs short
            </div>
            <div style={marginCenter}>
              Perfect
            </div>
            <div style={marginLeft}>
              Runs long
            </div>
          </div>

          <div style={characteristicsBar}>
            <span
              className="fa fa-caret-up"
              style={{
                color: 'black',
                height: '20px',
                marginLeft: `${((this.characteristicStats(characteristics.Length.value) / 5) * 100) - 2}%`,
              }}
            />
          </div>

        </div>
        )
        }
        {
         characteristics.Quality
        && (
        <div style={{
          gridColumn: '1',
          gridRow: '4',
          marginBottom: '10px',
          width: '210px',
        }}
        >
          <div style={{ fontSize: '13px', color: 'black' }}>Quality</div>

          <div style={{
            display: 'flex', justifyContent: 'space-evenly', fontSize: '11px', color: 'grey',
          }}
          >
            <div style={marginRight}>
              Poor
            </div>
            <div style={marginLeft}>
              Perfect
            </div>
          </div>

          <div style={characteristicsBar}>
            <span
              className="fa fa-caret-up"
              style={{
                color: 'black',
                height: '20px',
                marginLeft: `${((this.characteristicStats(characteristics.Quality.value) / 5) * 100) - 2}%`,
              }}
            />
          </div>

        </div>
        )
        }
        {
         characteristics.Size
        && (
        <div style={{
          gridColumn: '1',
          gridRow: '5',
          marginBottom: '10px',
          width: '210px',
        }}
        >
          <div style={{ fontSize: '13px', color: 'black' }}>Size</div>

          <div style={{
            display: 'flex', justifyContent: 'space-evenly', fontSize: '11px', color: 'grey',
          }}
          >
            <div style={marginRight}>
              Too small
            </div>
            <div style={marginCenter}>
              Perfect
            </div>
            <div style={marginLeft}>
              Too wide
            </div>
          </div>

          <div style={characteristicsBar}>
            <span
              className="fa fa-caret-up"
              style={{
                color: 'black',
                height: '20px',
                marginLeft: `${((this.characteristicStats(characteristics.Size.value) / 5) * 100) - 2}%`,
              }}
            />
          </div>

        </div>
        )
        }
        {
        characteristics.Width
        && (
        <div style={{
          gridColumn: '1',
          gridRow: '6',
          marginBottom: '10px',
          width: '210px',
        }}
        >
          <div style={{ fontSize: '13px', color: 'black' }}>Width</div>

          <div style={{
            display: 'flex', justifyContent: 'space-evenly', fontSize: '11px', color: 'grey',
          }}
          >
            <div style={marginRight}>
              Too narrow
            </div>
            <div style={marginCenter}>
              Perfect
            </div>
            <div style={marginLeft}>
              Too wide
            </div>
          </div>

          <div style={characteristicsBar}>
            <span
              className="fa fa-caret-up"
              style={{
                color: 'black',
                height: '20px',
                marginLeft: `${((this.characteristicStats(characteristics.Width.value) / 5) * 100) - 2}%`,
              }}
            />
          </div>

        </div>
        )
        }
      </div>
    );
  }
}

export default ProductBreakdown;
