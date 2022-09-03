import * as employees from "../repositories/employeeRepository";

async function findEmployeeById(employeeId: number) {
  const employeeFound = await employees.findById(employeeId);
  if (!employeeFound) {
    throw { type: "not_found", message: "employee not found" };
  }
}

export { findEmployeeById };
