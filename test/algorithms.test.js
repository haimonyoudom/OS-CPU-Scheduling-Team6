import test from "node:test";
import assert from "node:assert/strict";

import { rr } from "../src/algorithms/rr.js";
import { srt } from "../src/algorithms/srt.js";
import { mlfq } from "../src/algorithms/mlfq.js";

const sampleProcesses = [
  { pid: "P1", arrival: 0, burst: 4 },
  { pid: "P2", arrival: 1, burst: 2 },
  { pid: "P3", arrival: 2, burst: 3 },
];

test("round robin returns gantt and metrics", () => {
  const result = rr(sampleProcesses, 2);

  assert.ok(Array.isArray(result.gantt));
  assert.equal(result.metrics.length, sampleProcesses.length);
  assert.ok(result.averages);
});

test("shortest remaining time returns gantt and metrics", () => {
  const result = srt(sampleProcesses);

  assert.ok(Array.isArray(result.gantt));
  assert.equal(result.metrics.length, sampleProcesses.length);
  assert.ok(result.averages);
});

test("multilevel feedback queue returns gantt and metrics", () => {
  const result = mlfq(sampleProcesses);

  assert.ok(Array.isArray(result.gantt));
  assert.equal(result.metrics.length, sampleProcesses.length);
  assert.ok(result.averages);
});
