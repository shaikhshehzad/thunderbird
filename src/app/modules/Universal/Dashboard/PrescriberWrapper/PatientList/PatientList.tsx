import React, { useState, useEffect } from 'react';

interface Patient {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  AddressLine1: string;
  City: string;
  State: string;
  ZipCode: string;
  prescriberId: string;
}

interface PatientListProps {
  id: string;
}

const PatientList: React.FC<PatientListProps> = ({ id }) => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`https://meteor-c535aaff4f8f.herokuapp.com/api/getpatientsByPId/${id}`);
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, [id]);

  return (
    <div className="container mt-5">
      <h2>Patients</h2>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr key={patient._id}>
                <td>{patient.firstName}</td>
                <td>{patient.lastName}</td>
                <td>{patient.email}</td>
                <td>{patient.phoneNumber}</td>
                <td>{patient.AddressLine1}</td>
                <td>{patient.City}</td>
                <td>{patient.State}</td>
                <td>{patient.ZipCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;