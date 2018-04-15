type ActionType = "UPDATE_BINARY_COUNTER";

interface BaseAction {
  type: ActionType;
}

interface UpdateBinaryCounter extends BaseAction {
  type: "UPDATE_BINARY_COUNTER";
  base10: number;
}

type Action = UpdateBinaryCounter;

export function updateBinaryCounter(base10: number): UpdateBinaryCounter {
  return { type: "UPDATE_BINARY_COUNTER", base10: base10 };
}
