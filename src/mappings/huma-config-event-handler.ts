import { Keypair } from "@stellar/stellar-sdk";
import { SorobanEvent } from "@subql/types-stellar";
import fetch from "node-fetch";

import { HumaConfig } from "../types";

(global as any).buffer = require("buffer");

// This will throw error: TypeError [ERR_INVALID_ARG_TYPE]: The "list[1]" argument must be an instance of Buffer or Uint8Array. Received an instance of Object
const callStellarSDK = async () => {
  const sourceKeypair = Keypair.fromSecret(
    "SCQN3XGRO65BHNSWLSHYIR4B65AHLDUQ7YLHGIWQ4677AZFRS77TCZRB"
  );
  logger.info(`PUBLIC KEY: ${sourceKeypair.publicKey()}`);
};

// This will throw error: ReferenceError: URLSearchParams is not defined
const callExternalApi = async () => {
  const httpData = await fetch("https://api.github.com/users/github");
  logger.info(`httpData: ${JSON.stringify(httpData.body)}`);
};

export async function handleProtocolInitializedEvent(
  event: SorobanEvent
): Promise<void> {
  logger.info(`Transaction hash: ${event.transaction.hash.toString()}`);
  callStellarSDK();
  callExternalApi();

  if (event.type.toString() == "contract") {
    const humaConfigAddress = event.contractId?.contractId().toString()!;

    const humaConfig = HumaConfig.create({
      id: humaConfigAddress,
      address: humaConfigAddress,
      owner: humaConfigAddress,
    });

    await humaConfig.save();
  }
}
