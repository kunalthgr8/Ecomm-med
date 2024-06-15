import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import productService from "../../appwrite/product";
import authService from "../../appwrite/auth";

function InfoCard({ title, value }) {
  return (
    <div className="bg-nav-color shadow-xl text-nav-white w-1/4 h-[150px] rounded-lg flex flex-col justify-evenly self-center">
      <div className="text-center font-bold text-lg tracking-wider">
        {title}
      </div>
      <div className="text-center font-medium text-base tracking-wide">
        {value}
      </div>
    </div>
  );
}

function AdminDashboard() {
  const { userData } = useSelector((state) => state.auth);
  const userRole = userData?.role === "admin" || false;
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalCustomers: 0,
    totalOrders: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [productResponse, userResponse] = await Promise.all([
          productService.getAdminProducts(),
          authService.getCurrentUser(),
        ]);

        if (productResponse) {
          console.log("productResponse", productResponse);
          const totalCustomers = productResponse.reduce((total, product) => total + product.customers, 0);
          setDashboardData((prevData) => ({
            ...prevData,
            totalProducts: productResponse.length,
            totalCustomers,
          }));
        }

        if (userResponse) {
          console.log("userResponse", userResponse);
          setDashboardData((prevData) => ({
            ...prevData,
            totalOrders: userResponse.data.data.orders,
          }));
        }
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };

    fetchDashboardData();
  }, []);

  const { totalProducts, totalCustomers, totalOrders } = dashboardData;

  return (
    <>
      {userRole && (
        <div className="flex flex-col justify-center self-center w-3/4">
          <div className="flex flex-col justify-center self-center w-full shadow-xl text-center bg-button-color border-2 border-none rounded-lg p-4 text-nav-white font-bold tracking-wider text-lg">
            Total Earned : Rs. 1000
          </div>
          <div className="flex justify-center self-center gap-10 mt-14 w-full">
            <InfoCard title="Total Customers" value={totalCustomers} />
            <InfoCard title="Total Orders" value={totalOrders} />
            <InfoCard title="Total Products" value={totalProducts} />
          </div>
        </div>
      )}
    </>
  );
}

export default AdminDashboard;
