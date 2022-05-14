import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToolBar } from "../../../utils/general";
import { Icon } from "../../../utils/general";
import "./assets/taskmanager.scss";

export const Taskmanager = () => {
  const apps = useSelector((state) => state.apps);
  const wnapp = useSelector((state) => state.apps.taskmanager);
  const dispatch = useDispatch();

  const [tab, setTab] = useState("Processes");
  const [nav, setNav] = useState("");

  const tabNames = [
    { title: "Processes", icon: "faTableCellsLarge" },
    { title: "Performance", icon: "faWaveSquare" },
    { title: "App history", icon: "faClockRotateLeft" },
    { title: "Startup apps", icon: "faGaugeHigh" },
    { title: "Users", icon: "faUser" },
    { title: "Details", icon: "faList" },
    { title: "Services", icon: "faPuzzlePiece" },
    { title: "Settings", icon: "faGear" },
  ];

  return (
    <div
      className="taskmanagerApp floatTab dpShad"
      data-size={wnapp.size}
      data-max={wnapp.max}
      style={{
        ...(wnapp.size == "cstm" ? wnapp.dim : null),
        zIndex: wnapp.z,
      }}
      data-hide={wnapp.hide}
      id={wnapp.icon + "App"}
    >
      <ToolBar
        app={wnapp.action}
        icon={wnapp.icon}
        size={wnapp.size}
        name="Task Manager"
      />
      <div className="windowScreen flex flex-col" data-dock="true">
        <div className="restWindow flex-grow flex flex-col">
          <nav className={nav}>
            {tabNames.map((t) => {
              return (
                <div
                  className={`navLink ${t.title === tab ? "selected" : ""}`}
                  onClick={() => setTab(t.title)}
                >
                  <Icon className="mx-2" fafa={t.icon} />
                  <span className="tabName">{t.title}</span>
                </div>
              );
            })}
            <div className="marker"></div>
          </nav>
          <main className="flex-grow">
            {tabNames.map((t) => {
              return (
                tab === t.title && (
                  <>
                    <h3>{tab}</h3>
                    <div className="content"></div>
                  </>
                )
              );
            })}
            <div className="flex-grow grid place-items-center text-3xl">
              Coming soon? maybe
            </div>
          </main>
          <div className="navMenuBtn" onClick={() => setNav(nav ? "" : "open")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 48 48"
              width={24}
              height={24}
            >
              <path d="M5.5 9a1.5 1.5 0 1 0 0 3h37a1.5 1.5 0 1 0 0-3h-37zm0 13.5a1.5 1.5 0 1 0 0 3h37a1.5 1.5 0 1 0 0-3h-37zm0 13.5a1.5 1.5 0 1 0 0 3h37a1.5 1.5 0 1 0 0-3h-37z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
