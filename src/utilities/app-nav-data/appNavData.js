import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import {
  mdiViewDashboard,
  mdiAccountGroup,
  mdiListStatus,
  mdiPageNext,
  mdiCheckDecagramOutline,
  mdiOfficeBuildingOutline,
} from "@mdi/js";

<Icon path={mdiViewDashboard} size={1} />;
const displayContent = (data) => (
  <div>
    <Link className="link-style-disable link-full-width" to={data.path}>
      <>
        <Icon path={data["icon"]} size={1} style={{ marginRight: "0.3rem" }} />
        {data.name}
      </>
    </Link>
  </div>
);
export const appNavData = [
  {
    header: "leavetracker",
    navList: [
      { name: "dashboard", path: "lt/dashboard", icon: mdiViewDashboard },
      { name: "My Leaves", path: "lt/status", icon: mdiListStatus },
      { name: "approval", path: "lt/approval", icon: mdiCheckDecagramOutline },
      { name: "groups", path: "lt/groups", icon: mdiAccountGroup },
      { name: "others", path: "lt/others", icon: mdiPageNext },
    ],
    displayContent,
  },
  {
    header: "projects",
    navList: [
      {
        name: "my projects",
        path: "project/my-projects",
        activePath: "project",
        icon: mdiOfficeBuildingOutline,
      },
    ],
    displayContent,
  },
];
