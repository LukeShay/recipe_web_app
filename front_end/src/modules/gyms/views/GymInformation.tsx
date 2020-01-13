import {
  Button,
  createStyles,
  makeStyles,
  TableCell,
  TableRow,
  Theme
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import { Link } from "react-router-dom";
import { AuthRoutes, Routes } from "../../../routes";
import { Gym, User } from "../../../types";
import Table from "../../common/table/Table";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonWrapper: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1)
    },
    editButton: {
      position: "absolute",
      right: "10px"
    },
    icons: {
      paddingRight: theme.spacing(1)
    }
  })
);

interface IGymPageRowProps {
  label: React.ReactNode;
  text: React.ReactNode;
}

const GymPageRow: React.FC<IGymPageRowProps> = ({ label, text }) => (
  <TableRow>
    <TableCell>{label}</TableCell>
    <TableCell>{text}</TableCell>
  </TableRow>
);

export interface IGymInformationProps {
  gym: Gym;
  canEdit: boolean;
}

const GymInformation: React.FunctionComponent<IGymInformationProps> = ({
  gym,
  canEdit
}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.buttonWrapper}>
        <Button
          component={Link}
          to={Routes.GYMS}
          variant="text"
          fullWidth={false}
          size="medium"
          type="button"
        >
          <ArrowBackIcon className={classes.icons} />
          Back
        </Button>
        {canEdit && (
          <Button
            component={Link}
            to={AuthRoutes.EDIT_GYM + "/" + gym.id}
            className={classes.editButton}
            variant="text"
            fullWidth={false}
            size="medium"
            type="button"
          >
            <EditIcon className={classes.icons} />
            Edit
          </Button>
        )}
      </div>
      <Table
        body={[
          <GymPageRow key="name" label="Gym" text={gym.name} />,
          <GymPageRow key="website" label="Website" text={gym.website} />,
          <GymPageRow
            key="address"
            label="Address"
            text={
              <React.Fragment>
                {gym.address}
                <br />
                {gym.city + ", " + gym.state + " " + gym.zipCode}
              </React.Fragment>
            }
          />,
          <GymPageRow key="email" label="Email" text={gym.email} />,
          <GymPageRow
            key="phoneNumber"
            label="Phone Number"
            text={gym.phoneNumber}
          />
        ]}
      />
    </React.Fragment>
  );
};

export default GymInformation;
