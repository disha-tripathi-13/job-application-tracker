function JobCard({ job, index, deleteJob }) {
  return (
    <div className="job-card">

      <h3>{job.company}</h3>

      <p>
        <strong>Role:</strong> {job.role}
      </p>

      <p>
        <strong>Status:</strong> {job.status}
      </p>

      <p>
        <strong>Date:</strong> {job.date}
      </p>

      <div className="card-buttons">

        <button className="edit">
          Edit
        </button>

        <button
          className="delete"
          onClick={() => deleteJob(index)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default JobCard;
