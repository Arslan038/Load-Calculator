import Dashboard from "views/Dashboard.jsx";
import Login from "views/Login.jsx";
import SnowLoad from "views/SnowLoad.jsx";
import Profile from "views/Profile.jsx";
import ProjectDetails from "views/ProjectDetails.jsx";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/add-snow-load",
    name: "Add Snow Load",
    icon: "nc-icon nc-simple-add",
    component: SnowLoad,
    layout: "/admin"
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "nc-icon nc-tile-56",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/project-details/:id",
    name: "Project Details",
    icon: "nc-icon nc-tile-56",
    component: ProjectDetails,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "login",
    icon: "nc-icon nc-diamond",
    component: Login, 
     layout: "/auth"
  },
  
  
];


export default routes;
