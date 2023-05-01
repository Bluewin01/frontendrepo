import React from "react";
import {
  MdOutlineMailOutline,
  MdOutlineSms,
  MdNotificationImportant,
} from "react-icons/md";
import {
  Side,
  SidebarMenu,
  SidebarMenuIndicator,
  SidebarMenuItem,
} from "./SidebarElements";

const sidebarNavItems = [
  {
    display: "Email",
    icon: <MdOutlineMailOutline size={28} />,
  },
  {
    display: "Sms",
    icon: <MdOutlineSms size={28} />,
  },
  {
    display: "Push",
    icon: <MdNotificationImportant size={28} />,
  },
];

const Sidebar = (props) => {
  const { templateType } = props;

  return (
    <Side>
      <SidebarMenu>
        {sidebarNavItems.map((item, index) => (
          <SidebarMenuItem
            key={index}
            active={item.display === templateType ? true : false}
            onClick={() => {
              props.handleClick(item.display);
            }}
          >
            <div>{item.icon}</div>
            <div>{item.display}</div>
          </SidebarMenuItem>
        ))}
        <SidebarMenuIndicator type={templateType}></SidebarMenuIndicator>
      </SidebarMenu>
    </Side>
  );
};

export default Sidebar;
