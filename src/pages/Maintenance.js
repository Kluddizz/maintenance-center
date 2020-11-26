import React, { useCallback, useState, useContext, useEffect } from "react";
import dateFormat from "dateformat";
import { useSnackbar } from "notistack";

import Database from "../services/Database";

import UserContext from "../contexts/UserContext";
import StateContext from "../contexts/StateContext";
import AuthContext from "../contexts/AuthContext";
import MaintenanceContext from "../contexts/MaintenanceContext";

import ExtendedTable from "../components/ExtendedTable";
import StateChip from "../components/StateChip";

const Maintenance = ({ ...props }) => {
  // Read out parameters from the url.
  const {
    match: { params },
  } = props;

  const {
    token: [token],
  } = useContext(AuthContext);

  const [, updateMaintenances] = useContext(MaintenanceContext);
  const [states] = useContext(StateContext);
  const [users] = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const updateAppointments = useCallback(async () => {
    const response = await Database.getAppointments(token, params.id);

    if (response.success) {
      setAppointments(response.appointments);
    }
  }, [params, token]);

  const handleAdd = async (item) => {
    const appointment = { ...item, maintenanceid: params.id, stateid: 1 };
    const response = await Database.createAppointment(token, appointment);

    if (response.success) {
      enqueueSnackbar("Termin wurde erstellt", { variant: "success" });
      updateAppointments();
      updateMaintenances();
    } else {
      enqueueSnackbar("Termin konnte nicht erstellt werden", {
        variant: "error",
      });
    }
  };

  const handleEdit = async (item) => {
    const response = await Database.editAppointment(token, item);

    if (response.success) {
      enqueueSnackbar("Termin wurde geändert", { variant: "success" });
      updateAppointments();
      updateMaintenances();
    } else {
      enqueueSnackbar("Termin konnte nicht geändert werden", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    updateAppointments();
  }, [updateAppointments]);

  return (
    <div>
      <ExtendedTable
        title="Termine"
        items={appointments}
        headers={[
          { name: "Beschreibung", field: "name" },
          {
            name: "Termin",
            render: (item) => dateFormat(item.date, "dd.mm.yyyy"),
          },
          {
            name: "Mitarbeiter",
            render: (item) => {
              const user = users.find((u) => u.id === item.userid);
              return `${user?.firstname ?? ""} ${user?.lastname ?? ""}`;
            },
          },
          {
            name: "Status",
            render: (item) => (
              <StateChip label={item.state_name} color={item.state_color} />
            ),
          },
        ]}
        itemFields={[
          {
            name: "date",
            description: "Termin",
            type: "datetime",
          },
          {
            name: "userid",
            description: "Mitarbeiter",
            type: "list",
            options: {
              list: users,
              mapField: (item) =>
                `${item?.firstname ?? ""} ${item?.lastname ?? ""}`,
            },
          },
          {
            name: "stateid",
            description: "Status",
            type: "list",
            options: {
              list: states,
              mapField: (item) => item.name,
            },
          },
        ]}
        actions={{
          add: {
            action: handleAdd,
          },
          edit: {
            action: handleEdit,
          },
        }}
      />
    </div>
  );
};

export default Maintenance;
