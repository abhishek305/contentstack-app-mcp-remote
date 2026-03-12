declare module "contentstack-app-mcp/dist/register.js" {
  import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
  export function registerContentstackMcp(server: McpServer): void;
}
