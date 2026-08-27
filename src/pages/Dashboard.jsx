import { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  // =========================
  // Jobs Data
  // =========================

  const [jobs, setJobs] = useState([
    {
      id: 1,
      company: "Google",
      role: "Frontend Developer",
      status: "Interview",
      date: "2026-08-10",
    },
    {
      id: 2,
      company: "Amazon",
      role: "Software Engineer",
      status: "Applied",
      date: "2026-08-08",
    },
    {
      id: 3,
      company: "Microsoft",
      role: "React Developer",
      status: "Rejected",
      date: "2026-08-05",
    },
  ]);

  // =========================
  // Form State
  // =========================

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");

  // =========================
  // Search & Filter
  // =========================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // =========================
  // Edit State
  // =========================

  const [editingJob, setEditingJob] = useState(null);

  // =========================
  // Form Visibility
  // =========================

  const [showForm, setShowForm] = useState(false);


  // =========================
  // OPEN ADD FORM
  // =========================

  function openAddForm() {
    setEditingJob(null);

    setCompany("");
    setRole("");
    setStatus("");
    setDate("");

    setShowForm(true);
  }


  // =========================
  // OPEN EDIT FORM
  // =========================

  function openEditForm(job) {
    setEditingJob(job);

    setCompany(job.company);
    setRole(job.role);
    setStatus(job.status);
    setDate(job.date);

    setShowForm(true);
  }


  // =========================
  // CLOSE FORM
  // =========================

  function closeForm() {
    setShowForm(false);

    setEditingJob(null);

    setCompany("");
    setRole("");
    setStatus("");
    setDate("");
  }


  // =========================
  // CREATE + UPDATE
  // =========================

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !company.trim() ||
      !role.trim() ||
      !status ||
      !date
    ) {
      alert("Please fill all fields.");
      return;
    }


    // UPDATE EXISTING JOB
    if (editingJob) {
      const updatedJobs = jobs.map((job) =>
        job.id === editingJob.id
          ? {
              ...job,
              company: company.trim(),
              role: role.trim(),
              status: status,
              date: date,
            }
          : job
      );

      setJobs(updatedJobs);
    }


    // CREATE NEW JOB
    else {
      const newJob = {
        id: Date.now(),
        company: company.trim(),
        role: role.trim(),
        status: status,
        date: date,
      };

      setJobs([...jobs, newJob]);
    }

    closeForm();
  }


  // =========================
  // DELETE
  // =========================

  function deleteJob(id) {
    const updatedJobs = jobs.filter(
      (job) => job.id !== id
    );

    setJobs(updatedJobs);
  }


  // =========================
  // SEARCH + FILTER
  // =========================

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.company
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "" ||
      job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });


  // =========================
  // FORMAT DATE
  // =========================

  function formatDate(dateString) {
    if (!dateString) {
      return "";
    }

    const dateObject = new Date(dateString);

    return dateObject.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }


  return (
    <div className="dashboard">

      {/* =========================
          HEADER
      ========================= */}

      <div className="dashboard-header">

        <div>
          <h1>Job Dashboard</h1>

          <p className="dashboard-subtitle">
            Track and manage your job applications
          </p>
        </div>

        <button
          className="add-btn"
          onClick={openAddForm}
        >
          + Add Job
        </button>

      </div>


      {/* =========================
          SEARCH + FILTER
      ========================= */}

      <div className="search-section">

        <input
          type="text"
          placeholder="Search by company..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="">
            Select Status
          </option>

          <option value="Applied">
            Applied
          </option>

          <option value="Interview">
            Interview
          </option>

          <option value="Rejected">
            Rejected
          </option>

          <option value="Offer">
            Offer
          </option>
        </select>

      </div>


      {/* =========================
          ADD / EDIT FORM
      ========================= */}

      {showForm && (
        <form
          className="add-form"
          onSubmit={handleSubmit}
        >

          <div className="form-header">

            <h2>
              {editingJob
                ? "Edit Job"
                : "Add New Job"}
            </h2>

            <button
              type="button"
              className="close-btn"
              onClick={closeForm}
            >
              ✕
            </button>

          </div>


          {/* Company */}

          <input
            type="text"
            placeholder="Company Name"
            value={company}
            onChange={(e) =>
              setCompany(e.target.value)
            }
          />


          {/* Role */}

          <input
            type="text"
            placeholder="Job Role"
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
          />


          {/* Status */}

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >
            <option value="">
              Select Status
            </option>

            <option value="Applied">
              Applied
            </option>

            <option value="Interview">
              Interview
            </option>

            <option value="Rejected">
              Rejected
            </option>

            <option value="Offer">
              Offer
            </option>

          </select>


          {/* Application Date */}

          <div className="date-field">

            <label>
              Application Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
            />

          </div>


          {/* Submit */}

          <button
            type="submit"
            className="add-form-btn"
          >
            {editingJob
              ? "Update Job"
              : "Add Job"}
          </button>

        </form>
      )}


      {/* =========================
          JOB CARDS
      ========================= */}

      <div className="job-container">

        {filteredJobs.length > 0 ? (

          filteredJobs.map((job) => (

            <div
              className="job-card"
              key={job.id}
            >

              {/* Card Top */}

              <div className="job-card-top">

                <div>

                  <h3>
                    {job.company}
                  </h3>

                  <p className="job-role">
                    {job.role}
                  </p>

                </div>


                <span
                  className={`status-badge ${job.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {job.status}
                </span>

              </div>


              {/* Job Details */}

              <div className="job-details">

                <p>
                  <strong>Role:</strong>{" "}
                  {job.role}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {job.status}
                </p>

                <p>
                  <strong>Date Applied:</strong>{" "}
                  {formatDate(job.date)}
                </p>

              </div>


              {/* Buttons */}

              <div className="card-buttons">

                <button
                  className="edit"
                  onClick={() =>
                    openEditForm(job)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete"
                  onClick={() =>
                    deleteJob(job.id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))

        ) : (

          <div className="no-jobs">

            <h3>
              No applications found
            </h3>

            <p>
              Try changing your search
              or status filter.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default Dashboard;