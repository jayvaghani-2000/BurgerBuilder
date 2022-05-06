import React from "react";
import { configure,shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16"
import {Auth} from "./Auth";
import Button from "../../UI/Button/Button";

configure({ adapter:new Adapter()});

describe('<NavigationItems/>',()=>{
    let wrapperd;
    beforeEach(()=>{
        wrapperd=shallow(<Auth/>)
        console.log(wrapperd)
    })

        
    it('should render <Button/> always',()=>{
        expect(wrapperd.find(Button)).not.toHaveLength(1);
    });
})