import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

// IMPORT COMPONENTS/PAGES HERE
import Login from './components/Login/Login';
import Dashboard from "./pages/Dashboard";
import AssetDashboard from './pages/AssetDashboard'
import AssetList from './pages/AssetListDashboard'
import PolicyKnowledge from './components/PolicyKnowledge/PolicyKnowledge'
import TaggingCompliance from './components/TaggingCompliance/TaggingCompliance';
import AssetListTable from './components/AssetList/AsserListTableView';

const Routers = () => {
  return (
    <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path="/" component={Dashboard} />
            <Route exact path='/asset-dashboard' component={AssetDashboard} />
            <Route exact path='/asset-list' component={AssetList} />
            <Route exact path='/policyknowledge' component={PolicyKnowledge} />
            <Route exact path='/assetlist-table' component={AssetListTable} />
            <Route exact path='/tagging-compliance' component={TaggingCompliance} />
          </Switch>
        </div>
    </BrowserRouter>
  );
};

export default Routers;
