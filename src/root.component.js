import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PlanetPage from "./planets-page/planets-page.component.js";
import { navigateToUrl } from "single-spa";
export default function Root(props) {
  useEffect(() => {
    function cancelEvent(evnt) {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      if (params.some) {
        evnt.detail.cancelNavigation();
        console.log(evnt.detail);
      }
    }
    window.addEventListener("single-spa:before-routing-event", cancelEvent);
    return () => {
      window.removeEventListener(
        "single-spa:before-routing-event",
        cancelEvent
      );
    };
  }, []);
  return (
    <div onClick={() => navigateToUrl("/people?some=parm")}>
      navigate to a different route
    </div>
  );
}
