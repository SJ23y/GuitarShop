import { AppRoute } from '../../consts';
import Login from '../../pages/login/login';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import Layout from '../layout/layout';
import { useAppSelector } from '../../hooks/use-app-dispatch';
import Register from '../../pages/register/register';
import Product from '../../pages/product/product';
import AddItem from '../../pages/add-item/add-item';
import EditItem from '../../pages/edit-item/edit-item';
import Page404 from '../../pages/page-404/page-404';
import {
  getErrorStatus,
} from '../../store/main-process/selectors';
import { ErrorScreen } from '../error-screen/error-screen';
import Main from '../../pages/main/main';


function App(): JSX.Element {
  const isError = useAppSelector(getErrorStatus);

  if (isError) {
    return <ErrorScreen />;
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Layout />}>

            <Route
             index
             element={<Login />}
             />

            <Route path={AppRoute.Register} element={<Register />} />

            <Route
              path={AppRoute.Main}
              element={
                <PrivateRoute>
                  <Main />
                </PrivateRoute>
              }
            />

            <Route
              path={`${AppRoute.Product}/:guitarId`}
              element={
                <PrivateRoute>
                  <Product />
                </PrivateRoute>
              }
            />

            <Route
              path={AppRoute.Add}
              element={
                <PrivateRoute>
                  <AddItem />
                </PrivateRoute>
              }
            />

          <Route
              path={`${AppRoute.Edit}/:guitarId`}
              element={
                <PrivateRoute>
                  <EditItem />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
