import Dashboard from "@material-ui/icons/Dashboard"
import Person from "@material-ui/icons/Person"
import Transactions from 'views/Transactions'
import Payments from 'views/Payments'
import ContentPaste from "@material-ui/icons/ContentPaste"
import LibraryBooks from "@material-ui/icons/LibraryBooks"
import BubbleChart from "@material-ui/icons/BubbleChart"
import LocationOn from "@material-ui/icons/LocationOn"
import Notifications from "@material-ui/icons/Notifications"
import Unarchive from "@material-ui/icons/Unarchive"

import SignIn from 'views/SignIn'
export default [
    {
      path: "/transactions",
      sidebarName: "View Transactions",
      navbarName: "View Transactions",
      icon: ContentPaste,
      component: Transactions
    },
    {
      path: "/payments",
      sidebarName: "Payments",
      navbarName: "Payments",
      icon: ContentPaste,
      component: Payments 
    },
    {
      path: "/settings",
      sidebarName: "Lightning Settings",
      navbarName: "Settings",
      icon: Person,
      component: SignIn
    },
    { redirect: true, path: "/", to: "/settings", navbarName: "Redirect" }
]