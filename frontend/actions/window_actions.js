export const ATTACH_LISTENER = "ATTACH_LISTENER";
export const REMOVE_LISTENER = "REMOVE_LISTENER";

export const attachListener = () => ({
  type: ATTACH_LISTENER,
});

export const removeListener = () => ({
  type: REMOVE_LISTENER,
});
