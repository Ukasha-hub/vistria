import React from 'react';
import Header from './Header';
import SideNav from './SideNav';
import Footer from './Footer';

const MainLayout = ({ children, onSearchResults }) => {
  return (
    <div className="wrapper">
      <Header onSearchResults={onSearchResults}/>
     {/*<SideNav /> */} 
      <div className="content-wrapper ">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
