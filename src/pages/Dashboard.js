import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";

import LayoutContainer from "../components/reusableComponent/LayoutContainer";
import DashboardAlertSection from "../components/DashboardAlertSection";
import DashboardCompliance from "../components/DashboardCompliance";
import DashboardTagging from "../components/DashboardTagging";
import OverallComplianceTrend from "../components/OverallComplianceTrend";
import PolicyComplianceOverview from "../components/PolicyComplianceOverview";
import Notifications from "../components/Notifications";
import {
  getOverallCompliance,
  getRecommendations,
} from "../actions/complianceActions";

export default function Dashboard(props) {
  useEffect(() => {
    getOverallCompliance();
  }, []);

  useEffect(() => {
    getRecommendations();
  });
  const onClickPageChange = () => {
    props.history.push("/pl-compliance");
  };
  return (
    <div>
      <LayoutContainer>
        <DashboardAlertSection />
        <Grid container spacing={3} style={{ marginTop: 20 }}>
          <Grid item md={6} xs={12}>
            <DashboardCompliance />
          </Grid>
          <Grid item md={6} xs={12}>
            <DashboardTagging />
          </Grid>
        </Grid>
        <OverallComplianceTrend />
        <Grid container spacing={3} style={{ marginTop: 20 }}>
          <Grid item md={12} xs={12}>
            <PolicyComplianceOverview onClickPageChange={onClickPageChange} />
          </Grid>
          {/* <Grid item md={4} xs={12}>
            <Notifications />
          </Grid> */}
        </Grid>
      </LayoutContainer>
    </div>
  );
}
