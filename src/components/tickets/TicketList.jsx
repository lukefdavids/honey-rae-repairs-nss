import { useEffect, useState } from "react";
import { getAllTickets } from "../../services/ticketService";
import "./Tickets.css";
import { Ticket } from "./Ticket";
import { TicketFilterBar } from "./TicketFilterBar";

export const TicketList = ({ currentUser }) => {
  const [allTickets, setAllTickets] = useState([]);
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOpenOnly, setShowOpenOnly] = useState(false);

  useEffect(() => {
    if (showOpenOnly) {
      const openTickets = allTickets.filter(
        (ticket) => ticket.dateCompleted === ""
      );
      setFilteredTickets(openTickets);
    } else {
      setFilteredTickets(allTickets);
    }
  }, [showOpenOnly, allTickets]);

  useEffect(() => {
    const foundTickets = allTickets.filter((ticket) =>
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredTickets(foundTickets);
  }, [searchTerm, allTickets]);

  const getAndSetTickets = () => {
    getAllTickets().then((allTickets) => {
      if (currentUser.isStaff) {
        setAllTickets(allTickets);
      } else {
        const customerTickets = allTickets.filter(
          (ticket) => ticket.userId === currentUser.id
        );
        setAllTickets(customerTickets);
      }
    });
  };

  useEffect(() => {
    getAndSetTickets();
  }, [currentUser]);

  useEffect(() => {
    if (showEmergencyOnly) {
      const emergencyTickets = allTickets.filter((ticket) => ticket.emergency);
      setFilteredTickets(emergencyTickets);
    } else {
      setFilteredTickets(allTickets);
    }
  }, [showEmergencyOnly, allTickets]);

  return (
    <div className="tickets-container">
      <h2>Tickets</h2>

      <TicketFilterBar
        setShowEmergencyOnly={setShowEmergencyOnly}
        setSearchTerm={setSearchTerm}
        currentUser={currentUser}
        setShowOpenOnly={setShowOpenOnly}
      />

      <article className="tickets">
        {filteredTickets.map((ticketObj) => {
          return (
            <Ticket
              ticket={ticketObj}
              key={ticketObj.id}
              currentUser={currentUser}
              getAndSetTickets={getAndSetTickets}
            />
          );
        })}
      </article>
    </div>
  );
};
