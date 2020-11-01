import React, { useMemo, useState, useEffect } from 'react';
import { formatDateTime } from '../helpers.js';

function Clock(props) {

  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date())
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentDateTime = useMemo(() => {
    return formatDateTime(props.format ? props.format : 'MM-DD-YYYY hh:mm:ss', dateTime);
  }, [dateTime, props.format]);

  return (
      <div className="Clock">
        { currentDateTime }
      </div>
  );
}

export default Clock;
