import { setUserAction } from "../user-action-creator";
import userReducer from "../user-reducer";


describe("chech actions",()=>{

    it('should create an action ', () => {
        const text = 'Finish docs'

        const expectedAction = {
          type: "SET_USER",
          user: "dima",
        }
        expect(setUserAction("dima")).toEqual(expectedAction)
      })

    it('should create an action ', () => {
        const text = 'Finish docs'

        const expectedAction = {
          type: "SET_USER",
          user: "dim",
        }
        expect(setUserAction("dima")).not.toEqual(expectedAction)
      })
    
})

describe('todos reducer', () => {
    it('should return the initial state', () => {
      expect(userReducer(undefined,{})).toEqual(
        {
          user: {},
          isAuth: false,
        }
      )
    })
  
    it('should set current user', () => {

      expect(
        userReducer([], {
            type: "SET_USER",
            user: {
                name:'Dima',
                age:21,        
            }
        })
      ).toEqual(
        {
        user: {
            name:'Dima',
            age:21,        
        },
        isAuth: true,
        }
      )
    })
  })