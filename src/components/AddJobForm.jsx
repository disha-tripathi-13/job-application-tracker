import { useState } from "react";


function AddJobForm({ addJob }) {


  const [company, setCompany] = useState("");

  const [role, setRole] = useState("");

  const [status, setStatus] = useState("Applied");



  function handleSubmit(e){

    e.preventDefault();


    const newJob = {

      company: company,

      role: role,

      status: status,

      date: new Date().toLocaleDateString()

    };


    addJob(newJob);


    setCompany("");

    setRole("");

    setStatus("Applied");

  }



  return (

    <form 
      className="add-form"
      onSubmit={handleSubmit}
    >


      <h2>
        Add New Job
      </h2>



      <input

        type="text"

        placeholder="Company Name"

        value={company}

        onChange={(e)=>setCompany(e.target.value)}

      />



      <input

        type="text"

        placeholder="Job Role"

        value={role}

        onChange={(e)=>setRole(e.target.value)}

      />



      <select

        value={status}

        onChange={(e)=>setStatus(e.target.value)}

      >

        <option>
          Applied
        </option>

        <option>
          Interview
        </option>

        <option>
          Rejected
        </option>

        <option>
          Offer
        </option>


      </select>



      <button className="add-btn">

        Add Job

      </button>



    </form>

  );
}


export default AddJobForm;