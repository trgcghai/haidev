"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export function useIsMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true, // client
    () => false, // server
  );
}
