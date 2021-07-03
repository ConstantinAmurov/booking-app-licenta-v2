import { getByTestId, render, screen } from "@testing-library/react";
import CustomButton from '../CustomButton';
import renderer from 'react-test-renderer';
describe("custom-button",()=>{

    test("check the text inside the button",()=>{

        render(<CustomButton>Hello</CustomButton>)
        const helloElement = screen.getByText("Hello",{exact: false});
        expect(helloElement).toBeInTheDocument();
        
    })

    test("check class",()=>{

        const {container} = render(<CustomButton profilebtn searchbtn whitebtn>Hello</CustomButton>);        
        expect(container.firstChild).toHaveClass('profilebtn customButton whitebtn searchbtn',{exact: true});
        
    })
    test("check click",()=>{

        const {getByTestId} =  render(<CustomButton >Hello</CustomButton>);
        const button = getByTestId('submit-button');
        expect(button).toHaveTextContent("Hello");
    })
    test("create snapshot",()=>{

        const tree =  renderer.create(<CustomButton >Hello</CustomButton>).toJSON();
        expect(tree).toMatchSnapshot()
    })

    test("create snapshot with new class",()=>{

        const tree =  renderer.create(<CustomButton yellowbtn >Hello</CustomButton>).toJSON();
        expect(tree).toMatchSnapshot()
    })
    // test("check style",()=>{

    //     const {getByTestId} =  render(<CustomButton >Hello</CustomButton>);
    //     const button = getByTestId('submit-button');
    //     expect(button).toHaveStyle({"box-shadow": "0px 7px 14px 2px rgba(65, 73, 185, 0.2)"},{exact: false});
    // })
    
})