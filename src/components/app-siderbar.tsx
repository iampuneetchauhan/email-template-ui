import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const {isMobile,setOpenMobile} = useSidebar();

  const handleSidebarCloseInMobile = () =>{
    if(isMobile) setOpenMobile(false);
  }
  
  return (
    <Sidebar className="fixed top-10 left-0 h-[calc(100vh-40px)] w-64 bg-red-600">
      <SidebarHeader>
        {/* Optional header content */}
        My App
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup onClick={handleSidebarCloseInMobile}>
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-red-500 transition-colors"
          >
            Templates
          </Link>
        </SidebarGroup>
        <SidebarGroup onClick={handleSidebarCloseInMobile}>
          <Link
            to="/history"
            className="block px-4 py-2 hover:bg-red-500 transition-colors"
          >
            History
          </Link>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {/* Optional footer content */}
      </SidebarFooter>
    </Sidebar>
  );
}
