import { SET_ACTIVE_COMPANY, SET_COMPANIES } from "./company-reducer"
import { HANDLE_COMPANIES_LOADING } from "./company-reducer"

export const setCompaniesAC = (companies) => {
    return {
        type: SET_COMPANIES,
        companies,
    }
}

export const setActiveCompany = (company) => {
    return {
        type: SET_ACTIVE_COMPANY,
        company,
    }
}


export const handleCompaniesIsLoading = (isLoading) => {
    return {
        type: HANDLE_COMPANIES_LOADING,
        isLoading,
    }
}
