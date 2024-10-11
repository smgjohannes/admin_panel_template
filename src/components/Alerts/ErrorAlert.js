import React from "react";
import { Alert, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";

const ErrorAlert = (props) => {
  const [hiddenAlerts, setHiddenAlerts] = React.useState([]);

  const onClose = (alertId) => {
    const hiddenAlertsUpdated = [...hiddenAlerts, alertId];
    setHiddenAlerts(hiddenAlertsUpdated);
  };

  const shouldShowAlert = (alertId) => hiddenAlerts.indexOf(alertId) === -1;

  return (
    <React.Fragment>
      <Alert
        variant="danger"
        show={shouldShowAlert("danger")}
        onClose={() => onClose("danger")}
      >
        <div className="d-flex justify-content-between">
          <div>
            <FontAwesomeIcon icon={faBullhorn} className="me-1" />
            {props.message}
          </div>
          <Button variant="close" size="xs" onClick={() => onClose("danger")} />
        </div>
      </Alert>
    </React.Fragment>
  );
};

export default ErrorAlert;
