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
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // Check PDF by both MIME type and filename.
    // Some mobile browsers don't correctly provide file.type.
    const isPDF =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPDF) {
      alert("Please upload a PDF file.");
      e.target.value = "";
      return;
    }

    // Optional size protection
    const maxSize = 10 * 1024 * 1024; // 10 MB

    if (file.size > maxSize) {
      alert("Please upload a PDF smaller than 10 MB.");
      e.target.value = "";
      return;
    }

    setFileName(file.name);
    setResult(null);
    setResumeText("");
    setLoading(true);

    try {
      console.log("PDF selected:", file.name);
      console.log("PDF size:", file.size);
      console.log("PDF type:", file.type);

      /*
       * Read the File as an ArrayBuffer.
       * slice() creates a separate buffer which is more reliable
       * with some mobile browsers.
       */
      const buffer = await file.arrayBuffer();
      const data = new Uint8Array(buffer);

      if (!data || data.length === 0) {
        throw new Error("The PDF file is empty.");
      }

      console.log("PDF bytes:", data.length);

      const loadingTask = pdfjsLib.getDocument({
        data: data,
        useWorkerFetch: true,
        isEvalSupported: true,
      });

      const pdf = await loadingTask.promise;

      console.log("PDF pages:", pdf.numPages);

      if (!pdf.numPages) {
        throw new Error("PDF contains no pages.");
      }

      let extractedText = "";

      for (
        let pageNumber = 1;
        pageNumber <= pdf.numPages;
        pageNumber++
      ) {
        const page = await pdf.getPage(pageNumber);

        const content = await page.getTextContent();

        const pageText = content.items
          .map((item) => {
            if ("str" in item) {
              return item.str;
            }

            return "";
          })
          .join(" ");

        extractedText += pageText + "\n";
      }

      extractedText = extractedText.trim();

      console.log(
        "Extracted text length:",
        extractedText.length
      );

      if (!extractedText) {
        alert(
          "The PDF was opened successfully, but no selectable text was found. If this is a scanned/image PDF, text extraction will not work without OCR."
        );

        setResumeText("");
        return;
      }

      setResumeText(extractedText);

      console.log(
        "Resume text extracted successfully."
      );
    } catch (error) {
      console.error("PDF reading error:", error);

      let message =
        "Unable to read this PDF. Please try another PDF.";

      if (error?.name === "InvalidPDFException") {
        message =
          "This PDF appears to be damaged or invalid. Please open it on your phone first and try uploading it again.";
      } else if (
        error?.name === "PasswordException"
      ) {
        message =
          "This PDF is password protected. Please upload an unlocked PDF.";
      } else if (
        error?.name === "MissingPDFException"
      ) {
        message =
          "The PDF could not be loaded. Please try selecting the file again.";
      } else if (
        error?.message
      ) {
        console.error(
          "PDF error message:",
          error.message
        );
      }

      alert(message);

      setFileName("");
      setResumeText("");
      setResult(null);

      // Allow the same file to be selected again.
      e.target.value = "";
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

        <div className="analyzer-card">

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

          <div className="input-group">

            <label>
              Upload Resume PDF
            </label>

            <div className="upload-box">

              <input
                type="file"
                accept="application/pdf,.pdf"
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

          <button
            className="analyze-btn"
            onClick={analyzeResume}
            disabled={loading || !resumeText}
          >
            {loading
              ? "Reading Resume..."
              : "Analyze Resume"}
          </button>

        </div>

        {result && (

          <div className="results">

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