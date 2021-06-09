import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

// IMPORT COMPONENTS/PAGES HERE
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Dashboard from "./pages/Dashboard";
import AssetDashboard from './pages/AssetDashboard'
import AssetList from './pages/AssetListDashboard'
import PolicyKnowledge from './components/PolicyKnowledge/PolicyKnowledge'
import TaggingCompliance from './components/TaggingCompliance/TaggingCompliance';
import AssetListTable from './components/AssetList/AsserListTableView';
import ManagePolicy from './components/Admin/ManagePolicy';
import ManageRules from './components/Admin/ManageRules';
import ManageRoles from './components/Admin/Roles';
import ManageTargetType from './components/Admin/ManageTargetTypes';
import ManageDomain from './components/Admin/ManageDomain'
import SystemManagement from './components/Admin/SystemManagement';
import PolicyCompliance from './pages/PolicyCompliance';
import PolicyViolationsDetails from './pages/PolicyViolationsDetails';
import OmniSearch from './pages/OmniSearch';

const Routers = (props) => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path="/home-page" component={Dashboard} />
          <Route exact path='/asset-dashboard' component={AssetDashboard} />
          <Route exact path='/asset-list' component={AssetList} />
          <Route exact path='/policyknowledge' component={PolicyKnowledge} />
          <Route exact path='/assetlist-table' component={AssetListTable} />
          <Route exact path='/tagging-compliance' component={TaggingCompliance} />
          <Route exact path='/manage-policy' component={ManagePolicy} />
          <Route exact path='/manage-rules' component={ManageRules} />
          <Route exact path='/manage-roles' component={ManageRoles} />
          <Route exact path='/manage-target-type' component={ManageTargetType} />
          <Route exact path='/manage-domain' component={ManageDomain} />
          <Route exact path='/system-management' component={SystemManagement} />
          <Route exact path='/pl-compliance' component={PolicyCompliance} />
          <Route exact path='/pl-violations-details' component={PolicyViolationsDetails} />
          <Route exact path='/omni-search' component={OmniSearch} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default Routers;
