import { Outlet } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../header/header";
import '../../../public/css/style.min.css';
import '../../../public/css/style.css';

function Layout(): JSX.Element {
  return(
    <>
      <div className="wrapper">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default Layout;
