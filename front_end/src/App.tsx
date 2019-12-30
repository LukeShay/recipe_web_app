import { lazy, Suspense, useState, useEffect } from "react";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavigationBar from "./modules/navigation/NavigationBar";

const HomePage = lazy(() => import("./modules/homepage/HomePage"));
const NotFoundPage = lazy(() => import("./modules/NotFoundPage"));
const ToDoPage = lazy(() => import("./modules/todopage/ToDoPage"));
const ProfilePage = lazy(() => import("./modules/profile/ProfilePage"));
const GymsPage = lazy(() => import("./modules/gyms/GymsPage"));

interface Style {
  marginLeft: string;
  marginTop: string;
}

const App: React.FC = () => {
  const [style, setStyle] = useState<Style>({
    marginLeft: "0px",
    marginTop: "0px"
  });

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleResize() {
    const width = window.innerWidth;

    if (width < 600) {
      setStyle({ marginLeft: "0px", marginTop: "0px" });
    } else {
      setStyle({ marginLeft: "200px", marginTop: "100px" });
    }
  }

  return (
    <div style={style}>
      <ToastContainer autoClose={3000} hideProgressBar={true} />
      <NavigationBar />
      <Suspense fallback={<div />}>
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route exact={true} path="/index" component={HomePage} />
          <Route path="/todo" component={ToDoPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/gyms" component={GymsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default React.memo(App);
