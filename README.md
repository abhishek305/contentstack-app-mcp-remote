# Contentstack App MCP — Remote Server

A minimal Next.js wrapper that serves the [Contentstack App MCP Server](https://github.com/abhishek305/contentstack-app-mcp) over HTTP — deployable to Contentstack Launch, Vercel, or any Node.js host.

## What This Does

The MCP server normally runs locally via stdio. This project wraps it in a single Next.js API route so it can be accessed remotely via a URL. Same tools, same knowledge, same workflow — just over HTTP instead of stdio.

## Setup

```bash
npm install
npm run build
```

### Dependency: `contentstack-app-mcp`

The `package.json` references the MCP server. Choose the right source for your situation:

| Scenario | `package.json` value |
|---|---|
| **Local dev** (MCP repo cloned next to this project) | `"file:../contentstack-app-mcp"` |
| **Production** (after npm publish) | `"contentstack-app-mcp"` or `"^1.0.0"` |
| **GitHub** (if `prepare` script is pushed) | `"github:abhishek305/contentstack-app-mcp"` |

Currently set to `file:../contentstack-app-mcp` for local development.

## Project Structure

```
contentstack-app-mcp-remote/
├── app/
│   ├── api/[transport]/route.ts   ← the only file that matters
│   ├── layout.tsx                 ← minimal layout
│   └── page.tsx                   ← landing page with connection info
├── package.json
├── next.config.js
└── tsconfig.json
```

## Deploy to Contentstack Launch

1. Push this project to a GitHub repo
2. Go to [Contentstack Launch](https://app.contentstack.com) → Launch → Import from GitHub
3. Settings:
   - **Framework**: Next.js
   - **Build command**: `npm install && npm run build`
   - **Output directory**: `.next`
4. Deploy

Your MCP server is now live at:
```
https://your-project.contentstack.app/api/mcp
```

## Deploy to Vercel

```bash
npm install
npx vercel deploy
```

## Connect Your IDE

Once deployed, add this to your MCP config:

### Cursor (`.cursor/mcp.json`)

```json
{
  "mcpServers": {
    "contentstack-apps": {
      "url": "https://your-project.contentstack.app/api/mcp"
    }
  }
}
```

### Claude Desktop (`claude_desktop_config.json`)

```json
{
  "mcpServers": {
    "contentstack-apps": {
      "command": "npx",
      "args": ["mcp-remote", "https://your-project.contentstack.app/api/mcp"]
    }
  }
}
```

> **Note:** Claude Desktop may require `mcp-remote` to bridge Streamable HTTP to stdio. Install: `npm install -g mcp-remote`

## Run Locally

```bash
npm install
npm run dev
```

Server starts at `http://localhost:3000`. MCP endpoint: `http://localhost:3000/api/mcp`

Test with [MCP Inspector](https://github.com/modelcontextprotocol/inspector):
```bash
npx @modelcontextprotocol/inspector
# Connect to http://localhost:3000/api/mcp using Streamable HTTP
```

## Updating

When the MCP server gets updated, just redeploy:

```bash
npm update contentstack-app-mcp
npm run build
```

Or if using Launch, push to GitHub and it auto-deploys.

## Security

This deployment has **no authentication**. Anyone with the URL can use the MCP tools. For production:

- Use `mcp-handler`'s `withMcpAuth` for OAuth — see [Vercel docs](https://vercel.com/docs/mcp/deploy-mcp-servers-to-vercel#enabling-authorization)
- Or restrict access via Launch's password protection feature
