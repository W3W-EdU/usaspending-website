/**
 * disasterHelper.js
 * Created by Jonathan Hill 06/11/20
 */

import { apiRequest } from 'helpers/apiRequest';

export const fetchDEFCodes = () => apiRequest({
    url: 'v2/references/def_codes/'
});

export const fetchOverview = () => apiRequest({
    url: 'v2/disaster/overview/'
});

export const fetchAwardAmounts = (params) => apiRequest({
    isMocked: true,
    url: 'v2/disaster/award/amount/',
    method: 'post',
    data: params
});

export const fetchAwardCount = (params) => apiRequest({
    isMocked: true,
    url: 'v2/disaster/award/count/',
    method: 'post',
    data: params
});

export const fetchCfdaCount = (params) => apiRequest({
    isMocked: true,
    url: 'v2/disaster/cfda/count/',
    method: 'post',
    data: params
});
