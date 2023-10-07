import React, { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector } from "react-redux";
import "./i18nextConf";
import "./index.css";
import ReactGA from "react-ga";
import { ErrorFallback } from "./error";
import ActMenu from "./components/menu";
import {
  CalnWid,
  DesktopApp,
  StartMenu,
  WidPane,
} from "./components/start";
import Taskbar from "./components/taskbar";
import { Background } from "./containers/background";
import * as Applications from "./containers/applications";
import * as Drafts from "./containers/applications/draft";
import { LockScreen, BootScreen } from "./containers/background";
import ReactModal from "react-modal";
import Popup from "./components/popup";
import { preload } from "./actions/preload";
import { afterMath } from "./actions/index";
import { isMobile } from "./utils/checking";
const TRACKING_ID = "G-C772WT3BD0";
ReactGA.initialize(TRACKING_ID);

function App() {
  const apps = useSelector((state) => state.apps);
  const user = useSelector((state) => state.user);

  const [showtaskbar,setShowtaskbar] = useState(true)
  const [lockscreen,setLockscreen] = useState(true)
  ReactModal.setAppElement("#root");
  const dispatch = useDispatch();

  window.onclick = afterMath;
  window.oncontextmenu = (e) => {
    afterMath(e);
    e.preventDefault();
    var data = {
      top: e.clientY,
      left: e.clientX,
    };

    if (e.target.dataset.menu != null) {
      data.menu = e.target.dataset.menu;
      data.attr = e.target.attributes;
      data.dataset = e.target.dataset;
      dispatch({
        type: "MENUSHOW",
        payload: data,
      });
    }
  };



  useEffect(() => {
    preload()
      .then(() => {
        console.log("Loaded");
      })
      .finally(async () => {
        await new Promise(r => setTimeout(r,1000))
        setLockscreen(false)
      })

    if (isMobile()) 
      setShowtaskbar(false)
  },[]);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    window.history.replaceState({}, document.title, "/" + "");
  }, []);

  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {lockscreen ? <BootScreen/> : null}
        {!user?.id  ? <LockScreen/> : null}
        <div className="appwrap">
          <Background />
          {user?.id ? (
            <>
              <div className="desktop" data-menu="desk">
                <DesktopApp />
                {Object.keys(Applications).map((key, idx) => {
                  var WinApp = Applications[key];
                  return <WinApp key={idx} />;
                })}
                {Object.keys(apps)
                  .filter((x) => x != "hz")
                  .map((key) => apps[key])
                  .map((app, i) => {
                    if (!app.pwa) 
                      return

                    var WinApp = Drafts[app.data.type];
                    return <WinApp key={i} icon={app.icon} {...app.data} />;
                  })}
                <StartMenu />
                {/*<BandPane />*/}
                {/*<SidePane />*/}
                <WidPane />
                <CalnWid />
              </div>
              {
              showtaskbar 
                ? <Taskbar />
                : null
              }
              <ActMenu />
              <Popup />
            </>
          ) : null}
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default App;
