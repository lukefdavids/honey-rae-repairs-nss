import { Outlet, Route, Routes } from "react-router-dom";
import { Welcome } from "../components/welcome/Welcome";
import { TicketList } from "../components/tickets/ticketList";
import { EmployeeList } from "../components/Employees/EmployeeList";
import { EmployeeDetails } from "../components/Employees/EmployeeDetails";
import { CustomerList } from "../components/customers/CustomerList";
import { CustomerDetails } from "../components/customers/CustomerDetails";
import { EmployeeForm } from "../components/forms/EmployeeForm";
import { EmployeeNav } from "../components/nav/EmployeeNav";

export const EmployeeViews = (currentUser) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <EmployeeNav />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        
        <Route
          path="tickets"
          element={<TicketList currentUser={currentUser} />}
        />

        <Route path="employees">
          <Route index element={<EmployeeList />} />
          <Route path=":employeeId" element={<EmployeeDetails />} />
        </Route>

        <Route path="customers">
          <Route index element={<CustomerList />} />
          <Route path=":customerId" element={<CustomerDetails />} />"
        </Route>

        <Route
          path="/profile"
          element={<EmployeeForm currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
