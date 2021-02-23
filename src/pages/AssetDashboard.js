import React, { useEffect, useState } from "react";
import { Grid, Typography, Divider } from "@material-ui/core";
import LayoutContainer from "../components/reusableComponent/LayoutContainer";
import { getCount, getCountByApplication, gettaggingByApplication, getMaxMin } from "../actions/assetsActions";
import AssetInvestory from "../components/AssetsComponents/AssetInvestory";
import AssetAWS from "../components/AssetsComponents/AssetAWS";
import AssetByClassification from "../components/AssetsComponents/AssetByClassification";
import AssetByApplication from "../components/AssetsComponents/AssetByApplication";

export default function AssetDashboard() {
  const [assetCount, setAssetCount] = useState([])
  useEffect(() => {
    getCount().then((resp) => {
      // setAssetCount(resp)
      console.log(resp)
    }).catch((error) => {
      console.log(error)
    })
  }, []);

  
  useEffect(() => {
    getCountByApplication('').then((resp) => {
      console.log(resp, 'byApplication')
    }).catch((error) => {
      console.log(error)
    })
  }, []);

  useEffect(() => {
    getMaxMin('').then((resp) => {
      console.log(resp, 'maxMin')
    }).catch((error) => {
      console.log(error)
    })
  }, []);

  // useEffect(() => {
  //   getCountByApplication('gettaggingByApplication').then((resp) => {
  //     console.log(resp, 'sreesai')
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  // }, []);

  return (
    <div>
      {console.log(assetCount, 'assetCount')}
      <LayoutContainer>
        {/* <DashboardAlertSection /> */}
        <Grid container spacing={3} style={{ marginTop: 20 }}>
          <Grid item xs={6}>
            <AssetInvestory />
          </Grid>
          <Grid item xs={6}>
            <AssetAWS />
          </Grid>
        </Grid>
        <Grid container spacing={3} style={{ marginTop: 20 }}>
          <Grid item xs={4}>
            <AssetByApplication count={assetCount} />
          </Grid>
          <Grid item xs={8}>
            <AssetByClassification />
          </Grid>
        </Grid>
        {/* <DashboardAlertSection style={{ marginTop: 20 }} /> */}
        <Typography
          variant="h6"
          style={{ fontWeight: "bold", fontSize: 14, marginTop: "32px" }}
        >
          Recommendation{" "}
          <Divider
            variant="middle"
            style={{ width: "100%", margin: "16px 0" }}
          />
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Typography
              variant="h6"
              style={{ fontWeight: "bold", fontSize: 14, padding: "10px" }}
            >
              Lorem ipsum dolor sit amet, consetetur sadipscing
            </Typography>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="h6"
              style={{ fontWeight: "bold", fontSize: 14, padding: "10px" }}
            >
              Lorem ipsum dolor sit amet, consetetur sadipscing
            </Typography>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="h6"
              style={{ fontWeight: "bold", fontSize: 14, padding: "10px" }}
            >
              Lorem ipsum dolor sit amet, consetetur sadipscing
            </Typography>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo
          </Grid>
        </Grid>
      </LayoutContainer>
    </div>
  );
}
