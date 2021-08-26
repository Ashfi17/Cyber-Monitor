import React, { useEffect, useContext } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
// IMPORT COMPONENTS/PAGES HERE
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import AssetDashboard from "./pages/AssetDashboard";
import AssetList from "./pages/AssetListDashboard";
import PolicyKnowledge from "./components/PolicyKnowledge/PolicyKnowledge";
import TaggingCompliance from "./components/TaggingCompliance/TaggingCompliance";
import AssetListTable from "./components/AssetList/AsserListTableView";
import ManagePolicy from "./components/Admin/ManagePolicy";
import ManageRules from "./components/Admin/ManageRules";
import ManageRoles from "./components/Admin/Roles";
import ManageTargetType from "./components/Admin/ManageTargetTypes";
import ManageDomain from "./components/Admin/ManageDomain";
import SystemManagement from "./components/Admin/SystemManagement";
import PolicyCompliance from "./pages/PolicyCompliance";
import PolicyViolationsDetails from "./pages/PolicyViolationsDetails";
import OmniSearch from "./pages/OmniSearch";
import NoMatchPage from "./pages/NotFound";
import AdminGuardedRoute from "./AdminGuardedRoute";
import UserGuardedRoute from "./UserGuardedRoute";
import { appContext } from "./App";

const Routers = (props) => {
  const { authUser, setAuthUser } = useContext(appContext);
  const [loggedInUserAdminIs, setAdminIs] = React.useState(false);
  const [loggedInUserIs, setUserInIs] = React.useState(false);
  useEffect(() => {
    if (authUser) {
      setUserInIs(true);
      if (authUser.userInfo.userRoles.length > 1) {
        if (authUser.userInfo.userRoles[1] == "ROLE_ADMIN") {
          setAdminIs(true);
        }
      }
    }
  }, [authUser]);

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <UserGuardedRoute
            path="/home-page"
            component={Dashboard}
            auth={loggedInUserIs}
          />
          <UserGuardedRoute
            path="/asset-dashboard"
            component={AssetDashboard}
            auth={loggedInUserIs}
          />
          <UserGuardedRoute
            path="/asset-list"
            component={AssetList}
            auth={loggedInUserIs}
          />
          <UserGuardedRoute
            path="/policyknowledge"
            component={PolicyKnowledge}
            auth={loggedInUserIs}
          />
          <UserGuardedRoute
            path="/assetlist-table"
            component={AssetListTable}
            auth={loggedInUserIs}
          />
          <UserGuardedRoute
            path="/tagging-compliance"
            component={TaggingCompliance}
            auth={loggedInUserIs}
          />
          <UserGuardedRoute
            path="/pl-compliance"
            component={PolicyCompliance}
            auth={loggedInUserIs}
          />
          <UserGuardedRoute
            path="/pl-violations-details"
            component={PolicyViolationsDetails}
            auth={loggedInUserIs}
          />
          <UserGuardedRoute
            path="/omni-search"
            component={OmniSearch}
            auth={loggedInUserIs}
          />

          <AdminGuardedRoute
            path="/manage-policy"
            component={ManagePolicy}
            auth={loggedInUserAdminIs}
          />
          <AdminGuardedRoute
            path="/manage-rules"
            component={ManageRules}
            auth={loggedInUserAdminIs}
          />
          <AdminGuardedRoute
            path="/manage-roles"
            component={ManageRoles}
            auth={loggedInUserAdminIs}
          />
          <AdminGuardedRoute
            path="/manage-target-type"
            component={ManageTargetType}
            auth={loggedInUserAdminIs}
          />
          <AdminGuardedRoute
            path="/manage-domain"
            component={ManageDomain}
            auth={loggedInUserAdminIs}
          />
          <AdminGuardedRoute
            path="/system-management"
            component={SystemManagement}
            auth={loggedInUserAdminIs}
          />
          <Route component={NoMatchPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default Routers;
