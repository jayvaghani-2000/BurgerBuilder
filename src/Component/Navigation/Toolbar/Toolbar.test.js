import React from "react";
import { configure,shallow,mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import Toolbar from "./Toolbar"
import Logo from "../../Logo/Logo"
import NavigationItems from "./NavigationItems/NavigationItems";

configure({ adapter:new Adapter()});

describe('<Toolbar/>',()=>{
    let wrapper;
    beforeEach(()=>{wrapper=shallow(<Toolbar/>)})
    it('should render  <Logo /> ',()=>{
        expect(wrapper.find(Logo)).toHaveLength(1);
    });  
    it('should render  <NavigationItems /> ',()=>{
        expect(wrapper.find(NavigationItems)).toHaveLength(1)
    });  
})