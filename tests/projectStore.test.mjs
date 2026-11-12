import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";
import { useProjectStore } from "../src/store/projectStore.ts";

const initialProjects = ["a", "b", "c"].map((id) => ({
  id, name: id, description: "", status: "inProgress", repository: "",
}));

beforeEach(() => useProjectStore.setState({ projects: [...initialProjects] }));

test("moves a project down without mutating the previous array", () => {
  const previous = useProjectStore.getState().projects;
  useProjectStore.getState().moveProject("a", "c");
  assert.deepEqual(useProjectStore.getState().projects.map(({ id }) => id), ["b", "c", "a"]);
  assert.deepEqual(previous.map(({ id }) => id), ["a", "b", "c"]);
  assert.equal(useProjectStore.getState().projects[2], initialProjects[0]);
});

test("moves a project up", () => {
  useProjectStore.getState().moveProject("c", "a");
  assert.deepEqual(useProjectStore.getState().projects.map(({ id }) => id), ["c", "a", "b"]);
});

test("ignores missing IDs and dropping onto the same project", () => {
  const previous = useProjectStore.getState().projects;
  for (const [from, to] of [["missing", "b"], ["a", "missing"], ["b", "b"]]) {
    useProjectStore.getState().moveProject(from, to);
    assert.equal(useProjectStore.getState().projects, previous);
  }
});

test("handles an empty project list", () => {
  useProjectStore.setState({ projects: [] });
  useProjectStore.getState().moveProject("a", "b");
  assert.deepEqual(useProjectStore.getState().projects, []);
});

test("adding a project preserves the reordered list", () => {
  useProjectStore.getState().moveProject("a", "b");
  useProjectStore.getState().addProject({ ...initialProjects[0], id: "d" });
  assert.deepEqual(useProjectStore.getState().projects.map(({ id }) => id), ["b", "a", "c", "d"]);
});
