import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../global/navbar-logged-in.js";
import CoverImage from "../global/common-section.js";
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
  Box,
  TextField,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";

const classMgr = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [workoutType, setWorkoutType] = useState("");
  const [ptName, setPTName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [calories, setCalories] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [capacity, setCapacity] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [classData, setClassData] = useState([]);

  useEffect(() => {
    fetchClassData();
  }, []);
  
  // Fetch class data from the server
  const fetchClassData = async () => {
    try {
      const response = await axios.get("http://localhost:3300/check_all_class");
      const classResults = response.data.class;
      console.log(classResults);
      setClassData(classResults);
    } catch (error) {
      console.error(error);
    }
  };
  
  // Handle edit button click
  const handleEdit = (row) => {
    setSelectedRow(row);
    setWorkoutType(row.workoutType);
    setPTName(row.ptName);
    setDate(row.date);
    setStartTime(row.startTime);
    setEndTime(row.endTime);
    setCalories(row.calories);
    setDifficulty(row.difficulty);
    setEditModalOpen(true);
  };
  
  
  // Handle delete button click
  const handleDelete = (row) => {
    axios
      .delete("http://localhost:3300/delete_class", { data: { class_id: row.id } })
      .then((response) => {
        console.log(response.data);
        // Update the classData state by filtering out the deleted row
        setClassData((prevData) => prevData.filter((classItem) => classItem.id !== row.id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  // Handle add button click
  const handleAdd = () => {
    setModalOpen(true);
  };

  // Handle close of the add data modal
  const handleModalClose = () => {
    setModalOpen(false);
    setWorkoutType("");
    setPTName("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setCalories("");
    setDifficulty("");
  };

  // Handle close of the edit data modal
  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setSelectedRow(null);
    setWorkoutType("");
    setPTName("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setCalories("");
    setDifficulty("");
  };
  
  // Handle submission of the add data modal
  const handleModalSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3300/add_class", {
        personal_trainer_id: ptName,
        difficulty: difficulty,
        calorie: calories,
        workout: workoutType,
        capacity: capacity, // Add the capacity value here
        class_date: date,
        start_time: startTime,
        end_time: endTime,
      });
  
      // Handle success response
      console.log("Submit modal data", response.data);
      setModalOpen(false);
      setWorkoutType("");
      setPTName("");
      setDate("");
      setStartTime("");
      setEndTime("");
      setCalories("");
      setDifficulty("");
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };
  
  // Handle submission of the edit data modal
  const handleEditModalSubmit = () => {
    // Handle modal submit functionality for editing existing data
    console.log("Submit edit modal data");
    setEditModalOpen(false);
    setSelectedRow(null);
    setWorkoutType("");
    setPTName("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setCalories("");
    setDifficulty("");
  };

  return (
    <>
      <Navbar />
      <CoverImage title={"Class Manager"} />
      <Container className="bg-white w-screen">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Workout Type</TableCell>
              <TableCell>PT Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>
                <Button startIcon={<Add />} onClick={handleAdd}>
                  Add Data
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.workout}</TableCell>
                <TableCell>{row.pt_name}</TableCell>
                <TableCell>{row.class_date}</TableCell>
                <TableCell>{row.start_time}</TableCell>
                <TableCell>{row.end_time}</TableCell>
                <TableCell>{row.calories}</TableCell>
                <TableCell>{row.difficulty}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(row)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(row)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>

      {/* Add Data Modal */}
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
          <h2>Add Data</h2>
          <TextField
            label="Workout Type"
            value={workoutType}
            onChange={(e) => setWorkoutType(e.target.value)}
          />
          <TextField
            label="PT ID"
            value={ptName}
            onChange={(e) => setPTName(e.target.value)}
          />
          <TextField
            label="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <TextField
            label="Start Time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <TextField
            label="End Time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <TextField
            label="Calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
          <TextField
            label="Capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
          <TextField
            label="Difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          />
          <Button onClick={handleModalSubmit}>Submit</Button>
        </Box>
      </Modal>

      {/* Edit Data Modal */}
      <Modal open={editModalOpen} onClose={handleEditModalClose}>
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
          <h2>Edit Data</h2>
          <TextField
            label="Workout Type"
            value={workoutType}
            onChange={(e) => setWorkoutType(e.target.value)}
          />
          <TextField
            label="PT Name"
            value={ptName}
            onChange={(e) => setPTName(e.target.value)}
          />
          <TextField
            label="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <TextField
            label="Start Time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <TextField
            label="End Time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <TextField
            label="Calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
          <TextField
            label="Difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          />
          <Button onClick={handleEditModalSubmit}>Submit</Button>
        </Box>
      </Modal>
    </>
  );
};

export default classMgr;
