import React from "react";
import { Alert, Button } from "react-bootstrap";

const SuccessAlert = (props) => {
  const { message } = props;

  const [hiddenAlerts, setHiddenAlerts] = React.useState([]);

  const onClose = (alertId) => {
    const hiddenAlertsUpdated = [...hiddenAlerts, alertId];
    setHiddenAlerts(hiddenAlertsUpdated);
  };

  const shouldShowAlert = (alertId) => hiddenAlerts.indexOf(alertId) === -1;

  return (
    <React.Fragment>
      <Alert
        variant="success"
        show={shouldShowAlert("success")}
        onClose={() => onClose("success")}
      >
        <div className="d-flex justify-content-between">
          <div>{message}</div>
          <Button
            variant="close"
            size="xs"
            onClick={() => onClose("success")}
          />
        </div>
      </Alert>
    </React.Fragment>
  );
};

export default SuccessAlert;
