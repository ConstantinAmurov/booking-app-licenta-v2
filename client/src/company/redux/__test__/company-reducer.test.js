import {setActiveCompany} from '../company-action-creator'
import companyReducer from '../company-reducer'

describe("chech company actions",()=>{

    it('should create an action ', () => {

        const expectedAction = {
            type: "SET_ACTIVE_COMPANY",
            company: 
            {
                name: "MyComp",
                description: "Company Description",
                imageURL: "url"
            },
        }
        expect(setActiveCompany({
            name: "MyComp",
            description: "Company Description",
            imageURL: "url"
        })).toEqual(expectedAction)
      })

    
})

describe('todos reducer', () => {
    it('should return the initial state', () => {
      expect(companyReducer(undefined,{})).toEqual(
        {
            companies: [],
            selectedCompany : {},
        }
      )
    })
  

    it('should set active company', () => {

      expect(
        companyReducer(undefined, {
            type: "SET_ACTIVE_COMPANY",
            company: 
            {
                name: "MyComp",
                description: "Company Description",
                imageURL: "url"
            },
        })
      ).toEqual(
        {
            companies: [],
            selectedCompany : {
                name: "MyComp",
                description: "Company Description",
                imageURL: "url"
        },
        }
      )
    })
  })