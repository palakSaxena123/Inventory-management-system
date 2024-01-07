import SideBarr from "../../Components/SideBar/SideBar";
import List from "../../Components/Table/List";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const ProductList = () => {
  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* --------- SideBar ----------- */}
      <SideBarr />
      {/* --------------- Header -------------- */}

      <div className="p-4 xl:ml-80">
        <Header />

        {/* --------------- Product List -------------- */}
        <List />

        {/* --------------- Footer -------------- */}
        <div className="text-blue-gray-600 mt-2">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
