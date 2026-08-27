import { useState } from "react";
import { Link } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import "./ResumeAnalyzer.css";

import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const roleSkills = {
  "Frontend Developer": [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Git",
    "REST API",
  ],

  "Backend Developer": [
    "Node.js",
    "Express",
    "MongoDB",
    "SQL",
    "REST API",
    "Git",
  ],

  "Full Stack Developer": [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "REST API",
    "Git",
  ],

  "Java Developer": [
    "Java",
    "Spring Boot",
    "SQL",
    "Hibernate",
    "REST API",
    "Git",
  ],

  "Python Developer": [
    "Python",
    "Django",
    "Flask",
    "SQL",
    "REST API",
    "Git",
  ],
};

function ResumeAnalyzer() {
  const [selectedRole, setSelectedRole] = useState("");
  const [fileName, setFileName] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleFileChange(e) {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      e.target.value = "";
      return;
    }

    setFileName(file.name);
    setResult(null);
    setLoading(true);

    try {
      const arrayBuffer = await file.arrayBuffer();

      const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer,
      }).promise;

      let extractedText = "";

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);

        const content = await page.getTextContent();

        const pageText = content.items
          .map((item) => item.str)
          .join(" ");

        extractedText += pageText + "\n";
      }

      setResumeText(extractedText);

      console.log("Resume text extracted:", extractedText);
    } catch (error) {
      console.error("PDF reading error:", error);

      alert("Unable to read this PDF. Please try another PDF.");
      setFileName("");
      setResumeText("");
    } finally {
      setLoading(false);
    }
  }

  function analyzeResume() {
    if (!selectedRole) {
      alert("Please select a job role.");
      return;
    }

    if (!resumeText.trim()) {
      alert("Please upload your resume PDF.");
      return;
    }

    const requiredSkills = roleSkills[selectedRole];

    const resumeLower = resumeText.toLowerCase();

    const matchedSkills = requiredSkills.filter((skill) =>
      resumeLower.includes(skill.toLowerCase())
    );

    const missingSkills = requiredSkills.filter(
      (skill) =>
        !resumeLower.includes(skill.toLowerCase())
    );

    const percentage = Math.round(
      (matchedSkills.length / requiredSkills.length) * 100
    );

    setResult({
      matchedSkills,
      missingSkills,
      percentage,
    });
  }

  return (
    <div className="resume-page">

      {/* Navbar */}
      <nav className="resume-navbar">

        <Link to="/" className="resume-logo">
          JobTrack
        </Link>

        <div className="resume-nav-links">
          <Link to="/">
            Home
          </Link>

          <Link to="/dashboard">
            Dashboard
          </Link>
        </div>

      </nav>


      {/* Main Content */}
      <main className="resume-container">

        <div className="resume-heading">

          <span>
            RESUME ANALYZER
          </span>

          <h1>
            Check Your Resume Against a Job Role
          </h1>

          <p>
            Select your target role, upload your PDF resume,
            and check the skills that match the position.
          </p>

        </div>


        {/* Analyzer Card */}
        <div className="analyzer-card">

          {/* Job Role */}
          <div className="input-group">

            <label>
              Select Job Role
            </label>

            <select
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                setResult(null);
              }}
            >
              <option value="">
                Select a role
              </option>

              {Object.keys(roleSkills).map((role) => (
                <option
                  key={role}
                  value={role}
                >
                  {role}
                </option>
              ))}
            </select>

          </div>


          {/* PDF Upload */}
          <div className="input-group">

            <label>
              Upload Resume PDF
            </label>

            <div className="upload-box">

              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
              />

              <p>
                Upload your resume in PDF format
              </p>

              {fileName && (
                <span className="file-name">
                  Selected: {fileName}
                </span>
              )}

              {loading && (
                <span className="file-loading">
                  Reading PDF...
                </span>
              )}

            </div>

          </div>


          {/* Analyze Button */}
          <button
            className="analyze-btn"
            onClick={analyzeResume}
            disabled={loading}
          >
            {loading
              ? "Reading Resume..."
              : "Analyze Resume"}
          </button>

        </div>


        {/* Results */}
        {result && (

          <div className="results">

            {/* Score */}
            <div className="score-card">

              <h2>
                Resume Match
              </h2>

              <div className="score">
                {result.percentage}%
              </div>

              <p>
                Match for {selectedRole}
              </p>

            </div>


            {/* Matched Skills */}
            <div className="result-section">

              <h2>
                Matched Skills
              </h2>

              <div className="skills-list">

                {result.matchedSkills.length > 0 ? (

                  result.matchedSkills.map((skill) => (
                    <span
                      className="skill matched"
                      key={skill}
                    >
                      ✓ {skill}
                    </span>
                  ))

                ) : (

                  <p>
                    No matching skills found.
                  </p>

                )}

              </div>

            </div>


            {/* Missing Skills */}
            <div className="result-section">

              <h2>
                Missing Skills
              </h2>

              <div className="skills-list">

                {result.missingSkills.length > 0 ? (

                  result.missingSkills.map((skill) => (
                    <span
                      className="skill missing"
                      key={skill}
                    >
                      ✕ {skill}
                    </span>
                  ))

                ) : (

                  <p>
                    No missing skills found.
                  </p>

                )}

              </div>

            </div>


            {/* Suggestions */}
            <div className="result-section">

              <h2>
                Suggestions
              </h2>

              {result.missingSkills.length > 0 ? (

                result.missingSkills.map((skill) => (
                  <p
                    key={skill}
                    className="suggestion"
                  >
                    • Consider adding{" "}
                    <strong>{skill}</strong>{" "}
                    to your resume if you have experience
                    with it.
                  </p>
                ))

              ) : (

                <p className="suggestion">
                  Your resume covers all the selected
                  skills for this role.
                </p>

              )}

            </div>

          </div>

        )}

      </main>

    </div>
  );
}

export default ResumeAnalyzer;