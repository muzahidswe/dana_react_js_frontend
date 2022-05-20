import React, { useState } from "react";
import {
    Card,
    CardBody,
    CardTitle,
    Input,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
  } from "reactstrap";
  
function AddMenu(props) {
    
    const [folderOpen , setFolderOpen] = useState(false)
    const [status , setStatus] = useState(false)
    const [accessForLevel , setaccessForLevel] = useState('None Selected')
    const [accessForUser , setaccessForUser] = useState('None Selected')
    const [folderOpenUser , setfolderOpenUser] = useState(false)
    const [radioButoon , setRadioButton] = useState('Main Menu')

    const [formData , setFormData] = useState({
        menuName:'',
        module:'',
        menuLink:'',
        parentMenu:'',
        iconClass:'',
        accessForlevel:'',
        accessForUser:''
    })
    
    const toggleFolder = () =>{
        setFolderOpen(!folderOpen)
    }

    const toggleFolderUser = () =>{
        setfolderOpenUser(!folderOpenUser)
    }

    const handleChange =(e)=>{
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleAccessLevel = (e) =>{
        setaccessForLevel(e)
    }
    
  return (
    <Card>
        <CardBody>
          <CardTitle className="h4">Add Menu</CardTitle>
        
            <div className="mb-3 row">
                <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
                >
                    Menu Label / Menu Name *
                </label>
                <div className="col-md-10">
                    <input
                        className="form-control"
                        type="text"
                        defaultValue="DashBoard"
                        name = 'menuName'
                        onChange={(e) => {
                            handleChange(e)
                        }}
                    />
                </div>
            </div>
            <div className="mb-3 row">
                <label
                htmlFor="example-search-input"
                className="col-md-2 col-form-label"
                >
                Menu Type *
                </label>
                <div className="col-md-3 mt-2">
                    <div className="form-check form-check-right mb-3">
                        <input
                        type="radio"
                        id="customRadio1"
                        name="Root Menu"
                        className="form-check-input"
                        checked={radioButoon == 'Root Menu' ? 'checked' : ''}
                        onClick={() => {
                            setRadioButton('Root Menu')
                        }}
                        />
                        <label
                        className="form-check-label"
                        htmlFor="customRadio1"
                        >
                        Root Menu
                        </label>
                    </div>
                </div>
                <div className="col-md-3  mt-2">
                <div className="form-check form-check-right mb-3">
                        <input
                        type="radio"
                        id="customRadio1"
                        name="Main Menu"
                        className="form-check-input"
                        checked={radioButoon == 'Main Menu' ? 'checked' : ''}
                        onClick={() => {
                            setRadioButton('Main Menu')
                        }}
                        />
                        <label
                        className="form-check-label"
                        htmlFor="customRadio1"
                        >
                        Main Menu
                        </label>
                    </div>
                </div>
                <div className="col-md-3  mt-2">
                <div className="form-check form-check-right mb-3">
                        <input
                        type="radio"
                        id="customRadio1"
                        name="Child Menu"
                        className="form-check-input"
                        checked={radioButoon == 'Child Menu' ? 'checked' : ''}
                        onClick={() => {
                            setRadioButton('Child Menu')
                        }}
                        />
                        <label
                        className="form-check-label"
                        htmlFor="customRadio1"
                        >
                        Child Menu
                        </label>
                    </div>
                </div>
            </div>
            <div className="mb-3 row">
                <label
                htmlFor="example-email-input"
                className="col-md-2 col-form-label"
                >
                Module
                </label>
                <div className="col-md-10">
                    <Input type="select" className="form-select" name='module' id="autoSizingSelect" onChange={(e) => {
                        handleChange(e)
                    }}>
                        <option defaultValue>Choose Menu Module</option>
                        <option value="one">One</option>
                        <option value="two">Two</option>
                        <option value="three">Three</option>
                    </Input>
                </div>
            </div>
            <div className="mb-3 row">
                <label
                htmlFor="example-url-input"
                className="col-md-2 col-form-label"
                >
                Menu Link *
                </label>
                <div className="col-md-10">
                <input
                    className="form-control"
                    type="url"
                    defaultValue="https://getbootstrap.com"
                    name='menuLink'
                    onChange={(e) => {
                        handleChange(e)
                    }}
                />
                </div>
            </div>
            <div className="mb-3 row">
                <label
                htmlFor="example-tel-input"
                className="col-md-2 col-form-label"
                >
                Parent Menu
                </label>
                <div className="col-md-10">
                <input
                    className="form-control"
                    type="tel"
                    defaultValue=""
                    name='parentMenu'
                    onChange={(e) => {
                        handleChange(e)
                    }}
                />
                </div>
            </div>
            <div className="mb-3 row">
                <label
                htmlFor="example-password-input"
                className="col-md-2 col-form-label"
                >
                Icon Class *
                </label>
                <div className="col-md-10">
                <input
                    className="form-control"
                    type="text"
                    defaultValue="faCoffee"
                    name='iconClass'
                    onChange={(e) => {
                        handleChange(e)
                    }}
                />
                </div>
            </div>
            <div className="mb-3 row">
                <label
                htmlFor="example-number-input"
                className="col-md-2 col-form-label"
                >
                Access for Level
                </label>
                <div className="col-md-10">
                    <Dropdown
                        isOpen={folderOpen}
                        toggle={()=>toggleFolder()}
                        className="btn-group me-2 mb-2 mb-sm-0"
                    >
                        <DropdownToggle
                        className="btn btn-primary dropdown-toggle"
                        tag="i"
                        >
                        {accessForLevel}
                    
                        <i className="mdi mdi-chevron-down ms-1"/>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem  onClick={() => {
                                handleAccessLevel('Updates')
                            }}>Updates one</DropdownItem>
                            <DropdownItem onClick={() => {
                                handleAccessLevel('Updates')
                            }}>Social One</DropdownItem>
                            <DropdownItem onClick={() => {
                                setaccessForLevel('Updates Two')
                            }}>Team Manage One</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <div className="mb-3 row">
                <label
                htmlFor="example-datetime-local-input"
                className="col-md-2 col-form-label"
                >
                Access for User
                </label>
                <div className="col-md-10">
                <Dropdown
                        isOpen={folderOpenUser}
                        toggle={()=>toggleFolderUser()}
                        className="btn-group me-2 mb-2 mb-sm-0"
                    >
                        <DropdownToggle
                        className="btn btn-primary dropdown-toggle"
                        tag="i"
                        >
                        {accessForUser}
                        <i className="mdi mdi-chevron-down ms-1"/>
                        </DropdownToggle>
                        <DropdownMenu>
                        <DropdownItem onClick={() => {
                            setaccessForUser('Updates')
                        }}>Updates</DropdownItem>
                        <DropdownItem onClick={() => {
                            setaccessForUser('Updates')
                        }}>Social</DropdownItem>
                        <DropdownItem onClick={() => {
                            setaccessForUser('Updates')
                        }}>Team Manage</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <div className="mb-3 row">
                <label
                htmlFor="example-date-input"
                className="col-md-2 col-form-label"
                >
                Satus *
                </label>
                <div className="col-md-10">
                <div
                    className="form-check form-switch form-switch-lg mb-3"
                    >
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="customSwitchsizelg"
                        defaultChecked
                        onClick={() => {
                            setStatus(!status)
                        }}
                    />
                
                </div>
                </div>
            </div>
         
        </CardBody>
    </Card>
  );
}

export default AddMenu;
