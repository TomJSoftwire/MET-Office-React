import React from 'react';
import styled from 'styled-components';

const Theme = {
    colors:{
        bg: '#fff',
        dark: '#24292e',
        light: '#ffffff',
        red: '#ff5851'
    },
    fonts:{
        body:' sans-serif',
        heading:' sans-serif',
    }
}

const Navbar = styled.nav`
    background:${Theme.colors.dark};
    font-family:${Theme.fonts.heading};
    color:${Theme.colors.light};
    display:flex;
    
    align-items: center;
    justify-content:space-between; 
`
const Brand = styled.a`
    text-decoration:none;
    color:white;
    font-weight:bold;
    padding:0 0  0 25px;
`
const Li = styled.li`
    display: flex;
    height: 100%;
    color:#999;
    text-decoration:none;
    font-size:14px;
    align-items:center;
    -webkit-box-align: center;
    -webkit-box-pack:center;
`
const Ul = styled.ul`
    display:flex;
    width:100%;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    align-items:center;
    list-style-type:none;
    justify-content:left;  
`
const A = styled.a`
    color:#ffffff;
    text-decoration:none;
    font-size:24px;
    padding : 5px 25px;
    display:flex;
    align-items: center;
`

function Header(props: {
    brand: {name:string,to:string},
    links: Array<{name:string,to:string}>
}){

    const {brand,links} = props;
    const NavLinks: any =()=> links.map((link: {name:string,to:string})=>{
        return(
            <Li key={link.name}><A href={link.to}>{link.name}</A></Li>
        )
    })

    return(
        <Navbar>
            <Brand href={brand.to}>{brand.name}</Brand>
            <Ul>
                <NavLinks />
            </Ul>
        </Navbar>
    )
}

export default Header;