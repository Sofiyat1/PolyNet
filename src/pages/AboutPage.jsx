import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="about-page">

      {/* HEADER */}
      <div className="about-header">
        <h1>About Polynet</h1>
        <p>A Multi-persona social networking system</p>
      </div>

      {/* CONTENT */}
      <div className="about-container">

        <section>
          <h2>What is Polynet?</h2>
          <p>
            Polynet is a social platform built around controlled identity interaction.
            It allows users to manage how they appear and interact through a dual-layer
            system: Standard Access and Decoy Access.
          </p>
        </section>

        <section>
          <h2>Core Idea</h2>
          <p>
            Unlike traditional social networks where identity is fixed and public,
            Polynet introduces flexible identity control. Users can assign different
            access levels to connections depending on context and trust.
          </p>
        </section>

        <section>
          <h2>Identity System</h2>
          <ul>
            <li><b>Standard Access:</b> Your primary and trusted identity layer</li>
            <li><b>Decoy Access:</b> A controlled secondary identity for limited exposure interactions</li>
          </ul>
        </section>

        <section>
          <h2>Why Polynet Exists</h2>
          <p>
            Modern social platforms often lack granular control over identity exposure.
            Polynet is designed to give users more control, privacy, and intentionality
            in how they connect with others.
          </p>
        </section>

        <section>
          <h2>How It Works</h2>
          <p>
            Users send and receive connection requests, then assign access levels to each connection.
            This determines how much of their identity and interaction space is shared.
          </p>
        </section>

        <section>
          <h2>Vision</h2>
          <p>
            Polynet aims to redefine social interaction by shifting control back to the user,
            making identity something that can be managed rather than exposed by default.
          </p>
        </section>

      </div>
    </div>
  );
}

export default AboutPage;