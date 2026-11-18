import assert from "node:assert/strict";
import { test } from "node:test";
import { getUserCommits } from "../src/services/github.ts";

test("requests commits from the GitHub commit search endpoint", async () => {
  const originalFetch = globalThis.fetch;
  let requestUrl;

  globalThis.fetch = async (input) => {
    requestUrl = String(input);
    return new Response(JSON.stringify({ items: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    await getUserCommits(
      "kaan-developer",
      "2026-11-12",
      new AbortController().signal,
    );
  } finally {
    globalThis.fetch = originalFetch;
  }

  const request = new URL(requestUrl);
  assert.equal(request.pathname, "/search/commits");
  assert.equal(
    request.searchParams.get("q"),
    "author:kaan-developer author-date:>=2026-11-12",
  );
  assert.equal(request.searchParams.get("per_page"), "100");
});
