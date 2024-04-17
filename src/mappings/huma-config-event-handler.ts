import { SorobanEvent } from "@subql/types-stellar";
import { Address, Keypair, xdr, scValToNative } from "stellar-sdk";
import fetch from "node-fetch";

import { HumaConfig } from "../types";

const sendTx = async () => {
  const httpData = await fetch("https://api.github.com/users/github");
  logger.info(`httpData: ${JSON.stringify(httpData.body)}`);

  const sourceKeypair = Keypair.fromSecret(
    "SCQN3XGRO65BHNSWLSHYIR4B65AHLDUQ7YLHGIWQ4677AZFRS77TCZRB"
  );

  logger.info(`PUBLIC KEY 0`);
  logger.info(`PUBLIC KEY 1: ${sourceKeypair.publicKey()}`);
};

export async function handleProtocolInitializedEvent(
  event: SorobanEvent
): Promise<void> {
  logger.info(`Transaction hash: ${event.transaction.hash.toString()}`);
  await sendTx();
  // logger.info(`Symbol: ${event.topic[0].value()}`);
  // logger.info(`Symbol1: ${event.topic[1].value()}`);
  // logger.info(`Symbol2: ${event.value.xdr}`);

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
