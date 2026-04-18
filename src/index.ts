#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { tools, handleToolCall } from "./tools.js";
import { resources, readResource } from "./resources.js";
import { prompts, getPrompt } from "./prompts.js";

const server = new Server(
  {
    name: "cascadekit-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
      prompts: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools }));
server.setRequestHandler(CallToolRequestSchema, async (request) => 
  handleToolCall(request.params.name, request.params.arguments ?? {})
);
server.setRequestHandler(ListResourcesRequestSchema, async () => ({ resources }));
server.setRequestHandler(ReadResourceRequestSchema, async (request) => 
  readResource(request.params.uri)
);
server.setRequestHandler(ListPromptsRequestSchema, async () => ({ prompts }));
server.setRequestHandler(GetPromptRequestSchema, async (request) => 
  getPrompt(request.params.name, request.params.arguments ?? {})
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("CascadeKit MCP server running on stdio");
}

main().catch(console.error);
