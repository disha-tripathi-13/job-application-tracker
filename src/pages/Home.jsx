import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">

      {/* ================= NAVBAR ================= */}
      <nav className="navbar">

        <Link to="/" className="logo">
          JobTrack
        </Link>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>

          <Link
            to="/resume-analyzer"
            className="resume-btn"
          >
            Resume Analyzer
          </Link>
        </div>

      </nav>


      {/* ================= HERO SECTION ================= */}
      <section className="hero" id="home">

        <div className="hero-content">

          <span className="hero-tag">
            SMART JOB APPLICATION MANAGEMENT
          </span>

          <h1>
            Track Your
            <span> Job Applications </span>
            Easily
          </h1>

          <p>
            Keep all your job applications organized in one place.
            Track company names, job roles, application dates,
            and statuses without using spreadsheets or notebooks.
          </p>

          <div className="hero-buttons">

            <Link
              to="/dashboard"
              className="primary-btn"
            >
              Get Started
            </Link>

            <a
              href="#features"
              className="secondary-btn"
            >
              Explore Features
            </a>

          </div>

        </div>


        {/* Dashboard Preview */}
        <div className="hero-preview">

          <div className="preview-card">

            <div className="preview-header">

              <div>
                <h3>
                  Job Dashboard
                </h3>

                <p>
                  Recent Applications
                </p>
              </div>

              <span className="preview-icon">
                ✓
              </span>

            </div>


            <div className="preview-job">

              <div>
                <h4>
                  Google
                </h4>

                <p>
                  Frontend Developer
                </p>
              </div>

              <span className="status interview">
                Interview
              </span>

            </div>


            <div className="preview-job">

              <div>
                <h4>
                  Amazon
                </h4>

                <p>
                  Software Engineer
                </p>
              </div>

              <span className="status applied">
                Applied
              </span>

            </div>


            <div className="preview-job">

              <div>
                <h4>
                  Microsoft
                </h4>

                <p>
                  React Developer
                </p>
              </div>

              <span className="status rejected">
                Rejected
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}
      <section
        className="features"
        id="features"
      >

        <div className="section-heading">

          <span>
            FEATURES
          </span>

          <h2>
            Everything You Need to Manage Your Job Search
          </h2>

          <p>
            Keep your applications organized and make your
            job search easier.
          </p>

        </div>


        <div className="feature-grid">

          {/* Add Application */}

          <div className="feature-card">

            <div className="feature-icon">
              +
            </div>

            <h3>
              Add Applications
            </h3>

            <p>
              Add company name, job role, application status,
              and application date.
            </p>

          </div>


          {/* Track Status */}

          <div className="feature-card">

            <div className="feature-icon">
              ✓
            </div>

            <h3>
              Track Status
            </h3>

            <p>
              Track applications through Applied, Interview,
              Rejected, and Offer stages.
            </p>

          </div>


          {/* Search */}

          <div className="feature-card">

            <div className="feature-icon">
              🔍
            </div>

            <h3>
              Search & Filter
            </h3>

            <p>
              Quickly find applications using company search
              and status filtering.
            </p>

          </div>


          {/* Edit Delete */}

          <div className="feature-card">

            <div className="feature-icon">
              ✎
            </div>

            <h3>
              Edit & Delete
            </h3>

            <p>
              Update application information or remove
              applications you no longer need.
            </p>

          </div>


          {/* Resume Analyzer */}

          <div className="feature-card">

            <div className="feature-icon">
              📄
            </div>

            <h3>
              Resume Analyzer
            </h3>

            <p>
              Compare your resume with a target job role
              and identify matching and missing skills.
            </p>

            <Link
              to="/resume-analyzer"
              className="feature-link"
            >
              Analyze Resume →
            </Link>

          </div>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section
        className="how-it-works"
        id="how-it-works"
      >

        <div className="section-heading">

          <span>
            HOW IT WORKS
          </span>

          <h2>
            Manage Your Job Search in 3 Simple Steps
          </h2>

        </div>


        <div className="steps">

          {/* Step 1 */}

          <div className="step">

            <div className="step-number">
              01
            </div>

            <h3>
              Add Application
            </h3>

            <p>
              Enter the company, role, status, and
              application date.
            </p>

          </div>


          <div className="step-line"></div>


          {/* Step 2 */}

          <div className="step">

            <div className="step-number">
              02
            </div>

            <h3>
              Track Progress
            </h3>

            <p>
              Update your application when your interview
              or application status changes.
            </p>

          </div>


          <div className="step-line"></div>


          {/* Step 3 */}

          <div className="step">

            <div className="step-number">
              03
            </div>

            <h3>
              Improve Your Resume
            </h3>

            <p>
              Use the Resume Analyzer to check your resume
              against your target job role.
            </p>

          </div>

        </div>

      </section>


      {/* ================= RESUME ANALYZER CTA ================= */}
      <section className="resume-section">

        <div className="resume-section-content">

          <span className="resume-tag">
            NEW FEATURE
          </span>

          <h2>
            Is Your Resume Ready for the Job?
          </h2>

          <p>
            Check your resume against your target role and
            discover important skills you may be missing.
          </p>

          <Link
            to="/resume-analyzer"
            className="primary-btn"
          >
            Analyze My Resume
          </Link>

        </div>

      </section>


      {/* ================= DASHBOARD CTA ================= */}
      <section className="cta">

        <h2>
          Ready to Organize Your Job Search?
        </h2>

        <p>
          Start tracking your applications today.
        </p>

        <Link
          to="/dashboard"
          className="primary-btn"
        >
          Go to Dashboard
        </Link>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="footer">

        <Link
          to="/"
          className="footer-logo"
        >
          JobTrack
        </Link>

        <p>
          Simple. Organized. Efficient.
        </p>

        <div className="footer-links">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/resume-analyzer">
            Resume Analyzer
          </Link>

        </div>

        <p className="copyright">
          © 2026 JobTrack. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default Home;