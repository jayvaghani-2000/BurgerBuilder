import React from "react";
import { configure,shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import {NavigationItems} from './NavigationItems';
import NavigationItem from "./NavigationItem/NavigationItem"

configure({ adapter:new Adapter()});

describe('<NavigationItems/>',()=>{
    let wrapper;
    beforeEach(()=>{wrapper=shallow(<NavigationItems/>)})
    it('should render 3 <NavigationItem /> if authenticated',()=>{
        wrapper.setProps({isAuth:true});
        // wrapper=shallow(<NavigationItems isAuth={true}/>);
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })   
    it('should render 2 <NavigationItem /> if not authenticated',()=>{
        // wrapper=shallow(<NavigationItems />);
        expect(wrapper.find("NavigationItem")).toHaveLength(2);
    });   
})