import CardOne from "../../Components/Cards/CardOne";
import TableChart from "../../Components/Chart/TableChart";
import BarChart from "../../Components/Chart/BarChart";
import SideBarr from "../../Components/SideBar/SideBar";
import CardTwo from "../../Components/Cards/CardTwo";
import CardThree from "../../Components/Cards/CardThree";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const DBoard = () => {

  return (
    <>
      <div className="min  -h-screen bg-gray-50/50">
    {/* --------- SideBar ----------- */}
    <SideBarr />
        {/* --------- Header ----------- */}

    <div className="p-4 xl:ml-80">
      <Header/>
  
          {/* --------- Cards----------- */}
      <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
              {/* Card 1 ---  */}
              <CardOne  />
              {/* Card 2 --- */}
              <CardTwo  />
              {/* Card 3 ---- */}
              <CardThree  />
            </div>
       {/* Table Chart */}
       <div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
       <TableChart />
       <BarChart />
       </div>
       
      </div>
      <div className="text-blue-gray-600 mt-2">
        <Footer/>
      </div>
    </div>
  </div>
    </>
  );
};

export default DBoard;
