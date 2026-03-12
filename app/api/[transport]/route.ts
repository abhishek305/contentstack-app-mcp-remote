import { createMcpHandler } from "mcp-handler";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

// Dynamic import to avoid bundling issues with Next.js
async function loadRegister() {
  const mod = await import("contentstack-app-mcp/dist/register.js");
  return mod.registerContentstackMcp;
}

const handler = createMcpHandler(
  async (server) => {
    const registerContentstackMcp = await loadRegister();
    registerContentstackMcp(server as unknown as McpServer);
  },
  {},
  {
    basePath: "/api",
    maxDuration: 30,
  }
);

export { handler as GET, handler as POST, handler as DELETE };
