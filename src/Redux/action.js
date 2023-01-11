
import axios from 'axios';
import { actionTypes } from './actionTypes';

export const loadUsers = (users) =>  async (dispatch) => {

    const rsponse = await axios.get(`${process.env.REACT_APP_API}`);

    dispatch({type:actionTypes.GET_USERS, payload: rsponse.data})
    console.log("response", rsponse.data)

  };

  export const deleteUser = (id) =>  async (dispatch) => {

    const rsponse = await axios.delete(`${process.env.REACT_APP_API}/${id}`);

    dispatch({type:actionTypes.DELETE_USERS, payload: rsponse.data})
    console.log("response", rsponse.data)

    dispatch(loadUsers())

  };

  export const addUser = (user) =>  async (dispatch) => {

    const rsponse = await axios.post(`${process.env.REACT_APP_API}`, user);

    dispatch({type:actionTypes.ADD_USER, payload: rsponse.data})
    console.log("response", rsponse.data)

    dispatch(loadUsers())

  };
  

  export const getsingalUser = (user) =>  async (dispatch) => {

    const rsponse = await axios.get(`${process.env.REACT_APP_API}`, user);

    dispatch({type:actionTypes.GET_SINGAL_USER, payload: rsponse.data})
    console.log("response", rsponse.data)

    dispatch(loadUsers())

  };


  export const getCollegeName = (name) =>  async (dispatch) => {
    const rsponse = await axios.get(`http://universities.hipolabs.com/search/${name}`);

    dispatch({type:actionTypes.GET_COLLEGE_NAME, payload: rsponse.data})
    console.log("response", rsponse.data)
  }