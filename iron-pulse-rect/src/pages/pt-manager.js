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

  const pageItemCount = 9;

  useEffect(() => {
    // Make the API request to retrieve personal trainers' data
    axios.get("http://localhost:3300/check_all_pt")
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
    console.log("Delete row:", row);
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
    // Validate and submit edited data
    console.log("Edited PT data:", editedPtData);
    setModalOpen(false);
    setEditedPtData({ name: "", gender: "" });
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
      <Container className="bg-white w-screen">
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
          <TextField
            label="Gender"
            name="gender"
            value={editedPtData.gender}
            onChange={handleInputChange}
            margin="normal"
          />
          <Button onClick={handleModalSubmit}>Submit</Button>
        </Box>
      </Modal>
    </>
  );
};

export default PtMgr;
