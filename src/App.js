import logo from "./logo.svg";
import "./App.css";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import auth, { logOut } from "./services/authService";
import Root from "./components/common/Root";
import LoginCheckRoute from "./components/common/loginCheckRoute";
import ProtectedRoute from "./components/common/protectedRoute";
import Footer from "./components/common/footer";
import Myprofile from "./components/common/Myprofile";
import SideBar from "./components/sideBar";
import Login from "./components/login";
import TopBar from "./components/topBar";
import HeaderMobile from "./components/headerMobile";
import './fonts/Nimbus/Nimbus.otf';
import CommonLogin from './components/CommonLogin';
import InfoUpload from "./components/UploadInformation/Distributor/distributorInfoUpload";
import SalesAgentUpload from "./components/UploadInformation/SalesAgent/SalesAgentUpload";
import RetailerUpload from "./components/UploadInformation/Retailer/RetailerUpload";
import DisbrushmentUpload from "./components/UploadInformation/Disbrusment/DisbrushmentUpload";
import ManufactureInfoUpload from "./components/UploadInformation/Manufacture/ManufactureInfoUpload";
import SupervisorInfoUpload from "./components/UploadInformation/Supervisor/SupervisorInfoUpload";
import AddMenu from "./components/AddMenu/AddMenu";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import CreateSchema from "./components/Schema/CreateSchema";



function App() {
  const [user, setUser] = useState();
  const [selecteAllMenu , setSelecteAllMenu] = useState(localStorage.getItem('menuBar')??[]);
  const location = useLocation();
  useEffect(() => {
    const user = auth.getCurrentUser();
    setUser(user);
  }, []);

  // useEffect(() => {
  //   if(location.pathname !='/login'){
  //     if(auth.getCurrentUser()){
  //       if(!selecteAllMenu.includes(location.pathname)){
  //         logOut()
  //         window.location = "/login";
  //       }
  //     }
  //   }
  // },[location.pathname]) 
 
  return (
    <div className="App">
    <Suspense fallback={<div>Loading...</div>}>
    <HeaderMobile />
    <LoginCheckRoute path="/login" component={Login} />
    <Route path="/common_login" exact component={CommonLogin} />
        <div className="d-flex flex-column flex-root">
            <div className="d-flex flex-row flex-column-fluid page">
              {user && <SideBar />}
                <div
                className="d-flex flex-column flex-row-fluid wrapper"
                id="kt_wrapper"
                >
                {user && <TopBar />}
                  <Switch>

                      {/* MyProfile information Start */}

                      <ProtectedRoute path="/myProfile" component={Myprofile} />

                      {/* MyProfile information End */}

                      {/* Menu Add Start */}

                      <ProtectedRoute path="/menu-add" component={AddMenu} />

                      {/* Menu Add End */}

                      {/* Upload Information Start */}

                      <ProtectedRoute path="/upload-distributor-onboarding-data" component={InfoUpload} />
                      <ProtectedRoute path="/upload-sales-agent-onboarding-data" component={SalesAgentUpload} />
                      <ProtectedRoute path="/retailer-upload-information" component={RetailerUpload} />
                      <ProtectedRoute path="/uploadr-retailer" component={RetailerUpload} />
                      <ProtectedRoute path="/upload-manufacturer-onboarding-data" component={ManufactureInfoUpload} />
                      <ProtectedRoute path="/upload-distributor-supervisor-onboarding-data" component={SupervisorInfoUpload} />
                      <ProtectedRoute path="/create_schema" component={CreateSchema} />


                      {/* Upload Information End */}

                      <Route path="/" exact component={Root} />

                    </Switch>
                </div>
            </div>
        </div>
    </Suspense>
    </div>
    );
}

export default App;
