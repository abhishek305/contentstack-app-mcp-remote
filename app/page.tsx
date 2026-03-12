export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif", maxWidth: "640px" }}>
      <h1>Contentstack App MCP Server</h1>
      <p>This is a remote MCP server for building Contentstack Marketplace apps with AI agents.</p>
      <h2>Connect</h2>
      <p>Add to your MCP client config:</p>
      <pre
        style={{
          background: "#f4f4f5",
          padding: "1rem",
          borderRadius: "8px",
          overflowX: "auto",
          fontSize: "14px",
        }}
      >
{JSON.stringify({
  mcpServers: {
    "contentstack-apps": {
      url: `${typeof window !== "undefined" ? window.location.origin : "https://your-host"}/api/mcp`,
    },
  },
}, null, 2)}
      </pre>
      <p>
        <a href="https://github.com/abhishek305/contentstack-app-mcp" target="_blank" rel="noopener">
          Documentation &rarr;
        </a>
      </p>
    </main>
  );
}
