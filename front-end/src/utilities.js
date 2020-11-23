import React from "react";

export const ListItem = (props) => {
    return <option>{props.emp.name}</option>;
}
// Probably not needed
// export const EmployeeList = (Options) => {
//     return Options.map((emp, index) =>
//         <ListItem key={index} emp={emp} />
//     );
// }
