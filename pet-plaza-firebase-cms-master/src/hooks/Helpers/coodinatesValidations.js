import invariant from "turf-invariant";

export const coodinatesValidations = (items, polygons) => {
  let point = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Point",
      coordinates: [items.longitude, items.latitude],
    },
  };
  let exists = false;
  polygons &&
    polygons.features.forEach((polygon) => {
      var pt = invariant.getCoord(point);
      var polys = polygon.geometry.coordinates;
      if (polygon.geometry.type === "Polygon") polys = [polys];
      for (
        var i = 0, insidePoly = false;
        i < polys.length && !insidePoly;
        i++
      ) {
        if (inRing(pt, polys[i][0])) {
          var inHole = false;
          var k = 1;
          while (k < polys[i].length && !inHole) {
            if (inRing(pt, polys[i][k])) {
              inHole = true;
            }
            k++;
          }
          if (!inHole) {
            insidePoly = true;
            exists = true;
          }
        }
      }
    });
  return exists;
};

const inRing = (pt, ring) => {
  var isInside = false;
  for (var i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    var xi = ring[i][0],
      yi = ring[i][1];
    var xj = ring[j][0],
      yj = ring[j][1];
    var intersect =
      ((yi > pt[1]) !== (yj > pt[1])) &&
      pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi;
    if (intersect) isInside = !isInside;
  }
  return isInside;
};
