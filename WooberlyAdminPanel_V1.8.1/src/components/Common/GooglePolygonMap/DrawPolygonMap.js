import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change } from 'redux-form';

// Google libraries
import {
    GoogleMap,
    Polygon,
    DrawingManager
} from "@react-google-maps/api";

// Locale
import { FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';

const refs = {};

class DrawPolygonMap extends React.Component {
    static defaultProps = { // USA
        zoom: 4,
        height: '400px',
        width: '100%',
        formName: null,
        fieldName: null,
        paths: [],
        bounds: []
    };

    constructor(props) {
        super(props);

        this.state = {
            polygonPaths: [],
            drawingMode: true,
            load: false,
            defaultLat: 37.0902,
            defaultLng: -95.7129
        };

        this.shapes = [];

        // Drawing
        this.onPolygonComplete = this.onPolygonComplete.bind(this);
        this.onOverlayComplete = this.onOverlayComplete.bind(this);
        this.removePolygon = this.removePolygon.bind(this);
        this.onPolygonLoad = this.onPolygonLoad.bind(this);

        // Helper
        this.formatPolygonPaths = this.formatPolygonPaths.bind(this);
    }

    componentDidMount() {
        const { paths, lat, lng } = this.props;
        let { defaultLat, defaultLng } = this.state;

        let center;
        if (lat != defaultLat && lng != defaultLng) {
            center = {
                lat,
                lng
            };
        } else if(paths.length <= 0) {
            center = {
                lat,
                lng
            }
        }

        if (paths && paths.length > 0) {
            this.setState({
                polygonPaths: paths,
                drawingMode: false,
            });
        }

        this.setState({
            center
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { lat, lng } = nextProps;
        let { defaultLat, defaultLng } = this.state;
        let center;
        if (lat != defaultLat && lng != defaultLng) {
            center = {
                lat,
                lng
            };

            this.setState({
                center
            })
        }
    }

    formatPolygonPaths(polygon) {
        let getPolygonLatLng, formattedPolygonPaths = [];
        if (polygon) {
            getPolygonLatLng = polygon.getArray();
            formattedPolygonPaths = getPolygonLatLng.length && getPolygonLatLng.map((i) => {
                return {
                    lat: i.lat(),
                    lng: i.lng()
                }
            });
        }

        return formattedPolygonPaths;
    }

    onPolygonLoad(map) {
        const { paths, lat, lng } = this.props;
        const { defaultLat, defaultLng } = this.state;

        let bounds = new google.maps.LatLngBounds();
        
        if(map && paths && paths.length > 0 && lat === defaultLat && lng === defaultLng) {
            paths.map((i) => {
                bounds.extend(new google.maps.LatLng(i.lat, i.lng));
            });
            map.fitBounds(bounds);
        }
    }

    onPolygonComplete(polygon, operationMode) {
        const { formName, fieldName, change } = this.props;
        let polygonPaths = [], self = this;

        this.setState({
            drawingMode: false // turned off the drawing manager
        });

        if (polygon && polygon.getPath()) {
            if (operationMode === 'onPolygonComplete') {
                polygonPaths = this.formatPolygonPaths(polygon.getPath());

                (formName && fieldName) && change(formName, fieldName, polygonPaths);

                this.setState({
                    polygonPaths
                });
            }
            
            google.maps.event.addListener(polygon.getPath(), 'insert_at', async function (index, obj) {
                polygonPaths = self.formatPolygonPaths(polygon.getPath());

                (formName && fieldName) && change(formName, fieldName, polygonPaths);

                self.setState({
                    polygonPaths
                });
            });

            google.maps.event.addListener(polygon.getPath(), 'set_at', async function (index, obj) {
                polygonPaths = self.formatPolygonPaths(polygon.getPath());

                (formName && fieldName) && change(formName, fieldName, polygonPaths);

                self.setState({
                    polygonPaths
                });
            });

            google.maps.event.addListener(polygon.getPath(), 'remove_at', async function (index, obj) {
                polygonPaths = self.formatPolygonPaths(polygon.getPath());

                (formName && fieldName) && change(formName, fieldName, polygonPaths);

                self.setState({
                    polygonPaths
                });
            });
        }
    }

    onOverlayComplete(polygon) {
        const shape = polygon.overlay;
        shape.type = polygon.type;
        shape.setEditable(true);
        this.shapes.push(shape);
    }

    removePolygon() {
        const { formName, fieldName, change } = this.props;
        this.shapes.forEach(shape => shape.setMap(null));
        this.setState({ polygonPaths: [], drawingMode: true });
        (formName && fieldName) && change(formName, fieldName, null);
    }

    render() {
        const { lat, lng, zoom, height, width } = this.props;
        const { polygonPaths, drawingMode, center } = this.state;
        
        return (
            <GoogleMap
                ref={(map) => {
                    refs.map = map;
                }}
                zoom={zoom}
                center={center}
                mapContainerStyle={{ height, width }}
                onLoad={(map) => this.onPolygonLoad(map)}
            >   
                {
                    polygonPaths.length > 0 && <button type="button" 
                        onClick={this.removePolygon} 
                        className={'btn link'}
                    >
                        <FormattedMessage {...messages.removeLocation} />
                    </button>
                }
                {
                    polygonPaths.length > 0 && <Polygon
                        ref={(ref) => { this.ref = ref; }}
                        paths={polygonPaths}
                        key={1}
                        editable={true}
                        draggable={false}
                        options={{
                            fillColor: "blue",
                            strokeColor: "#FF0000",
                            fillOpacity: 0.35,
                            strokeWeight: 1,
                        }}
                        onLoad={(polygon) => this.onPolygonComplete(polygon, 'onPolygonComplete1')}
                    />
                }
                {
                    drawingMode && <DrawingManager
                        drawingMode={google.maps.drawing.OverlayType.POLYGON}
                        options={{
                            drawingControlOptions: {
                                position: google.maps.ControlPosition.TOP_CENTER,
                                drawingModes: ['polygon']
                            },
                            polygonOptions: {
                                fillColor: "#FF0000",
                                strokeColor: "#FF0000",
                                fillOpacity: 0.35,
                                strokeWeight: 1,
                                clickable: true,
                                editable: true,
                                draggable: true,
                                zIndex: 1,
                            },
                        }}
                        onPolygonComplete={(polygon) => this.onPolygonComplete(polygon, 'onPolygonComplete')}
                        onOverlayComplete={(polygon) => this.onOverlayComplete(polygon)}
                    />
                }
            </GoogleMap>
        )
    }
}

const mapState = state => ({ });

const mapDispatch = {
    change
};

export default connect(mapState, mapDispatch)(DrawPolygonMap);