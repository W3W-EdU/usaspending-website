/**
 * StateContent.jsx
 * Created by Lizzie Salita 5/2/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import StateTimeVisualizationSectionContainer from 'containers/state/StateTimeVisualizationSectionContainer';
import TopFiveSection from './topFive/TopFiveSection';
import StateOverview from './overview/StateOverview';


const propTypes = {
    stateProfile: PropTypes.object
};

const StateContent = ({ stateProfile }) => (
    <div className="state-content-wrapper">
        <div className="state-content">
            <StateOverview
                stateProfile={stateProfile.overview} />
            <StateTimeVisualizationSectionContainer
                stateProfile={stateProfile.overview} />
            <TopFiveSection />
        </div>
    </div>
);

StateContent.propTypes = propTypes;

export default StateContent;
