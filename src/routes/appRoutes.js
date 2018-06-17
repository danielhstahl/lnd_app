import Dashboard from "@material-ui/icons/Dashboard"
import Person from "@material-ui/icons/Person"
import ContentPaste from "@material-ui/icons/ContentPaste"
import LibraryBooks from "@material-ui/icons/LibraryBooks"
import BubbleChart from "@material-ui/icons/BubbleChart"
import LocationOn from "@material-ui/icons/LocationOn"
import Notifications from "@material-ui/icons/Notifications"
import Unarchive from "@material-ui/icons/Unarchive"

import SignIn from 'views/SignIn'
export default [
    /*{
      path: "/transactions",
      sidebarName: "Send/Receive Money",
      navbarName: "Send/Receive Money",
      icon: Dashboard,
      component: DashboardPage
    },*/
    {
      path: "/settings",
      sidebarName: "Lightning Settings",
      navbarName: "Settings",
      icon: Person,
      component: SignIn
    },
    { redirect: true, path: "/", to: "/settings", navbarName: "Redirect" }
]