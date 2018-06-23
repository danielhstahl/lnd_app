import Transactions from 'views/Transactions'
import Payments from 'views/Payments'
import SignIn from 'views/SignIn'
import Invoices from 'views/Invoices'
import ContentPaste from "@material-ui/icons/ContentPaste"
import AttachMoney from "@material-ui/icons/AttachMoney"
import LibraryBooks from "@material-ui/icons/LibraryBooks"
import Settings from "@material-ui/icons/Settings"

export default [
    {
      path: "/transactions",
      sidebarName: "Transactions",
      navbarName: "View Transactions",
      icon: ContentPaste,
      component: Transactions
    },
    {
      path: "/payments",
      sidebarName: "Payments",
      navbarName: "Make Payment",
      icon: AttachMoney,
      component: Payments 
    },
    {
      path: "/invoices",
      sidebarName: "Invoices",
      navbarName: "Make and View Invoices",
      icon: LibraryBooks,
      component: Invoices 
    },
    {
      path: "/settings",
      sidebarName: "Lightning Settings",
      navbarName: "Settings",
      icon: Settings,
      component: SignIn
    },
    { redirect: true, path: "/", to: "/settings", navbarName: "Redirect" }
]