import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";

import LayoutContainer from "../components/reusableComponent/LayoutContainer";
import DashboardAlertSection from "../components/DashboardAlertSection";
import DashboardCompliance from "../components/DashboardCompliance";
import DashboardTagging from "../components/DashboardTagging";
import OverallComplianceTrend from "../components/OverallComplianceTrend";
import PolicyComplianceOverview from "../components/PolicyComplianceOverview";
import Notifications from "../components/Notifications";
import { getCompliance } from '../actions/complianceActions';

export default function Dashboard() {

  useEffect(() => {
    getCompliance()
  }, [])
  

  return (
    <div>
      <LayoutContainer>
        <DashboardAlertSection />
        <Grid container spacing={3} style={{ marginTop: 20 }}>
          <Grid item xs={6}>
            <DashboardCompliance />
          </Grid>
          <Grid item xs={6}>
            <DashboardTagging />
          </Grid>
        </Grid>
        <OverallComplianceTrend />
        <Grid container spacing={3} style={{ marginTop: 20 }}>
          <Grid item xs={8}>
            <PolicyComplianceOverview />
          </Grid>
          <Grid item xs={4}>
            <Notifications />
          </Grid>
        </Grid>
      </LayoutContainer>
    </div>
  );
}
