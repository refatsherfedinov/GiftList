const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = 'http://localhost:1225';

async function main() {
  const user = process.argv[2];

  if (!user) {
    console.log("No user provided!");
    return;
  }

  const index = niceList.findIndex(n => n === user);
  const merkleTree = new MerkleTree(niceList);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: user,
    proof: proof
  });

  console.log({ gift });
}

main();