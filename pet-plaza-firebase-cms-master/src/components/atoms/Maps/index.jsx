import React, { Fragment, useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker, Polygon } from "google-maps-react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { AutoComplete, message } from "antd";
import "./style.css";

const Maps = ({
  positions,
  name,
  className,
  onDragend,
  draggable,
  zoom,
  polygones,
  resete,
}) => {
  const [places, setplaces] = useState([]);
  const [zoomSearch, setzoomSearch] = useState(null);
  const [searchPosition, setSearchPosition] = useState(null);
  const {
    value,
    suggestions: { data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  let polygoneFinally = [];
  if (polygones) {
    polygones.features.forEach((element) => {
      let finallys = {};
      let temp = [];
      for (let i in element.geometry.coordinates[0]) {
        temp.push({
          lat: element.geometry.coordinates[0][i][1],
          lng: element.geometry.coordinates[0][i][0],
        });
      }
      finallys.polygone = temp;
      polygoneFinally.push(finallys);
    });
  }

  useEffect(() => {
    if (resete) {
      setplaces([]);
      setValue("");
      setSearchPosition(null);
      setzoomSearch(null);
    }
  }, [resete, setValue]);

  useEffect(() => {
    let temp = [];
    data.forEach((suggestion) => {
      const { description } = suggestion;
      temp.push({
        label: description,
        value: description,
      });
    });
    setplaces(temp);
  }, [data]);

  const onChange = async (data) => {
    setValue(data);
  };

  const onSelect = (description) => {
    setValue(description);
    clearSuggestions();
    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setSearchPosition({ lat, lng });
        setzoomSearch(15.5);
      })
      .catch((error) => {
        message.error("Error: No se encuantra la direccion");
      });
  };

  const onClick = (e, f, g) => {
    setSearchPosition({
      lat: g.latLng.lat(),
      lng: g.latLng.lng(),
    });
    onDragend({
      latitude: g.latLng.lat(),
      longitude: g.latLng.lng(),
    })
  };

  const position = (value, maps)=>{
    onDragend({
      latitude: maps.position.lat(),
      longitude: maps.position.lng(),
    })
  }

  return (
    <Fragment>
      <div style={{ width: "100%", padding: 5 }}>
        <AutoComplete
          placeholder="Buscar lugar"
          className="search-auto-complete"
          onChange={onChange}
          onSelect={onSelect}
          options={places}
          value={value}
        />
      </div>
      <Map
        google={window.google}
        zoom={zoomSearch ? zoomSearch : zoom}
        className={className}
        initialCenter={searchPosition ? searchPosition : positions}
        center={searchPosition ? searchPosition : positions}
        onClick={onClick}
      >
        <Marker
          onDragend={position}
          draggable={draggable}
          position={searchPosition ? searchPosition : positions}
          name={name}
        />
        {polygones
          ? polygoneFinally.map((polygone, i) => (
              <Polygon
                key={i}
                paths={polygone.polygone}
                strokeColor="#0000FF"
                strokeOpacity={0.8}
                strokeWeight={2}
                fillColor="#0000FF"
                fillOpacity={0.35}
              />
            ))
          : null}
      </Map>
    </Fragment>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_APIKEY,
  LoadingContainer: false,
})(Maps);
