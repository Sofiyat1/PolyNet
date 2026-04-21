import "./PrivacyPolicy.css";

function PrivacyPolicy() {
  return (
    <div className="privacy-page">
      {/* HEADER */}
      <div className="privacy-header">
        <h1>Privacy Policy</h1>
        <p>Last updated: April 2026</p>
      </div>

      {/* CONTENT */}
      <div className="privacy-container">
        <section>
          <h2>1. Overview</h2>
          <p>
            This application enables user interaction through two identity
            modes: Standard Access and Decoy Access. This policy explains how
            data is collected and used within the system.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <ul>
            <li>Basic account information (name / username)</li>
            <li>Profile data provided by the user</li>
            <li>Connection activity (requests and access levels)</li>
            <li>App usage interactions</li>
          </ul>
        </section>

        <section>
          <h2>3. Identity Modes</h2>
          <p>Users operate under two identity layers:</p>
          <ul>
            <li>
              <b>Standard Access:</b> Primary visible identity
            </li>
            <li>
              <b>Decoy Access:</b> Alternative controlled identity
            </li>
          </ul>
        </section>

        <section>
          <h2>4. How Data is Used</h2>
          <ul>
            <li>Enable connections between users</li>
            <li>Manage access levels</li>
            <li>Improve system functionality</li>
            <li>Maintain security and stability</li>
          </ul>
        </section>

        <section>
          <h2>5. Data Sharing</h2>
          <p>
            We do not sell user data. Data may only be shared when required by
            law or for system security purposes.
          </p>
        </section>

        <section>
          <h2>6. User Control</h2>
          <ul>
            <li>Manage connections</li>
            <li>Switch access levels</li>
            <li>Update profile information</li>
            <li>Block or remove users</li>
          </ul>
        </section>

        <section>
          <h2>7. Security</h2>
          <p>
            We apply reasonable security measures, but no system is completely
            secure. Users should avoid sharing sensitive personal data.
          </p>
        </section>

        <section>
          <h2>8. Updates</h2>
          <p>
            This policy may be updated periodically. Significant changes will be
            communicated within the app.
          </p>
        </section>

        <section>
          <h2>9. Contact & Responsibility</h2>
          <p>
            Polynet is operated and maintained by its development team. For
            privacy concerns, support issues, or data requests, users should
            contact the platform administrator through official channels within
            the app.
          </p>
        </section>
        <section>
          <h2>10. Ownership & Copyright</h2>
          <p>
            Polynet, including its design, identity system, and features, is the
            intellectual property of its creators. All rights are reserved
            unless explicitly stated otherwise.
          </p>

          <p>
            Users retain ownership of the content they create within the
            platform, but grant Polynet a limited license to store and display
            that content for platform functionality.
          </p>
        </section>
        
      </div>
    </div>
  );
}

export default PrivacyPolicy;
