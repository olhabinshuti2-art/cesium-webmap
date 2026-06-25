import "cesium/Build/Cesium/Widgets/widgets.css";
import {
  Viewer,
  Ion,
  CesiumTerrainProvider,
  Cesium3DTileset,
  WebMapServiceImageryProvider,
  ImageryLayer
} from "cesium";

Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlM2VmY2M2ZS1kOWFkLTRjMjctODlkYS01NTQyMGVhMGYxMTEiLCJpZCI6NDQ4OTYwLCJzdWIiOiJvbGhhYmluc2h1dGkyLWFydCIsImlzcyI6Imh0dHBzOi8vYXBpLmNlc2l1bS5jb20iLCJhdWQiOiJVbnRpdGxlZCIsImlhdCI6MTc4MjM4NzMwNX0.p1FSeyWwNlZiypnyRTovHIbLgBabuVPJSPi10ZDI90k";

document.body.style.margin = "0";

document.body.innerHTML = `
<div id="cesiumContainer" style="width:100vw;height:100vh;"></div>
`;

async function main() {

  const viewer = new Viewer("cesiumContainer", {
    terrainProvider: await CesiumTerrainProvider.fromIonAssetId(1)
  });

  // WMS Layer
  const wms = new ImageryLayer(
    new WebMapServiceImageryProvider({
      url: "https://ows.terrestris.de/osm/service?",
      layers: "OSM-WMS",
      parameters: {
        transparent: true,
        format: "image/png"
      }
    })
  );

  viewer.imageryLayers.add(wms);

  // 3D Buildings
  const tileset = await Cesium3DTileset.fromIonAssetId(4987040);

  viewer.scene.primitives.add(tileset);

  await viewer.zoomTo(tileset);

}

main();