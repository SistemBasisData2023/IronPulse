import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../global/navbar-logged-in.js";
import CoverImage from "../global/common-section.js";
import "./workout-select.css";
import PTTable from "../shared/ptTable.js";
import {
  Container,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Button,
  Modal,
  TextField,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import axios from "axios"; // Import Axios library

const PtMgr = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editedPtData, setEditedPtData] = useState({ name: "", gender: "" });
  const [ptData, setPtData] = useState([]); // State to store the personal trainers' data

  const pageItemCount = 1000000;

  useEffect(() => {
    // Make the API request to retrieve personal trainers' data
    axios
      .get("http://localhost:3300/check_all_pt")
      .then((response) => {
        setPtData(response.data.personal_trainers);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEdit = (row) => {
    setSelectedRow(row);
    setEditedPtData({ name: row.name, gender: row.gender });
    setModalOpen(true);
  };

  const handleDelete = (row) => {
    // Handle delete functionality
    axios
    .delete("http://localhost:3300/delete_pt", { data: { personal_trainer_id: row.personal_trainer_id } })
    .then((response) => {
      console.log(response.data);
      // Update the ptData state by filtering out the deleted row
      setPtData((prevData) => prevData.filter((pt) => pt.personal_trainer_id !== row.personal_trainer_id));
    })
    .catch((error) => {
      console.log(error);
    });
    
  };

  const handleAdd = () => {
    setSelectedRow(null);
    setEditedPtData({ name: "", gender: "" });
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditedPtData({ name: "", gender: "" });
  };

  const handleModalSubmit = () => {
    if (selectedRow === null) {
      // Add operation
      axios
        .post("http://localhost:3300/insert_pt", {
          name: editedPtData.name,
          gender: editedPtData.gender,
        })
        .then((response) => {
          console.log(response.data);
          // Update the ptData state with the new data from the server
          setPtData((prevData) => [...prevData, response.data]);
          setModalOpen(false);
          setEditedPtData({ name: "", gender: "" });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // Edit operation
      const { personal_trainer_id, name, gender } = selectedRow;
      axios
        .put("http://localhost:3300/update_pt", {
          personal_trainer_id: personal_trainer_id,
          name: editedPtData.name,
          gender: editedPtData.gender,
        })
        .then((response) => {
          console.log (personal_trainer_id)
          console.log(response.data);
          // Update the ptData state with the updated data from the server
          const updatedPtData = ptData.map((row) => {
            if (row.personal_trainer_id === personal_trainer_id) {
              return {
                ...row,
                name: editedPtData.name,
                gender: editedPtData.gender,
              };
            }
            return row;
          });
  
          setPtData(updatedPtData);
          setModalOpen(false);
          setEditedPtData({ name: "", gender: "" });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedPtData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <CoverImage title={"PT Manager"} />
      <Container className="bg-white w-screen h-flex">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>
                <Button startIcon={<Add />} onClick={handleAdd}>
                  Add Data
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ptData
              .slice(page * pageItemCount, (page + 1) * pageItemCount)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.avgRating}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(row)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(row)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Container>

      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: 400,
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            label="Name"
            name="name"
            value={editedPtData.name}
            onChange={handleInputChange}
            margin="normal"
          />
          <Select
            label="Gender"
            name="gender"
            value={editedPtData.gender}
            onChange={handleInputChange}
            margin="normal"
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
          <Button onClick={handleModalSubmit}>Submit</Button>
        </Box>
      </Modal>
    </>
  );
};

export default PtMgr;
