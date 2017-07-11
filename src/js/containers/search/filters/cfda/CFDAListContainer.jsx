/**
* CFDAListContainer.jsx
* Created by Emily Gullo 07/10/2017
**/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEqual, upperCase, omit, differenceWith } from 'lodash';
import { isCancel } from 'axios';

import * as SearchHelper from 'helpers/searchHelper';
import * as autocompleteActions from 'redux/actions/search/autocompleteActions';

import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';

const propTypes = {
    selectCFDA: React.PropTypes.func,
    setAutocompleteCFDA: React.PropTypes.func,
    selectedCFDA: React.PropTypes.object,
    autocompleteCFDA: React.PropTypes.array
};

class CFDAListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cfdaSearchString: '',
            autocompleteCFDA: [],
            noResults: false
        };

        this.handleTextInput = this.handleTextInput.bind(this);
        this.clearAutocompleteSuggestions = this.clearAutocompleteSuggestions.bind(this);
        this.timeout = null;
    }

    componentDidMount() {
        this.parseAutocompleteLocations(this.props.autocompleteCFDA);
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(nextProps.autocompleteCFDA, this.props.autocompleteCFDA)) {
            this.parseAutocompleteLocations(nextProps.autocompleteCFDA);
        }
    }

    parseAutocompleteLocations(locations) {
        const values = [];
        if (locations.length > 0) {
            locations.forEach((item) => {
                let placeType = upperCase(item.place_type);
                if (item.parent !== null &&
                    (item.place_type !== null && item.place_type !== 'COUNTRY')) {
                    placeType += ` in ${item.parent}`;
                }

                values.push({
                    title: item.place,
                    subtitle: placeType,
                    data: item
                });
            });
        }

        this.setState({
            autocompleteLocations: values
        });
    }

    queryAutocompleteLocations(input) {
        this.setState({
            noResults: false
        });

        // Only search if input is 2 or more characters
        if (input.length >= 2) {
            this.setState({
                locationSearchString: input
            });

            if (this.locationSearchRequest) {
                // A request is currently in-flight, cancel it
                this.locationSearchRequest.cancel();
            }

            const locSearchParams = {
                value: this.state.locationSearchString,
                usage: "place_of_performance"
            };

            this.locationSearchRequest = SearchHelper.fetchLocations(locSearchParams);

            this.locationSearchRequest.promise
                .then((res) => {
                    const data = res.data;
                    let autocompleteData = [];

                    // Remove 'identifier' from selected locations to enable comparison
                    const selectedLocations = this.props.selectedCFDA.toArray()
                        .map((location) => omit(location, 'identifier'));

                    // Filter out any selectedLocations that may be in the result set
                    if (selectedLocations && selectedLocations.length > 0) {
                        autocompleteData = differenceWith(data, selectedLocations, isEqual);
                    }
                    else {
                        autocompleteData = data;
                    }

                    this.setState({
                        noResults: autocompleteData.length === 0
                    });

                    // Add search results to Redux
                    this.props.setAutocompleteCFDA(autocompleteData);
                })
                .catch((err) => {
                    if (!isCancel(err)) {
                        this.setState({
                            noResults: true
                        });
                    }
                });
        }
        else if (this.locationSearchRequest) {
            // A request is currently in-flight, cancel it
            this.locationSearchRequest.cancel();
        }
    }

    clearAutocompleteSuggestions() {
        this.props.setAutocompleteCFDA([]);
    }

    handleTextInput(locationInput) {
        // Clear existing locations to ensure user can't select an old or existing one
        this.props.setAutocompleteCFDA([]);

        // Grab input, clear any exiting timeout
        const input = locationInput.target.value;
        window.clearTimeout(this.timeout);

        // Perform search if user doesn't type again for 300ms
        this.timeout = window.setTimeout(() => {
            this.queryAutocompleteLocations(input);
        }, 300);
    }

    render() {
        return (
            <Autocomplete
                {...this.props}
                values={this.state.autocompleteCFDA}
                handleTextInput={this.handleTextInput}
                onSelect={this.props.selectCFDA}
                placeholder="eg: 10.553 - School Breakfast Program"
                errorHeader="Unknown CFDA"
                errorMessage="We were unable to find that CFDA."
                ref={(input) => {
                    this.cfdaList = input;
                }}
                clearAutocompleteSuggestions={this.clearAutocompleteSuggestions}
                noResults={this.state.noResults} />
        );
    }

}

export default connect(
    (state) => ({ autocompleteCFDA: state.autocompleteCFDA }),
    (dispatch) => bindActionCreators(autocompleteActions, dispatch)
)(CFDAListContainer);

CFDAListContainer.propTypes = propTypes;
