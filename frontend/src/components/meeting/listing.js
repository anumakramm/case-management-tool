import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getCaseMangersUserMeeting } from "../../api/caseManager";

export default function MeetingListing({ caseManagerId, caseEmail }) {
  const [rows, setRows] = React.useState([]);
  const [error, setError] = React.useState();

  React.useEffect(() => {
    getCaseMangersUserMeeting(caseManagerId, caseEmail)
      .then((res) => {
        setRows(res.data);
        setError(undefined);
      })
      .catch((err) => {
        setRows([]);
        setError("No Data Found!");
      });
  }, [caseManagerId, caseEmail]);

  function getRenderContent() {
    return rows.length ? (
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Meeting ID</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Required Attendee</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Optional Attendees</TableCell>
              <TableCell>Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.subject}</TableCell>
                <TableCell>{row.required_attendees}</TableCell>
                <TableCell>{row.start_time}</TableCell>
                <TableCell>{row.created_at}</TableCell>
                <TableCell>{row.optional_attendees}</TableCell>
                <TableCell>{row.duration} mins</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <p>{error}</p>
    );
  }

  return getRenderContent();
}
