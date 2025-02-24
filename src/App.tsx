
// import Template from "./pages/templates/Template"
import "./App.css"
import Header from "./components/Header/Header"
import Layout from "./layout";
import { AppSidebar } from "./components/app-siderbar";
import AppRoutes from "./components/Routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
// import { SidebarProvider } from "./components/ui/sidebar"
const App = ()=>{
  return (
    <>
    <BrowserRouter>
    <Header></Header>
    <Layout>
        <AppSidebar />
        <AppRoutes />
    </Layout>
</BrowserRouter>
    </>
  )
}

export default App;
