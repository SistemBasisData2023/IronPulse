import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../global/navbar-logged-in.js";
import CoverImage from "../global/common-section.js";

import classData from "../assets/data/gym.js";
import "./workout-select.css";
import PTTable from "../shared/ptTable.js";
import { Container, Table, TableHead, TableBody, TableRow, TableCell, IconButton, Button } from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
const Bookings = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const pageItemCount = 9;

  const handleEdit = (row) => {
    // Handle edit functionality
    console.log("Edit row:", row);
  };

  const handleDelete = (row) => {
    // Handle delete functionality
    console.log("Delete row:", row);
  };

  const handleAdd = () => {
    // Handle add functionality
    console.log("Add data");
  };



  return (
    <>
      <Navbar />
      <CoverImage title={"Class Manager"} />
      <Container className="bg-white w-screen">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Class Type</TableCell>
              <TableCell>Instructor</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>Calories</TableCell>
              <Button startIcon={<Add />} onClick={handleAdd}>Add Data</Button>
            </TableRow>
          </TableHead>
          <TableBody>
            {classData.slice(page * pageItemCount, (page + 1) * pageItemCount).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.difficulty}</TableCell>
                <TableCell>{row.calories}</TableCell>
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
    </>
  );
};

export default Bookings;
