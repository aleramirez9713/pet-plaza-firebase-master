import React, {Fragment} from "react";
import { Error } from "../../../molecules";
import { Button } from "../../../atoms";
import "./style.css";

const NoData = (props) => {
  return (
    <div className="content-section">
      {
        props.notFound
        ?<h1 className="section-error">Not Found</h1>
        :<Fragment>
          <h1 className="section-error">No hay datos</h1>
          <p>
            Recargue la página
            <Button
              type="link"
              onClick={() => document.location.reload()}
            >aquí</Button>
          </p>
          <Error visible={props.visible} onCancel={props.onCancel} />
        </Fragment>
      }
    </div>
  );
};

export default NoData;
