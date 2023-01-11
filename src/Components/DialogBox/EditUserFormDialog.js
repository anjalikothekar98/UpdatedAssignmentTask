import * as React from "react";
import Button from "@mui/material/Button";
import moment from "moment";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import { FormLabel, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useDispatch } from "react-redux";
import { addUser } from "../../Redux/action";
import { useNavigate } from "react-router-dom";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function UserForm(props) {
  const [open, setOpen] = React.useState(false);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [fullWidth, setFullWidth] = React.useState(true);
  const [displayHobbies, setDisplayHobbies]  = React.useState(false);
  const { isOpen, data } = props;
  const todayDate = moment(new Date()).format("YYYY-MM-DD");
  const [state, setState] = React.useState({
    name: "",
    birth: "",
    email: "",
    phone: "",
    address: "",
    otherhobbies: ""
  });
  const [error,setError] = React.useState("")

  const { name, birth, email, phone, address, otherhobbies } = state;
  const dispatch = useDispatch();
  const navigate= useNavigate()

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
    console.log("value", value)
  };

  const handleButton =() =>{
    setDisplayHobbies(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !birth || !email || !phone || !address){
      setError("Please fill the input fields")
    }else{
      dispatch(addUser(state))
      setError("")
      // navigate("/")
    }
  };

  const handleClose = () => {
    props.handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const gender = [
    { id: 1, type: "male", value: "Male" },
    { id: 2, type: "female", value: "female" },
    { id: 3, type: "other", value: "Other" },
  ];

  const college =[
    { id: 1, type: "S B Jain Institute", value: "S B Jain Institute" },
    { id: 2, type: "Gurunanak college of Engineering", value: "Gurunanak college of Engineering" },
    { id: 3, type: "Goverment College of Engineering", value: "Goverment College of Engineering" },
    { id: 4, type: "GD College", value: "GD College" },
    { id: 5, type: "priyadarshani", value: "priyadarshani" },
  ];

  return (
    <div>
      {error && <h3 style={{color: "red"}}>{error}</h3>}
      <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={isOpen}>
        <BootstrapDialogTitle onClose={handleClose}>
          {data ? "Edit User" : "Add User"}
        </BootstrapDialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                autoComplete="name"
                label="User Name*"
                value={name}
                placeholder="User Name*"
                onChange={handleInputChange}
              />

              <TextField
                fullWidth
                id="birthDate"
                type="date"
                label="Birth Date"
                margin="normal"
                name="birth"
                style={{ width: "100%", marginTop: 5 }}
                size="large"
                value={birth || ""}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ max: todayDate, height: "200px" }}
              />

              <TextField
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                label="Email*"
                value={email}
                placeholder="Enter Email*"
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                id="phone"
                name="phone"
                autoComplete="phone"
                label="Mobile Number*"
                value={phone}
                placeholder="Mobile Number*"
                style={{ marginTop: 5 }}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                id="address"
                name="address"
                autoComplete="address"
                label="Address*"
                value={address}
                placeholder="Address*"
                onChange={handleInputChange}
                style={{ marginTop: 5 }}
              />
              <TextField
                select
                id="gender"
                label="Gender"
                name="gender"
                onChange={handleInputChange}
                style={{ width: "100%", marginTop: 5 }}

              >
                <MenuItem disabled value="">
                  <em>Select Gender*</em>
                </MenuItem>
                {gender?.map((option) => (
                  <MenuItem key={option.id} value={option.type}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                id="college"
                label="College"
                name="college"
                style={{ width: "100%", marginTop: 5 }}
              >
                <MenuItem disabled value="">
                  <em>Select College*</em>
                </MenuItem>
                {college?.map((option) => (
                  <MenuItem key={option.id} value={option.type}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
           
      <FormGroup aria-label="position" row>
      <FormLabel component="legend" style={{mrginLeft: 30, marginTop: 10}}>Hobbies</FormLabel><br/>
        <FormControlLabel
          value="Reading"
          control={<Checkbox />}
          label="Reading"
          labelPlacement="end"
        />
        <FormControlLabel
          value="Gaming"
          control={<Checkbox />}
          label="Gaming"
          labelPlacement="end"
        />
        <FormControlLabel
          value="Traveling"
          control={<Checkbox />}
          label="Traveling"
          labelPlacement="end"
        />
        <FormControlLabel
          value="drawing"
          control={<Checkbox />}
          label="drawing"
          labelPlacement="end"
        />
      </FormGroup>
      <Button variant="contained" color="success" onClick={handleButton}> Other</Button>
      {displayHobbies? 
      <TextField
                fullWidth
                id="hibbies"
                name="ohobbies"
                autoComplete="hobbies"
                label="Other Hobbies"
                value={otherhobbies}
                placeholder="Other Hobbies"
                onChange={handleInputChange}
                style={{ marginTop: 10 }}
              /> : null}
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button variant="contained" onSubmit={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
