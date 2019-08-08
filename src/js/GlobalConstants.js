/**
 * GlobalConstants.js
 * Created by Maxwell Kendall 7/8/19
 */

const globalConstants = {
    // PROD
    API: process.env.API_URL,
    LOCAL_ROOT: "",
    GITHUB: "",
    GA_TRACKING_ID: "UA-92617810-1",
    LOCAL: false,
    DEV: (process.env.NODE_ENV === 'development'),
    KEYWORD_AVAILABLE: true,
    PERF_LOG: false,
    OVERRIDE_FISCAL_YEAR: false,
    FISCAL_YEAR: 2017,
    MAPBOX_TOKEN:
    "pk.eyJ1IjoidXNhc3BlbmRpbmciLCJhIjoiY2l6ZnZjcmh0MDBtbDMybWt6NDR4cjR6ZSJ9.zsCqjJgrMDOA-i1RcCvGvg"
};

export default globalConstants;

