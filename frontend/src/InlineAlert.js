import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function InlineAlert() {
	
  const [show, setShow] = useState(false);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Error!</Alert.Heading>
        <p>
          Try again. 
        </p>
      </Alert>
    );
  } else
	  return (
  <>
  </>
  );
}

export default InlineAlert;