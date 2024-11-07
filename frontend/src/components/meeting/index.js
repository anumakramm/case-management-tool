import React, { useState } from "react";
import { Button, TextField, Typography, Container, Box } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { createMeeting } from "../../api/caseManager";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSelector } from "react-redux";

const ScheduleMeeting = () => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [startTime, setStartTime] = useState(dayjs());
  const [duration, setDuration] = useState("");
  const [requiredAttendees, setRequiredAttendees] = useState("");
  const [optionalAttendees, setOptionalAttendees] = useState("");
  const caseManagerId = useSelector((state) => state.manager.caseManagerId);

  const handleScheduleMeeting = async (e) => {
    e.preventDefault();

    const meetingData = {
      subject,
      body,
      start_time: startTime.format("YYYY-MM-DDTHH:mm:ss"),
      duration: parseInt(duration),
      required_attendees: requiredAttendees,
      optional_attendees: optionalAttendees || null,
      organizer_id: caseManagerId,
    };

    createMeeting(meetingData)
      .then((res) => {
        alert("Meeting scheduled successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Schedule a Meeting
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <form onSubmit={handleScheduleMeeting}>
            <TextField
              size="small"
              label="Subject"
              fullWidth
              margin="normal"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <TextField
              size="small"
              label="Description"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <DateTimePicker
              className="date-form-field"
              label="Start Time"
              value={startTime}
              onChange={(newValue) => setStartTime(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="normal"
                  size="small"
                  required
                />
              )}
            />
            <TextField
              size="small"
              label="Duration (minutes)"
              type="number"
              fullWidth
              margin="normal"
              required
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            <TextField
              size="small"
              label="Required Attendees (comma-separated emails)"
              fullWidth
              margin="normal"
              required
              value={requiredAttendees}
              onChange={(e) => setRequiredAttendees(e.target.value)}
            />
            <TextField
              size="small"
              label="Optional Attendees (comma-separated emails)"
              fullWidth
              margin="normal"
              value={optionalAttendees}
              onChange={(e) => setOptionalAttendees(e.target.value)}
            />
            <Button
              size="small"
              type="submit"
              variant="contained"
              color="primary"
              //   fullWidth
              sx={{ marginTop: 3 }}
            >
              Schedule Meeting
            </Button>
          </form>
        </LocalizationProvider>
      </Box>
    </Container>
  );
};

export default ScheduleMeeting;
