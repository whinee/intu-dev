export function validate(msg: unknown): void {
  if (!msg || typeof msg !== "object") {
    throw new Error("Message must be an object.");
  }

  if (!("patientId" in msg)) {
    throw new Error("Missing required field: patientId.");
  }
}
