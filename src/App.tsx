
// import Template from "./pages/templates/Template"
import Header from "./components/Header/Header"
import Layout from "./layout";
import { AppSidebar } from "./components/app-siderbar";
import AppRoutes from "./components/Routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
// import { SidebarProvider } from "./components/ui/sidebar"
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App;
