import test from "node:test";
import assert from "node:assert/strict";
import { filterArtists } from "../src/logic.js";
test("filter", () => assert.equal(filterArtists([{name:"A",medium:"Paint",city:"",contact:"",notes:""}],"paint").length,1));
