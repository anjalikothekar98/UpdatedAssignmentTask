import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import {
  Card,
  Table,
  Stack,
  Button,
  TableBody,
  Container,
  Typography,
  TableContainer,
  TableCell,
  TableRow,
} from "@mui/material";
import Scrollbar from "../User/Scrollbar";
import UserListHead from "../User/UserListHead";
import UserFormDialog from "../DialogBox/UserFormDialog";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, loadUsers } from "../../Redux/action";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "srno", label: "#", alignRight: false },
  { id: "userName", label: "User Name", alignRight: false },
  { id: "birthDate", label: "Birth Date", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "phone", label: "Phone", alignRight: false },
  { id: "address", label: "Address", alignRight: false },
  { id: "gender", label: "Gender", alignRight: false },
  { id: "college", label: "College", alignRight: false },
  { id: "Hobbies", label: "Hobbies", alignRight: true },
  { id: "Action", label: "Action", alignCenter: true },
];

// ----------------------------------------------------------------------

export default function UserList() {
  let dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);

  const { users } = useSelector((state) => state.data);

  useEffect(() => {
    console.log("useEffectCall");
    dispatch(loadUsers());
  }, []);

  const handleNewUserClick = () => {
    setDialogData(null);
    setOpen(!open);
  };

  const handleEdit = (data) => {
    setDialogData(data);
    setOpen(!open);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete user`)) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div style={{ backgroundColor: "#e6e8e6" }}>
      <Container>
        {open ? (
          <UserFormDialog isOpen={open} handleClose={handleNewUserClick} />
        ) : null}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={0.5}
        >
          <Typography variant="h4" gutterBottom>
            User List
            <Typography variant="h6" style={{ fontWeight: 400, marginTop: 10 }}>
              It is showing list of all Users with its details
            </Typography>
          </Typography>
          <Button
            onClick={handleNewUserClick}
            variant="contained"
            component={RouterLink}
            to="#"
          >
            Add User
          </Button>
        </Stack>

        <Card style={{ height: "100%" }}>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table size="small" aria-label="a dense table">
                <UserListHead headLabel={TABLE_HEAD} />
                {users.length > 0 ? (
                  <TableBody>
                    {users?.map((user) => (
                      <TableRow hover>
                        <TableCell align="left">
                          <b>{user.id}</b>
                        </TableCell>
                        <TableCell align="left">{user.name} </TableCell>
                        <TableCell align="left">{user.birth}</TableCell>
                        <TableCell align="left">{user.email}</TableCell>
                        <TableCell align="left">{user.phone}</TableCell>
                        <TableCell>{user.address}</TableCell>
                        <TableCell align="left">{user.gender}</TableCell>
                        <TableCell align="right">{user.college}</TableCell>
                        <TableCell align="right">{user.hobbies}</TableCell>
                        <TableCell align="right">
                          <ButtonGroup
                            disableElevation
                            variant="contained"
                            aria-label="Disabled elevation buttons"
                          >
                            <Button
                              color="secondary"
                              style={{ marginRight: "5px" }}
                              onClick={() => {
                                handleDelete(user.id);
                              }}
                            >
                              Delete
                            </Button>
                            <Button style={{ backGroundColor: "green" }}>
                              Edit
                            </Button>
                          </ButtonGroup>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                ) : null}
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </div>
  );
}
