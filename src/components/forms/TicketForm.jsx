import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
import { createTicket } from "../../services/ticketService";

export const TicketForm = (currentUser) => {
  const [ticket, setTicket] = useState({ description: "", emergency: false });
  const navigate = useNavigate();

  const handleSave = (event) => {
    event.preventDefault();

    if (ticket.description) {
      const newTicket = {
        userId: currentUser.id,
        description: ticket.description,
        emergency: ticket.emergency,
        dateCompleted: "",
      };
      createTicket(newTicket).then(() => {
        navigate("/tickets");
      });
    } else {
      window.alert("Please fill out the description");
    }
  };

  return (
    <form>
      <h2>New Service Ticket</h2>
      <fieldset>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Description Here"
            onChange={(event) => {
              const ticketCopy = { ...ticket };
              ticketCopy.description = event.target.value;
              setTicket(ticketCopy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>
            Emergency:
            <input
              type="checkbox"
              onChange={(event) => {
                const ticketCopy = { ...ticket };
                ticketCopy.emergency = event.target.checked;
                setTicket(ticketCopy);
              }}
            />
          </label>
        </div>
        <div className="form-group">
          <button className="form-btn btn-info" onClick={handleSave}>
            Submit Ticket
          </button>
        </div>
      </fieldset>
    </form>
  );
};
