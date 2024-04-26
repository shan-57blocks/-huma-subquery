import {
  StellarDatasourceKind,
  StellarHandlerKind,
  StellarProject,
} from "@subql/types-stellar";

const project: StellarProject = {
  specVersion: "1.0.0",
  name: "huma-sub-query",
  version: "0.0.1",
  runner: {
    node: {
      name: "@subql/node-stellar",
      version: "*",
    },
    query: {
      name: "@subql/query",
      version: "*",
    },
  },
  schema: {
    file: "./schema.graphql",
  },
  network: {
    // chainId: "Test SDF Network ; September 2015",
    // endpoint: ["https://horizon-testnet.stellar.org"],
    // sorobanEndpoint: "https://soroban-testnet.stellar.org",
    chainId: "Test SDF Future Network ; October 2022",
    endpoint: ["https://horizon-futurenet.stellar.org"],
    sorobanEndpoint: "https://rpc-futurenet.stellar.org",
  },
  dataSources: [
    {
      kind: StellarDatasourceKind.Runtime,
      startBlock: 1305106,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleProtocolInitializedEvent",
            kind: StellarHandlerKind.Event,
            filter: {
              topics: ["HUMA_CFG", "initialize"],
              contractId:
                "CBTQ3NXUFUZYGFEYXMJVNFXOMQG7OHWEZJPXCIUVAXHIVZDPIIZ4UDK3",
            },
          },
        ],
      },
    },
  ],
};

export default project;
