/**
 * MapBox.jsx
 * Created by Kevin Li 2/17/17
 */

import React, { useEffect, useState, useImperativeHandle, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import MapboxGL from 'mapbox-gl/dist/mapbox-gl';
import { throttle } from 'lodash';
import * as Icons from 'components/sharedComponents/icons/Icons';

import kGlobalConstants from 'GlobalConstants';

const propTypes = {
    loadedMap: PropTypes.func,
    unloadedMap: PropTypes.func,
    center: PropTypes.array
};

// Define map movement increment
const delta = 100;

// define map sources
const mapStyle = 'mapbox://styles/usaspending/cj18cwjh300302slllhddyynm';

const MapBox = forwardRef((props, ref) => {
    let componentUnmounted = false;
    const map = useRef();
    const mapDiv = useRef(null);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showNavButtons, setShowNavButtons] = useState(false);

    useImperativeHandle(ref, () => ({
        map
    }));

    const moveMap = (bearing) => {
        map.current.panBy(bearing);
    };

    const moveUp = () => {
        moveMap([0, -delta]);
    };

    const moveLeft = () => {
        moveMap([-delta, 0]);
    };

    const moveRight = () => {
        moveMap([delta, 0]);
    };

    const moveDown = () => {
        moveMap([0, delta]);
    };


    const centerMap = (m) => {
        m.current.jumpTo({
            zoom: 4,
            center: props.center
        });
    };

    const resizeMap = () => {
        if (windowWidth < 768) {
            map.current.dragPan.disable();
            centerMap(map);
            setShowNavButtons(true);
        }
        else {
            map.current.dragPan.enable();
            setShowNavButtons(false);
        }
    };

    const mountMap = () => {
        MapboxGL.accessToken = kGlobalConstants.MAPBOX_TOKEN;
        map.current = new MapboxGL.Map({
            container: mapDiv.current,
            style: mapStyle,
            logoPosition: 'bottom-right',
            attributionControl: false,
            center: props.center,
            zoom: 3.2,
            dragRotate: false // disable 3D view
        });

        // add navigation controls
        map.current.addControl(new MapboxGL.NavigationControl());
        map.current.addControl(new MapboxGL.AttributionControl({
            compact: false
        }));

        // disable the compass controls
        map.current.dragRotate.disable();

        let showNavigationButtons = false;
        if (windowWidth < 768) {
            showNavigationButtons = true;
            map.current.dragPan.disable();
            centerMap(map);
        }

        // disable scroll zoom
        map.current.scrollZoom.disable();

        // prepare the shapes
        map.current.on('load', () => {
            if (componentUnmounted) {
                // don't update the state if the map has been unmounted
                return;
            }

            setShowNavButtons(showNavigationButtons);
            props.loadedMap(map);
        });
    };

    const handleWindowResize = throttle(() => {
        // determine if the width changed
        const currentWindowWidth = window.innerWidth;
        if (currentWindowWidth !== windowWidth) {
            // width changed, update the visualization width
            setWindowWidth(currentWindowWidth);
        }
    }, 16);

    useEffect(() => {
        componentUnmounted = false;
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
            props.unloadedMap();
            componentUnmounted = true;
        };
    }, []);

    useEffect(() => {
        if (map.current) {
            resizeMap();
        }
        else {
            mountMap();
        }
    }, [mountMap, resizeMap, windowWidth]);

    return (
        <div
            className="mapbox-item"
            ref={(div) => {
                mapDiv.current = div;
            }}>
            <div className={`map-buttons ${showNavButtons ? '' : 'hide'}`}>
                <div className="first-row">
                    <button
                        onMouseDown={moveUp}
                        onTouchStart={moveUp}>
                        <Icons.AngleUp />
                    </button>
                </div>
                <div className="second-row">
                    <button
                        onMouseDown={moveLeft}
                        onTouchStart={moveLeft}>
                        <Icons.AngleLeft />
                    </button>
                    <button
                        onMouseDown={moveDown}
                        onTouchStart={moveDown}>
                        <Icons.AngleDown />
                    </button>
                    <button
                        onMouseDown={moveRight}
                        onTouchStart={moveRight}>
                        <Icons.AngleRight />
                    </button>
                </div>
            </div>
        </div>
    );
});

MapBox.propTypes = propTypes;

export default MapBox;
