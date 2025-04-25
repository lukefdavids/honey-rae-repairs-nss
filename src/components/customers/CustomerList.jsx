import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNonStaffUsers } from "../../services/userService";
import "./Customers.css"
import { User } from "../users/User";

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        getNonStaffUsers().then(res => setCustomers(res))
    }
        , [])

    return (
        <div className="customers">

            {customers.map((userObj) => {
                return <Link to={`/customers/${userObj.id}`}>
                    < User user={userObj} key={userObj.id} />
                </Link>
            })}
        </div>
    )
}