import React from "react";
import { Grid } from "@material-ui/core";
import LayoutContainer from "../components/reusableComponent/LayoutContainer";
import DashboardAlertSection from "../components/DashboardAlertSection";
import DashboardCompliance from "../components/DashboardCompliance";
import DashboardTagging from "../components/DashboardTagging";
import OverallComplianceTrend from "../components/OverallComplianceTrend";
export default function Dashboard() {
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
      </LayoutContainer>
    </div>
  );
}
