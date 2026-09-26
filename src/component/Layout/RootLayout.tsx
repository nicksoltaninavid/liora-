import { Outlet } from "react-router-dom";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
import ScrollToTop from "../ScrollToTop";
import ToastContainer from "../Toast/ToastContainer";

function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />  
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default RootLayout;