import { createSelector } from "reselect"

export const getCompanies = (state)=>{
    return state.companies.companies
}

export const getProfileInfo = (state) =>{
    return state.profileInfo
}

export const getCurrentUser = createSelector(getProfileInfo,
    (profileInfo) => profileInfo.user
)
export const getIsLoadingCompanies = (state) =>{
    return state.companies.isLoadingCompanies;
}

export const getMyCompanies =  createSelector ( getCompanies,getCurrentUser,
    (companies,currentUser)=>{
        return companies.filter(company =>{            
            return company.userID === currentUser.id
        })
})
export const getAuthStatus =  createSelector ( getProfileInfo,
    (profileInfo)=>profileInfo.isAuth
)

export const getSelectedCompanyID = (state)=>{
    return state.companies?.selectedCompany?._id
}



export const getServiceAvailibilityString = (service)=>{
    const { byAdmin } = service.periods
    return byAdmin.map(dayOfWeek=>{
        const dayKey = Object.keys(dayOfWeek)
            if(dayOfWeek[dayKey[0]].length > 0){
                return dayKey[0][0].toUpperCase() + dayKey[0].slice(1);
            }
            return null;
        }).filter(day => day!==null).join(", ");
}