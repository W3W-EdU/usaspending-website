/**
 * TopFive.jsx
 * Created by Kevin Li 5/15/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table, TooltipWrapper } from 'data-transparency-ui';
import { categoryTitles } from 'dataMapping/state/topCategories';
import { CondensedCDTooltip } from '../../../components/award/shared/InfoTooltipContent';

const propTypes = {
    category: PropTypes.string,
    results: PropTypes.array,
    total: PropTypes.number,
    loading: PropTypes.bool,
    error: PropTypes.bool
};

const TopFive = (props) => {
    const columns = [
        {
            title: 'name',
            displayName: 'Name'
        },
        {
            title: 'amount',
            displayName: ["Obligations"]

        },
        {
            title: 'percent',
            displayName: ["% of Total"]
        }
    ];

    const tableRows = props.results.map((result) => {
        const percentValue = (result._amount / props.total) * 100;
        const percent = isNaN(percentValue) ? '--' : `${Math.round(percentValue * 100) / 100}%`;
        return [result._slug ? result.linkedName : result.name, result.amount, percent];
    });

    return (
        <div className="category-table">
            <div className="category-table__title">
                <img
                    className="category-table__title-icon"
                    src={`img/state-categories/${props.category}.png`}
                    aria-hidden="true"
                    alt="" />
                <div className="category-table__title-name">
                    {props.category === "district" ?
                        <>{categoryTitles[props.category]}
                            <TooltipWrapper
                                className="congressional-district__tt"
                                icon="info"
                                tooltipPosition="bottom"
                                styles={{
                                    position: 'relative'
                                }}
                                tooltipComponent={<CondensedCDTooltip title="Congressional Districts" />} />
                        </> : categoryTitles[props.category]}
                </div>
            </div>
            <Table
                classNames={['topfive-table__table']}
                columns={columns}
                rows={tableRows}
                loading={props.loading}
                error={props.error} />
        </div>
    );
};

TopFive.propTypes = propTypes;

export default TopFive;
