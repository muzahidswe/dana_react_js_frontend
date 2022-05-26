import React, { useState, useEffect } from "react";

import { NavLink, Link } from "react-router-dom";
import { ReactComponent as Arrow } from "../svg/sidebarArrow.svg";
import { ReactComponent as Dashboard } from "../svg/dashboard.svg";
import { ReactComponent as Credit } from "../svg/credit.svg";
import { ReactComponent as Kyc } from "../svg/kyc.svg";
import { ReactComponent as Reports } from "../svg/reports.svg";
import { ReactComponent as Setting } from "../svg/setting.svg";
import { menuServiceByRole } from "../services/MenuService/MenuService";
/* import Menulist from "./MenuList"; */

function SideBar(props) {
   const [user_type, setUserType] = useState(localStorage.getItem('cr_user_type'));
   const [cr_setting_menu, settingMenu] = useState(localStorage.getItem('setting_menu'));
   const [dynamicMenu , setDynamicMenu] = useState([])
   useEffect(() => {
    const script2 = document.createElement("script");
    script2.src = "/assets/plugins/global/plugins.bundle.js";
    script2.async = true;
    document.body.appendChild(script2);
  }, []);
  const [selectedMenu, setSelectedMenu] = useState(localStorage.getItem('selected_menu'));
  const [selectedParentMenu, setSelectedParentMenu] = useState(localStorage.getItem('selected_parent_menu'));
  useEffect(() => {
    localStorage.setItem("selected_menu", selectedMenu);
    localStorage.setItem("selected_parent_menu", selectedParentMenu);
  }, [selectedMenu, selectedParentMenu]);

  useEffect(async () => {
    let menuResponse = await menuServiceByRole(1,1)
    setDynamicMenu(menuResponse.data.data)
  }, []);


  return (
    <div
      className="aside aside-left aside-fixed d-flex flex-column flex-row-auto"
      id="kt_aside"
      style={{ zIndex: 8888 }}
    >
      {/*begin::Brand*/}
      <div className="brand flex-column-auto" id="kt_brand" style={{backgroundColor:'white'}}>
        {/*begin::Logo*/}
        <a href="index.html" className="brand-logo">
          <img
            alt="Logo"
            style={{ height: '80px',padding: '10px' }}
            src="assets/media/logos/IPDC_Logo.png"
          />
          {/* <h1 className="text-white ">DANA-IPDC </h1> */}
        </a>
        {/* */}
        {/*end::Logo*/}
        {/*begin::Toggle*/}
        <button className="brand-toggle btn btn-sm px-0" id="kt_aside_toggle">
          <span className="svg-icon svg-icon svg-icon-xl">
            {/*begin::Svg Icon | path:assets/media/svg/icons/Navigation/Angle-double-left.svg*/}
            <Arrow />

            {/*end::Svg Icon*/}
          </span>
        </button>
        {/*end::Toolbar*/}
      </div>
      {/*end::Brand*/}
      {/*begin::Aside Menu*/}
      <div
        className="aside-menu-wrapper flex-column-fluid"
        id="kt_aside_menu_wrapper"
      >
        {/*begin::Menu Container*/}
        <div
          id="kt_aside_menu"
          className="aside-menu my-4"
          data-menu-vertical={1}
          data-menu-scroll={1}
          data-menu-dropdown-timeout={500}
        >
          {/*begin::Menu Nav*/}
          <ul className="menu-nav">
               <li
                 onClick={()=>setSelectedParentMenu('Menu Manager')}
                 className={selectedParentMenu=='Menu Manager' ? "menu-item menu-item-submenu menu-item-open" : "menu-item menu-item-submenu"}
                 aria-haspopup="true"
                 data-menu-toggle="hover"
               >
                 <a href="javascript:;" className="menu-link menu-toggle">
                   <span className="svg-icon menu-icon">
                     <Reports />
                   </span>
                   <span className="menu-text">Menu Manager</span>
                   <i className="menu-arrow" />
                 </a>
                 <div className="menu-submenu">
                   <i className="menu-arrow" />
                   <ul className="menu-subnav">
                     <li
                       className="menu-item menu-item-parent"
                       aria-haspopup="true"
                     >
                       <span className="menu-link">
                         <span className="menu-text">Add Menu</span>
                       </span>
                     </li>
                      <li className={selectedMenu == 'Add Menu' ? "menu-item menu-item-active" : "menu-item"} aria-haspopup="true">
                      <Link onClick={()=>setSelectedMenu('Add Menu')} to='/menu-add' className="menu-link">
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Add Menu</span>
                      </Link>
                    </li>
                   </ul>
                 </div>
          </li>
        
          {/* <hr></hr>	 */}
          {/* dynamic menu start */}
          {
            dynamicMenu && dynamicMenu?.length > 0 ?
            dynamicMenu?.map((mentuItem , index)=>{
              return(
                <>
                {
                   mentuItem?.children.length <= 0 ?
                   <>
                   <li className={selectedParentMenu == 'DashboardV3' ? "menu-item menu-item-active" : "menu-item"}  aria-haspopup="true">
                   <NavLink onClick={()=>setSelectedParentMenu('DashboardV3')} to={mentuItem.menu_url} className="menu-link">
                     <span className="svg-icon menu-icon">
                       <Dashboard />
                     </span>
                     <span className="menu-text">{mentuItem.menu_name}</span>
                   </NavLink>
                 </li>
                 <hr></hr>	
                 </>
                 :
                 <li
                 onClick={()=>setSelectedParentMenu(mentuItem.menu_name)}
                 className={mentuItem.menu_name == selectedParentMenu ? "menu-item menu-item-submenu menu-item-open" : "menu-item menu-item-submenu"}
                 aria-haspopup="true"
                 data-menu-toggle="hover"
               >
                 <a href="javascript:;" className="menu-link menu-toggle">
                   <span className="svg-icon menu-icon">
                     <Reports />
                   </span>
                   <span className="menu-text">{mentuItem.menu_name}</span>
                   <i className="menu-arrow" />
                 </a>
                 <div className="menu-submenu">
                   <i className="menu-arrow" />
                   <ul className="menu-subnav">
                     <li
                       className="menu-item menu-item-parent"
                       aria-haspopup="true"
                     >
                       <span className="menu-link">
                         <span className="menu-text">{mentuItem.menu_name}</span>
                       </span>
                     </li>
                     {
                    mentuItem?.children.length > 0 && mentuItem?.children?.map((subMenuitem)=>{
                       return(
                           <li className={selectedMenu == subMenuitem.menu_name ? "menu-item menu-item-active" : "menu-item"} aria-haspopup="true">
                            <Link onClick={()=>setSelectedMenu(subMenuitem.menu_name)} to={subMenuitem.menu_url} className="menu-link">
                              {/* <i className="menu-bullet menu-bullet-dot">
                                <span />
                              </i> */}
                              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                              <span className="menu-text">{subMenuitem.menu_name}</span>
                            </Link>
                         </li>
                       )
                     })
                   }
                  
                     {/* <li className={selectedMenu == 'Upload Distributor  Information' ? "menu-item menu-item-active" : "menu-item"} aria-haspopup="true">
                       <Link onClick={()=>setSelectedMenu('Upload Distributor Information')} to="/upload-distributor-information" className="menu-link">
                         <i className="menu-bullet menu-bullet-dot">
                           <span />
                         </i>
                         <span className="menu-text">Upload Distributor Information</span>
                       </Link>
                     </li>
                     <li className={selectedMenu == 'Sales Agent Information' ? "menu-item menu-item-active" : "menu-item"} aria-haspopup="true">
                       <Link onClick={()=>setSelectedMenu('Sales Agent Information')} to="/sales-agent-information" className="menu-link">
                         <i className="menu-bullet menu-bullet-dot">
                           <span />
                         </i>
                         <span className="menu-text">Sales Agent Information</span>
                       </Link>
                     </li>
                     <li className={selectedMenu == 'Retailer Upload Information' ? "menu-item menu-item-active" : "menu-item"} aria-haspopup="true">
                       <Link onClick={()=>setSelectedMenu('Retailer Upload Information')} to="/retailer-upload-information" className="menu-link">
                         <i className="menu-bullet menu-bullet-dot">
                           <span />
                         </i>
                         <span className="menu-text">Retailer Upload Information</span>
                       </Link>
                     </li>
                     <li className={selectedMenu == 'Disbrushment Upload Information' ? "menu-item menu-item-active" : "menu-item"} aria-haspopup="true">
                       <Link onClick={()=>setSelectedMenu('Disbrushment Upload Information')} to="/disbrushment-upload-information" className="menu-link">
                         <i className="menu-bullet menu-bullet-dot">
                           <span />
                         </i>
                         <span className="menu-text">Disbrushment Upload Information</span>
                       </Link>
                     </li>
                     <li className={selectedMenu == 'Manufacture Upload Information' ? "menu-item menu-item-active" : "menu-item"} aria-haspopup="true">
                       <Link onClick={()=>setSelectedMenu('Manufacture Upload Information')} to="/upload-manufacture-information" className="menu-link">
                         <i className="menu-bullet menu-bullet-dot">
                           <span />
                         </i>
                         <span className="menu-text">Manufacture Upload Information</span>
                       </Link>
                     </li>
                     <li className={selectedMenu == 'Supervisor Upload Information' ? "menu-item menu-item-active" : "menu-item"} aria-haspopup="true">
                       <Link onClick={()=>setSelectedMenu('Supervisor Upload Information')} to="/upload-supervisor-information" className="menu-link">
                         <i className="menu-bullet menu-bullet-dot">
                           <span />
                         </i>
                         <span className="menu-text">Supervisor Upload Information</span>
                       </Link>
                     </li> */}
                   
                   </ul>
                 </div>
                 </li>
                }      
                </>
              )
            })
           
            :''
          }
            
          </ul>
          {/*end::Menu Nav*/}
        </div>
        {/*end::Menu Container*/}
      </div>
      {/*end::Aside Menu*/}
    </div>
  );
}

export default SideBar;
