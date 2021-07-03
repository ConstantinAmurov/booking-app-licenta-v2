export const SET_COMPANIES = 'SET_COMPANIES';
export const SET_ACTIVE_COMPANY = 'SET_ACTIVE_COMPANY';
export const SET_SERVER_RESPONSE= 'SET_SERVER_RESPONSE';
export const HANDLE_COMPANIES_LOADING = 'HANDLE_COMPANIES_LOADING';

const initialState = {
    companies: [],
    selectedCompany : {},
    isLoadingCompanies: false,

}

const companyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMPANIES:
            return {
                ...state,
                companies: [...action.companies]
            }
        case SET_ACTIVE_COMPANY:
            return {
                ...state,
                selectedCompany: action.company,
            }
        case HANDLE_COMPANIES_LOADING:
            return {
                ...state,
                isLoadingCompanies: action.isLoading,
            }
        default:
            return {
                ...state
            }
    }
}
export default companyReducer;