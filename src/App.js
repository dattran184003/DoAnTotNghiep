import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { DarkModeContext } from './Admin/Layout/context/darkModeContext';
import "./Admin/Layout/style/dark.scss";


import HomeAdmin from './Admin/Home/HomeAdmin';
import Profile from './Admin/Profile/Profile';
import AccountList from './Admin/Account/AccountList';
import RegisterUser from './Admin/Account/RegisterUser';
import RegisterAdmin from './Admin/Account/RegisterAdmin';
import AccountEdit from './Admin/Account/AccountEdit';

import PromotionList from './Admin/Promotion/PromotionList';
import PromotionDetailList from './Admin/Promotion/PromotionDetailList';

import NewsList from './Admin/New/NewsList';
import ServiceList from './Admin/Service/ServiceList';

import Login from './Admin/Login/Login';


import ServiceDetailList from './Admin/Service/ServiceDetailList';
import BrandList from './Admin/Brand/BrandList';
import ModelList from './Admin/Model/ModelList';
import CarList from './Admin/Car/CarList';
import CarDetail from './Admin/Car/CarDetail';
import AddCar from './Admin/Car/AddCar';
import EditCar from './Admin/Car/EditCar';
import Chat from './Admin/Contact/Chat';
import ReviewList from './Admin/Review/ReviewList';
import CarImagesList from './Admin/CarImage/CarImagesList';
import AddCarImage from './Admin/CarImage/AddCarImage';
import EditCarImages from './Admin/CarImage/EditCarImages';
import ColorList from './Admin/Color/ColorList';
import AppointmentList from './Admin/Appointment/AppointmentList';
import PaymentList from './Admin/Payment/PaymentList';
import BrandFeedback from './Admin/BrandFeedback/BrandFeedback';
import CarFeedback from './Admin/CarFeedback/CarFeedback';
import DepositContractForm from './Admin/DepositContract/DepositContractForm';
import ResetPassword from './Admin/Profile/ResetPassword';
import ForgotPassword from './Admin/Profile/ForgotPassword';
import DepositContractList from './Admin/DepositContract/DepositContractList';
import DepositContractDetail from './Admin/DepositContract/DepositContractDetail';
import PaymentPage from './Admin/Payment/PaymentPage';
import PaySuccess from './Admin/Payment/PaySuccess';


const App = () => {
   const { darkMode } = useContext(DarkModeContext);
  return (
    <>
       <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
            <Route index element={<Login />} />

            <Route path='pay' element={<PaymentPage />} />
            <Route path="/paysucces.html" element={<PaySuccess />} >
                <Route index element={<PaySuccess />} />
            </Route>

          <Route path="/admin"  >
          <Route index element={<HomeAdmin />} ></Route>
            
            {/* <Route path="forgotpassword" element={<ForgotPassword />} /> */}
            <Route path="profile" element={<Profile />} />
            
            <Route path="forgot-password" element={<ForgotPassword />}/>
            <Route path="reset-password/:token/:email" element={<ResetPassword />} />
              
            <Route path="brands" element={<BrandList />} />
            <Route path="models" element={<ModelList />} />
            
          
            <Route path="accounts" element={<AccountList />} />
            <Route path="accounts/adduser" element={<RegisterUser />} />
            <Route path="accounts/addadmin" element={<RegisterAdmin />} />
            <Route path="accounts/edit/:id" element={<AccountEdit />} />
            
            <Route path="cars" element={<CarList />} />
            <Route path="cars/add" element={<AddCar />} />
            <Route path="cars/:id" element={<CarDetail />} />
            <Route path="cars/edit/:id" element={<EditCar />} />

            <Route path="carimages" element={<CarImagesList />} />
            <Route path="carimages/add" element={<AddCarImage />} />
            <Route path="carimages/edit/:id" element={<EditCarImages />} />
              
            <Route path="colors" element={<ColorList />} />
              

            <Route path="promotions" element={<PromotionList/>} />
            <Route path="promotions/promotiondetails/:id" element={<PromotionDetailList/>} />
              
            <Route path='/admin/services' element={<ServiceList />} />
            <Route path='/admin/services/servicedetails/:id' element={<ServiceDetailList/>} />

            <Route path='/admin/news' element={<NewsList />} />
              
            <Route path='/admin/appointments' element={<AppointmentList />} />

            <Route exact path="/admin/contacts" element={<Chat />} />

            <Route path='/admin/reviews' element={<ReviewList />} />
              
            <Route path='/admin/payments' element={<PaymentList />} />
                                     
            <Route path="depositcontracts" element={<DepositContractList />} />
            <Route path="depositcontracts/add" element={<DepositContractForm />} />
            <Route path="depositcontracts/:id" element={<DepositContractDetail />} />
              
            <Route path='/admin/brandfeedbacks' element={<BrandFeedback />} />
            <Route path='/admin/carfeedbacks' element={<CarFeedback />} />


            </Route>
        </Routes>
        </BrowserRouter>
        </div>
    </>
  );
}

export default App;
