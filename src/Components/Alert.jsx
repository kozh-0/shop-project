import React, { useEffect } from "react";

export default function Alert(props) {
    const {alertName = '', closeAlert = Function.prototype} = props;

    useEffect(() => {
        const timerId = setTimeout(closeAlert, 3000);

        return () => clearTimeout(timerId);
    // eslint-disable-next-line
    }, [alertName]);

    return (
        <div id="toast-container">
            <div className="toast">{alertName} added to cart</div>
        </div>
    )
}